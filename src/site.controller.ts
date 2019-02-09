import { Get, Controller, Res, Req, Next, Param } from '@nestjs/common';
import * as path from "path";
import { AppService } from './app.service';
import { finalhandler } from 'finalhandler';

@Controller()
export class SiteController {
    constructor(private readonly appService: AppService) {}

    @Get('*')
    getSite(@Res() res, @Req() req): void {
        const url = req.url;

        if (url.match(/sw.js/)) {
            return null;
        } else if (url.match(/\.\w+$/)) {
            res.sendFile(path.resolve(`./public/site/dist${url}`));
        } else {
            res.sendFile(path.resolve(`./public/site/dist/index.html`));
        }
    }
}
