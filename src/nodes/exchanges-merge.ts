import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { XxlSocket } from './flow-based';
import { IExchangeData, IIP } from './interfaces';

export class DExchangeMerge extends DBase {
    private out = new Subject<IExchangeData[]>();
    private ip: IIP;
    private exchanges = [];

    getStream(): Observable<IExchangeData[]> {
        return this.out.asObservable();
    }

    inputHandler(payload: IExchangeData[], socket: XxlSocket): void {
        this.exchanges.push(payload);

        if (this.exchanges.length === this.subscriptions.length) {
            const exchange: IExchangeData[] = [];

            for(let i = 0; i < this.exchanges[0].length; i++) {
                const newVal = this.exchanges.reduce((out, item) => {
                    out.value += item[i].value;
                    return out;
                }, {...this.exchanges[0][i], value: 0});
                // newVal.value /= this.exchanges.length;
                exchange.push(newVal);
            }
            this.out.next(exchange);
            this.exchanges = [];
        }
    }
}