import { Observable, Subject, Subscription } from 'rxjs';
import { FbNodeWorker, XxlConnection, XxlSocket } from './flow-based';
import { IPackage, IRequest } from './interfaces';

export class DRequest implements FbNodeWorker {
    private out = new Subject<IPackage>();
    private subscriptions: Subscription[];


    destroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    getStream(socket?: XxlSocket): Observable<IPackage> {
        return this.out.asObservable();
    }

    setStream(stream: Observable<IRequest>, socket: XxlSocket, connection?: XxlConnection): void {
        this.subscriptions.push(stream.subscribe(r => {
            this.insertRequest(r);
        }));
    }

    insertRequest(req?: IRequest): void {
        // TODO: Transform IRequest to IPackage
        setTimeout(() => {
            this.out.next({} as IPackage);
        })
    }
}