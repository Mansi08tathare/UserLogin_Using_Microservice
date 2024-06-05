// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv'


async function bootstrap() {
  const envFilePath = path.resolve(__dirname, '..', '..', 'common', '.env');
  console.log(envFilePath)

  dotenv.config({ path: envFilePath });
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001, 
    },
    
    


    
  });

  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
