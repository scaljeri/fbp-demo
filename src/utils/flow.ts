import { FlowWorker } from '../../public/admin/projects/flow-based/src/lib/utils/flow-worker';
import {
    FbKeyValues,
    XxlConnection,
    FbNodeType,
    FbNodeWorker,
    FbNodeHelpers,
    FbNodeState, XxlSocket
} from '../nodes/flow-based';

interface Node {
    state: FbNodeState;
    parentId: number | null;
}

interface NodeConnection {
    connection: XxlConnection;
    state: FbNodeState;
}

export class DFlow {
    private workers: Record<string, FbNodeWorker> = {};
    private state: FbNodeState;
    private nodes: FbKeyValues<Node> = {};
    private connections: FbKeyValues<NodeConnection> = {};
    private sockets: FbKeyValues<number> = {};
    private uniqueIdCount = 0;

    // TODO: FbNodeType should be FbNodeType[]
    constructor(private flowTypes: Record<string, FbNodeType>,
                private helpers?: FbNodeHelpers) {
    }

    initialize(flow: FbNodeState): DFlow {
        this.state = flow;
        this.nodes[flow.id!] = {state: flow, parentId: null};

        const connections = flow.connections || [],
            children = flow.children!;

        connections.forEach(c => this.connections[c.id] = {state: flow, connection: c});
        this.createVirtualFlow(children, flow.id!);

        let count = 0;
        while (this.connectNodes() && ++count < 100) {
        }
        if (count === 100) {
            console.warn('Connecting all nodes failed');
        }

        Object.keys(this.connections).forEach(key => {
            this.connectWorkers(this.connections[key].connection);
        });

        return this;
    }

    getWorker(id: number): FbNodeWorker {
        return this.workers[id];
    }

    getWorkerByType(type: string): FbNodeWorker[] {
        return (this.state.children || []).filter(c => c.type === type)
            .map(f => this.getWorker(f.id));
    }

    addConnection(state: FbNodeState, connection: XxlConnection): void {
        state.connections = [connection, ...state.connections!];
        this.connections[connection.id] = {connection, state};
        this.connectWorkers(connection);

        if (this.connect(connection)) {
            this.rebuildNodeConnections();
        }
    }

    private rebuildNodeConnections(): void {
        Object.keys(this.nodes).forEach(key => {
            const node = this.nodes[key].state;

            if (node.sockets) {
                if (node.children) {
                    node.sockets.forEach(s => s.format = null);
                } else if (this.helpers) {
                    this.helpers.resetSockets(node);
                }
            }
        });

        let count = 0;
        while (this.connectNodes() && ++count < 100) {
        }

        if (count === 100) {
            console.warn('Connecting all nodes failed');
        }
    }

    removeConnection(connection: XxlConnection, state: FbNodeState, doRebuild = true): void {
        const worker = this.workers[connection.to as number];
        if (worker && worker.removeStream) {
            worker.removeStream(connection);
        }

        delete this.connections[connection.id];
        state.connections = state.connections!.filter(c => c.id !== connection.id);
        if (doRebuild) {
            this.rebuildNodeConnections();
        }
    }

    removeSocket(socket: XxlSocket, doRebuild = true): void {
        const nodeId = this.sockets[socket.id!],
            node = this.getNode(nodeId);

        node.state.sockets = node.state.sockets!.filter(s => s.id !== socket.id);

        const keys = Object.keys(this.connections);
        for (let i = keys.length - 1; i >= 0; i--) {
            const key = keys[i],
                connection = this.connections[key].connection;

            if (connection.in === socket.id || connection.out === socket.id) {
                this.connections[key].state.connections =
                    this.connections[key].state.connections.filter(item => item.id !== connection.id);
                delete this.connections[key];
                this.workers[connection.to as number].removeStream(connection);
            }
        }

        if (doRebuild) {
            this.rebuildNodeConnections();
        }
    }

