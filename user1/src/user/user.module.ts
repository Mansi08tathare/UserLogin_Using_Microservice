import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonService } from 'src/common-service/common-service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
   
  ],
  controllers: [UserController],
  providers: [UserService,CommonService],
})
export class UserModule {}
