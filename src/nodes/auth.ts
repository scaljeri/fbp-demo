import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { XxlSocket } from './flow-based';
import { IPackage, IRequest } from './interfaces';

export class DAuth extends DBase {
    private ok = new Subject<IPackage>();
    private notOk = new Subject<IPackage>();

    getStream(socket?: XxlSocket): Observable<IPackage> {
        const retVal = socket.name === 'ok' ? this.ok : this.notOk;

        return retVal.asObservable();
    }

    inputHandler(payload: IPackage): void {
        const retVal = payload.isAuth ? this.ok : this.notOk;

        retVal.next(payload);
    }
}