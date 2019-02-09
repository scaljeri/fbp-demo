import { Get, Controller, Res, Req, Next, Param } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { finalhandler } from 'finalhandler';
import { DAuth } from './nodes/auth';
import { IExchangeData, IPackage } from './nodes/interfaces';
import { DRequest } from './nodes/request';
import { DFlow } from './utils/flow';

@Controller('/api/crypto')
export class CryptoController {
    constructor(private readonly appService: AppService) {
        new DAuth({});
    }

    @Get()
    getCryptos(): Observable<IPackage> {
        const flow: DFlow = this.appService.buildFlow('crypto');
        const request = flow.getWorkerByType('request')[0] as DRequest;
        const response = flow.getWorkerByType('response')[0];

        if (request) {
            request.insertRequest();

            return response.getStream();
        } else {
            return of({} as any);
        }
    }
}
