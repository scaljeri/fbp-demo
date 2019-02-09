import { Component, Host, OnInit } from '@angular/core';
import { FbNodeState } from '../../../../projects/flow-based/src/lib/flow-based';
import { NodeService } from '../../../../projects/flow-based/src/lib/node/node-service';

@Component({
  selector: 'xxl-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  private state: FbNodeState;

  constructor(@Host() private service: NodeService) {
    this.state = service.state;
  }

  ngOnInit() {
  }
}

