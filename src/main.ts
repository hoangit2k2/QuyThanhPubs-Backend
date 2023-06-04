import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:4200' });
  // app.enableCors({ origin: 'https://quythanh-zlii.onrender.com' });
  const corsOptions: CorsOptions = {
    origin: 'https://quythanh-zlii.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));
  const config = new DocumentBuilder()
    .setTitle('Quy Thanh Pubs')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('quythanhpubs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
