import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeOrmconfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
// import { typeOrmconfigAsync } from './configs/typeorm.config';



@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmconfigAsync),
    ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
