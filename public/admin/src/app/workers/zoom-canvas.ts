import { FbKeyValues, XxlConnection, XxlSocket, FbNodeWorker } from '../../../projects/flow-based/src/lib/flow-based';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { IDimensions, IZoomable } from '../app.models';

export const ZOOM_CANVAS_SETTINGS = {
  title: 'Zoomable canvas',
  config: {expanded: false},
  sockets: [
    {
      type: 'in',
      format: 'imageData'
    },
    {
      type: 'out',
      format: 'dimension'
    }
  ]
};

export class ZoomCanvasWorker implements FbNodeWorker {
  private imageData = new Subject<IZoomable>();
  private subscriptions: { [id: string]: Subscription } = {};
  private subject = new BehaviorSubject<IDimensions | null>(null);

  constructor() {
  }

  destroy(): void {
    Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].unsubscribe());
  }

  getStream(): Observable<any> {
    return this.subject.asObservable();
  }

  setStream(stream: Observable<any>, socket: XxlSocket, connection: XxlConnection): void {
    this.subscriptions[connection.id] = stream.subscribe((data: IZoomable) => {
      if (data) {
        this.imageData.next(data);
      }
    });
  }

  removeStream(connection: XxlConnection): void {
    this.subscriptions[connection.id].unsubscribe();

    delete this.subscriptions[connection.id];
  }

  get imageData$(): Observable<IZoomable> {
    return this.imageData.asObservable();
  }

  updateDimensions(data: IDimensions): void {
    this.subject.next(data);
  }

  connect(conn: XxlConnection, sockets: FbKeyValues<XxlSocket>): void {

  }
}
