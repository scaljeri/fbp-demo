import { FbKeyValues, XxlConnection, XxlSocket, FbNodeWorker } from '../../../projects/flow-based/src/lib/flow-based';
import { Observable, Subject } from 'rxjs';

export const RANDOM_NUMBER_SETTINGS = {
  title: 'Random number generator',
  config: {
    min: 0,
    max: 100,
    start: 0,
    end: 1,
    intervalMax: 10000,
    intervalMin: 100,
    interval: 1000,
    integer: true
  },
  sockets: [
    {
      type: 'out',
      format: 'number'
    }
  ]
};

export class RandomNumbersWorker implements FbNodeWorker {
  private intervalId: number;
  private subject = new Subject<any>();

  constructor(private config: any) {
    this.initialize();
  }

  destroy(): void {
    clearInterval(this.intervalId);
  }

  getStream(): Observable<any> {
    return this.subject.asObservable();
  }

  initialize(): void {
    clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      const random = Math.random() * (this.end - this.start) + this.start;

      this.subject.next(this.integer ? Math.round(random) : random);
    }, this.config.interval);

  }

  removeStream(connection: XxlConnection): void { /* not used */
  }

  setStream(stream: Observable<any>, socket: XxlSocket, connection: XxlConnection): void {  /* not used */
  }

  get start(): number {
    return this.config.start;
  }

  set start(value: number) {
    this.config.start = value;
  }

  get end(): number {
    return this.config.end;
  }

  set end(value: number) {
    this.config.end = value;
  }

  get min(): number {
    return this.config.min;
  }

  get max(): number {
    return this.config.max;
  }

  get interval(): number {
    return this.config.interval;
  }

  set interval(val) {
    this.config.interval = val;
    this.initialize();
  }

  get intervalMin(): number {
    return this.config.intervalMin;
  }

  get intervalMax(): number {
    return this.config.intervalMax;
  }

  get integer(): boolean {
    return this.config.integers;
  }

  set integer(val: boolean) {
    this.config.integers = val;
  }

  connect(conn: XxlConnection, sockets: FbKeyValues<XxlSocket>): void {

  }
}
