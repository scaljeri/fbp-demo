import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { IPackage } from './interfaces';

export class DError extends DBase {
    private out = new Subject<IPackage>();

    getStream(): Observable<IPackage> {
        return this.out.asObservable();
    }

    inputHandler(payload: IPackage): void {
        if (!payload.errors) {
            payload.errors = [];
        }
        payload.errors.push('Authentication required');

        this.out.next(payload);
    }
}