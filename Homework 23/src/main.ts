import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressMiddleware } from 'middleware/express.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(ExpressMiddleware)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()