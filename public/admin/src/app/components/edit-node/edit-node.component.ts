import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FB_SOCKET_COLORS, FbNodeState, SocketDetails, XxlSocket, XxlSocketType } from '../../../../projects/flow-based/src/lib/flow-based';
import { NodeService } from '../../../../projects/flow-based/src/lib/node/node-service';

@Component({
  selector: 'fb-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.scss']
})
export class EditNodeComponent implements OnInit, AfterViewInit, OnDestroy {
  sockets: XxlSocket[];
  state: FbNodeState;

  @Input() deleteSocket = true;

  @ViewChildren('action', {read: ElementRef}) refs: QueryList<ElementRef>;
  private connections: { [key: number]: number } = {};
  public socketDetails: SocketDetails[];

  constructor(private element: ElementRef,
              private fb: FormBuilder,
              private service: NodeService,
              @Inject(FB_SOCKET_COLORS) private socketColors: Record<string, string>) {
  }

  ngOnInit(): void {
    this.state = this.service.state;
    this.socketDetails = this.service.getSockets();
    this.sockets = this.socketDetails.reduce((output: XxlSocket[], sd: SocketDetails) => {
      output.push(sd.state);

      return output;
    }, []);
  }

  ngAfterViewInit(): void {
    this.service.removeConnections();

    setTimeout(() => {
      this.refs.forEach((ref, i) => {
        const el = ref.nativeElement;
        const id = parseInt(el.dataset.socketId, 10); // `edit-${i}`;

        const socketDetails = this.socketDetails.find(sd => sd.state.id === id)!;

        if (socketDetails.state.type === 'in') {
          this.connections[id] = this.service.addConnection(socketDetails.element, el);
        } else {
           this.connections[id] = this.service.addConnection(el, socketDetails.element);
        }
      });
    });
  }

  getSocketColor(socket: XxlSocket): string {
    return socket.color || this.socketColors[socket.format!] || '#ffffff';
  }

  setSocketColor(color, socket: XxlSocket): void {
    socket.color = color;
  }

  ngOnDestroy(): void {
    this.service.removeConnections();
  }

  onDelete(socket: XxlSocket, index: number): void {
    // this.service.removeConnection(this.connections[`edit-${index}`]);
    // TODO: This doesn't work at all
    this.service.removeConnections();
    this.service.flowService.removeSocket(socket);
    this.ngOnInit();
    this.ngAfterViewInit();
  }

  onCancel(): void {
    // this.dialogRef.close();
  }

  onApply(): void {
    // this.dialogRef.close(this.data.sockets);
  }

  hasSockets(): boolean {
    return !!this.sockets.length;
  }

  private closing(): void {
    // this.data.service.removeConnections();
  }


  get types(): string[] {
    return Object.keys(this.socketColors);
  }
}
