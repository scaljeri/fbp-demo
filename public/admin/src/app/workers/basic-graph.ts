import { TapWorker } from './tap';

export const BASIC_GRAPH_CONFIG = {
  title: 'Basic Graph',
  sockets: [
    {
      type: 'in',
      format: 'number'
    },
    {
      type: 'out',
      format: 'number'
    }
  ]
};

export class BasicGraphWorker extends TapWorker {
  get values(): number[] {
    return this.history;
  }

  // connect(conn: XxlConnection, sockets: FbKeyValues<XxlSocket>): void {
  //
  // }
}
