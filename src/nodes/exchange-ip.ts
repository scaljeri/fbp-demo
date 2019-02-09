import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { XxlSocket } from './flow-based';
import { IExchangeData, IIP } from './interfaces';

export class DExchangeIp extends DBase {
    private out = new Subject<IIP>();
    private ip: IIP;
    private exchanges = [];

    getStream(): Observable<IIP> {
        return this.out.asObservable();
    }

    inputHandler(payload: IExchangeData[] | IIP, socket: XxlSocket): void {
        if (socket.name === 'ip') {
            this.ip = payload as IIP;
        } else {
            this.exchanges.push(payload as IExchangeData[]);
        }

        if (this.exchanges.length === this.subscriptions.length - 1 && this.ip) {
            this.ip.exchanges = this.exchanges;
            this.out.next(this.ip);
            this.ip = null;
            this.exchanges = [];
        }
    }
}