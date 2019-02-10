import { Component, Host, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FB_SOCKET_COLORS, FbNodeState } from '../../../../projects/flow-based/src/lib/flow-based';
import { NodeService } from '../../../../projects/flow-based/src/lib/node/node-service';

@Component({
  selector: 'fb-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  private state: FbNodeState;

  inputFormatControl = new FormControl();

  constructor(@Host() private service: NodeService,
              @Inject(FB_SOCKET_COLORS) private colors: Record<string, string>) {
    this.state = service.state;
  }

  ngOnInit() {
    this.inputFormatControl.valueChanges.subscribe((format: string) => {
      this.state.sockets![0].format = format;
    });

    this.inputFormatControl.setValue(this.state.sockets![0].format);
  }

  onActive(isActive): void {

  }

  get formats(): string[] {
    return Object.keys(this.colors);
  }
}
