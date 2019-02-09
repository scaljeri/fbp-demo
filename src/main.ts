import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useStaticAssets(join(__dirname, '..', 'public/demo/dist'));
  // app.useStaticAssets(join(__dirname, '..', 'public/admin'), {prefix: '/admin'});

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
