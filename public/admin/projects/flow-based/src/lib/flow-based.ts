import { InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketComponent } from './socket/socket.component';

export const XXL_FLOW_TYPES = new InjectionToken<FbNodeTypes>('xxl-flow-types');
export const XXL_FLOW_UNIT_STATE = new InjectionToken<FbNodeTypes>('xxl-flow-unit-state');
export const FB_NODE_HELPERS = new InjectionToken<FbNodeTypes>('fb-node-helpers');
export const FB_SOCKET_COLORS = new InjectionToken<FbNodeTypes>('fb-socket-colors');

// export const XXL_WORKERS = new InjectionToken<FbNodeTypes>('xxl-worker-service');


export interface FbKeyValues<T> {
  [key: number]: T;
}

export interface FbNodeType {
  component?: Type<any>;
  settings?: { config: any, title: string, sockets: XxlSocket[], isFlow: boolean };
  type: string;
  worker?: FbNodeWorker;
}

export type FbNodeTypes = FbKeyValues<FbNodeType>;

export interface FbNodeHelpers {
  resetSockets(node: FbNodeState): void;
  connect(outSocket: XxlSocket, inSocket: XxlSocket, fromNode: XxlFlowUnitState, toNode: XxlFlowUnitState): boolean;
}

// Describes the class doing the actual work
export interface FbNodeWorker {
  getStream(socket?: XxlSocket): Observable<any>;

  setStream(stream: Observable<any>, socket: XxlSocket, connection?: XxlConnection): void;

  removeStream(connection?: XxlConnection): void;

  destroy(): void;
}


export interface XxlPosition {
  x: number;
  y: number;
}

export interface XxlFlowUnitState {
  type: string;
  id?: number;
  config?: any;
  title?: string;
  position?: XxlPosition;
  sockets?: XxlSocket[];
}

export interface XxlFlow extends Partial<XxlFlowUnitState> {
  connections: XxlConnection[];
  children: FbNodeState[];
}

export interface FbNodeState {
  type: string;
  id?: number;
  config?: any;
  title?: string;
  position?: XxlPosition;
  sockets?: XxlSocket[];
  connections?: XxlConnection[];
  children?: FbNodeState[];
}

export interface XxlConnection {
  from: number | HTMLElement;
  to: number | HTMLElement;
  in?: number;
  out?: number;
  id: number;
}

export type XxlSocketType = 'in' | 'out';

export interface XxlSocket {
  type: XxlSocketType;
  id?: number;
  color?: string;
  name?: string;
  format?: string;
  position?: number;
  description?: string;
  aux?: 'string';
}

export interface XxlSocketEvent {
  socket: XxlSocket;
  parentId: number;
  scope: number;
  event: PointerEvent;
}

export interface SocketDetails {
  state: XxlSocket;
  element: HTMLElement,
  comp: SocketComponent;
  parentId: number;
  scope: number;
}

export interface ConnectionDetails {
  connection: XxlConnection;
  sockets: { [key: number]: XxlSocket};
}

export interface XxlWorkerService {
  create(id: number, type: string): FbNodeWorker;
}

export type FbSocketColors = Record<string, string>;

export class XxlDriver {
  private flow: XxlFlow[];
  private workers: FbNodeWorker[];
  private connections = [] as XxlConnection[];
  private running = false;

  delete(index: number): void {

  }

  add(unit: XxlFlow): void {

  }

  connectSockets(connection: XxlConnection): void {
    this.connections.push(connection);

    if (this.running) {
      // build connection
    }
  }

  start(): void {
    // this.blocks = [];
    this.running = true;

    // this.flowEntries.forEach((entry: FbNode) => {
    // this.workers.push(entry.factory.create(entry.config).start());
    // });

    // Loop through connections
  }

  stop(): void {
    this.running = false;

    // this.workers.forEach((block: FbNodeWorker) => block.stop());
  }
}

export abstract class FlowBasedServiceHelper {
  private flowHandlers;

  abstract createWorker(type: string): FbNodeWorker;

  addFlowHandler(callback: (type: string, worker: FbNodeWorker) => void): void {
    this.flowHandlers.unshift(callback);
  }

  removeFlowHandler(): void {
    this.flowHandlers.shift();
  }
}
