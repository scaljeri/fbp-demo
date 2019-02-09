import { ChangeDetectorRef, Component, Host, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeService } from '../../../../projects/flow-based/src/lib/node/node-service';
import { FbNodeState } from '../../../../projects/flow-based/src/lib/flow-based';

@Component({
  selector: 'fb-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  endpointControl = new FormControl();
  private state: FbNodeState;

  constructor(@Host() private service: NodeService) {
    this.state = service.state;
  }


  ngOnInit() {
    this.endpointControl.valueChanges.subscribe((endpoint: string) => {
      this.endpoint = endpoint;
    });

    this.endpointControl.setValue(this.endpoint);
  }

  onActive(): void {

  }

  get endpoint(): string {
    return this.state.config.endpoint;
  }

  set endpoint(ep: string)  {
    this.state.config.endpoint = ep;
  }
}
