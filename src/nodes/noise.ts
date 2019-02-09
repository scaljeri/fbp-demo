import { Observable, Subject } from 'rxjs';
import { DBase } from './base';
import { IExchangeData, IPackage } from './interfaces';

export const NOISE_SETTINGS = {
    title: 'Noise',
    config: {
        noiseLevel: 15
    },
    sockets: [
        {
            type: 'in',
            format: 'exchange'
        },
        {
            type: 'out',
            format: 'exchange'
        }
    ]
};

export class DNoise extends DBase {
    private out = new Subject<IExchangeData[]>();

    getStream(): Observable<IExchangeData[]> {
        return this.out.asObservable();
    }

    inputHandler(payload: IExchangeData[]): void {
        this.out.next(payload.map(record => {
            record.value  = record.value * this.config.noiseLevel - this.config.noiseLevel / 2;

            return record;
        }));
    }
}