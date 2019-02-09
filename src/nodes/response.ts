import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { XxlSocket } from './flow-based';
import { IPackage } from './interfaces';

export class DResponse extends DBase {
    private out = new Subject<IPackage>();

    getStream(socket?: XxlSocket): Observable<IPackage> {
        return this.out.asObservable();
    }

    inputHandler(payload: IPackage): void {
        this.out.next(payload);
        this.out.complete();
    }
}