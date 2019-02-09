import { Observable, Subscription } from 'rxjs';
import { FbNodeWorker, XxlConnection, XxlSocket } from './flow-based';
import { IPackage } from './interfaces';

export abstract class DBase implements FbNodeWorker {
    protected subscriptions: Subscription[] = [];

    constructor(protected config: any) {
        console.log('CONFIG', config);
    }

    destroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    abstract inputHandler(payload: any, socket: XxlSocket, connection?: XxlConnection): void;

    abstract getStream(socket?: XxlSocket): Observable<any>;

    setStream(stream: Observable<IPackage>, socket: XxlSocket, connection?: XxlConnection): void {
        this.subscriptions.push(stream.subscribe(r => {
            this.inputHandler(r, socket, connection);
        }));
    }
}