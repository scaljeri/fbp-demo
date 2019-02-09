import { Get, Controller, Res, Req, Next, Param } from '@nestjs/common';
import * as path from 'path';
import { AppService } from './app.service';
import { finalhandler } from 'finalhandler';

@Controller('admin')
export class AdminController {
    constructor(private readonly appService: AppService) {
    }

    // @Get(':id')
    // userById(@Param() par): string {
    //   return `Je ID = ${par.id}`;
    // }

    // @Get()
    // getAdminA(@Res() response): void {
    //     response.sendFile(path.resolve('./public/admin/index.html'));
    // }

    @Get('/?*')
    getAdminB(@Res() res, @Req() req): void {
        const url = req.url.replace(/^\/admin/, '');

        console.log('ADMIN: ' + url);
        if (url.match(/sw.js/)) {
            return null;
        } else if (url.match(/\.\w+$/)) {
            res.sendFile(path.resolve(`./public/admin${url}`));
        } else {
            res.sendFile(path.resolve(`./public/admin/dist/flow-based-demo/index.html`));
        }
    }
}
