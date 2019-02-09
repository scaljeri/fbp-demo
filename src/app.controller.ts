import { Get, Controller, Res, Req, Next, Param, Post, Body } from '@nestjs/common';
import { XxlFlow } from '../public/admin/dist/flow-based';
import { AppService } from './app.service';
import { finalhandler } from 'finalhandler';

@Controller('api/flow')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get(':type')
  getFlow(@Param('type') type: string): XxlFlow {
      return this.appService.getFlow(type);
  }

  @Post(':type')
  updateFlow(@Param('type') type: string, @Body() body): void {
      this.appService.updateFlow(type, body);
  }

  // @Get('*')
  // getMain(@Res() res, @Req() req, @Next() n): void {
  //   console.log('MAIN');
  //   var serve = serveStatic(join(__dirname, '..', 'public/demo/dist'), {'index': ['index.html', 'index.htm']});
  //   serve(req as any, res as §any, n)
  // }
}
