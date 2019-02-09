import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminController } from './admin.controller';
import { AppService } from './app.service';
import { CryptoController } from './crypto.controller';
import { SiteController } from './site.controller';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CryptoController, SiteController],
  providers: [AppService],
})
export class AppModule {
}
