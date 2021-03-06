import { FbKeyValues, XxlConnection, XxlSocket, FbNodeWorker, XxlFlowUnitState } from '../../../projects/flow-based/src/lib/flow-based';
import { Observable, Subject, Subscription } from 'rxjs';

export const CUSTOM_CODE_SETTINGS = {
  title: 'Custom code',
  config: {func: '// const out = new Subject();\n// function(val) {\nout.next(val)'},
  sockets: [
    {
      type: 'in',
    },
    {
      type: 'out'
    }
  ]
};

export class CustomCodeWorker implements FbNodeWorker {
  private subject = new Subject<any>(); // OUTPUT
  private subscriptions: { [id: string]: Subscription } = {};
  private func: (any) => void;

  public compileError: Error | null;
  public runtimeError: Error | null;

  constructor(private config: any) {
    this.compileFunction();
  }

  destroy(): void {
    Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
  }

  getStream(): Observable<any> {
    return this.subject.asObservable();
  }

  setStream(stream: Observable<any>, socket: XxlSocket, connection: XxlConnection): void {
    this.subscriptions[connection.id] = stream.subscribe((val: any) => {
      try {
        this.func(val);
      } catch (err) {
        console.error(err);
        this.runtimeError = err;
      }
    });
  }

  removeStream(connection: XxlConnection): void {
    this.subscriptions[connection.id].unsubscribe();

    delete this.subscriptions[connection.id];
  }

  connect(conn: XxlConnection, sockets: FbKeyValues<XxlSocket>): void {

  }

  compileFunction(funcStr = this.config.func): void {
    this.config.func = funcStr;
    this.compileError = this.runtimeError = null;

    const inputFunc = `return function(val) { ${funcStr} }`;
    try {
      this.func = new Function('out', inputFunc)(this.subject);
    } catch (err) {
      console.error(err);
      this.compileError = err;
    }

    try {
      this.func(null); // Initial call
    } catch (err) {
      console.error(err);
      this.runtimeError = err;
    }
  }
}
