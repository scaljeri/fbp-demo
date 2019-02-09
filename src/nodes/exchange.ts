import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { XxlSocket } from './flow-based';
import { IExchangeData, IPackage } from './interfaces';

const SIGNAL = [0, 2, 5, 3, 5, 5, 2, -3, -5, 5, 5, 5, 0];

export class DExchange extends DBase {
    private out = new Subject<IExchangeData[]>();

    inputHandler(payload: IPackage): void {
        this.out.next(this.getData());
    }


    getData(): IExchangeData[] {
        const data = [];

        for (let i = 1; i < 500; i++) {
            const date = new Date(2018, 0, i);
            const val = i > 200 && i < 200 + SIGNAL.length ? SIGNAL[i - 200] : 0;

            data.push({date, name: "name" + i, value: val});
        }

        return data;
    }

    getStream(socket?: XxlSocket): Observable<IExchangeData[]> {
        return this.out.asObservable();
    }
}