    addNode(nodeState: FbNodeState, flowState: FbNodeState): void {
        this.createWorker(nodeState);
        flowState.children = [...flowState.children!, nodeState];
        this.nodes[nodeState.id!] = {state: nodeState, parentId: flowState.id!};
        (nodeState.sockets || []).forEach(s => this.addSocket(s, nodeState.id!));
    }

    removeNode(id: number, doRebuild = true): void {
        const node = this.getNode(id);
        const parentNode = this.getNode(node.parentId!);

        if (node.state.children) {
            for (let i = node.state.children.length - 1; i >= 0; i--) {
                this.removeNode(node.state.children[i].id!, false);
            }
        }

        parentNode.state.children = parentNode.state.children!.filter(child => child.id !== id);
        delete this.nodes[id];

        parentNode.state.connections!.forEach((c: XxlConnection) => {
            if (c.from === id || c.to === id) {
                this.removeConnection(c, parentNode.state, false);
            }
        });

        if (doRebuild) {
            this.rebuildNodeConnections();
        }
    }

    destroy(): void {
        Object.keys(this.workers).forEach(k => this.workers[k].destroy());
    }

    getNode(id: number): Node {
        return this.nodes[id];
    }

    getSocket(id: number): XxlSocket {
        const node = this.getNode(this.sockets[id]);

        return node!.state.sockets!.filter(s => s.id === id)[0];
    }

    addSocket(socket: XxlSocket, nodeId: number): void {
        const state = this.getNode(nodeId).state;

        if (!socket.id) {
            socket.id = this.uniqueId;
            state.sockets = [socket, ...state.sockets!];
        }

        this.sockets[socket.id!] = nodeId;
    }

    private createVirtualFlow(nodes: FbNodeState[], parentId: number) {
        (nodes || []).forEach(node => {
            this.nodes[node.id!] = {state: node, parentId};
            if (node.sockets) {
                node.sockets.forEach(s => this.sockets[s.id!] = node.id!);
            }

            this.createWorker(node);
            if (node.connections) {
                node.connections.forEach(c => this.connections[c.id] = {connection: c, state: node});

                this.createVirtualFlow(node.children!, node.id!);
            }
        });
    }

    private connectNodes(): boolean {
        const keys = Object.keys(this.connections);

        for (let i = 0; i < keys.length; i++) {
            const c = this.connections[keys[i]].connection;

            if (this.connect(c)) {
                return true;
            }
        }

        return false;
    }

    private connect(connection: XxlConnection): boolean {
        const from = this.getNode(connection.from as number),
            to = this.getNode(connection.to as number),
            outSocket = this.getSocket(connection.out as number),
            inSocket = this.getSocket(connection.in as number);

        if (from.state.children && !outSocket.format) {
            outSocket.format = inSocket.format;
            return !!outSocket.format;

        } else if (to.state.children && !inSocket.format) {
            inSocket.format = outSocket.format;
            return !!outSocket.format;
        }

        let isChanged = false; // TODO: Is default false?
        if (this.helpers) {
            isChanged = this.helpers.connect(outSocket, inSocket, from.state, to.state);
        }

        return isChanged;
    }

    get uniqueId(): number {
        return Date.now() + ++this.uniqueIdCount;
    }

    private createWorker(state: FbNodeState): void {
        if (!this.flowTypes[state.type]) {
            console.log('----No worker found for ' + state.type);
        }

        const DWorker = this.flowTypes[state.type].worker as any,
            id = state.id!;

        if (DWorker) {
            this.workers[id] = new DWorker(state.config, state.sockets);
        } else if (this.flowTypes[state.type].settings.isFlow) {
            this.workers[id] = new FlowWorker(state) as any;
        }
    }

    private connectWorkers(connection: XxlConnection): void {
        const fromWorker = this.getWorker(connection.from as number);
        const toWorker = this.getWorker(connection.to as number);

        if (toWorker && fromWorker) {
            const stream = fromWorker.getStream(this.getSocket(connection!.out!))!;

            toWorker.setStream(stream, this.getSocket(connection.in!), connection);
        }
    }
}
