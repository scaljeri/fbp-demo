import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { XxlFlow } from '../../../projects/flow-based/src/lib/flow-based';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private http: HttpClient) { }

  loadFlow(type: string): Observable<XxlFlow> {
    return this.http.get(`/api/flow/${type}`).pipe(
        map(json => json as XxlFlow)
    );
  }

  saveFlow(type: string, flow: XxlFlow): Observable<any> {
    return this.http.post(`/api/flow/${type}`, flow);
  }
}
