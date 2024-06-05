import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserController } from 'src/controllers/user.controller';
import { HealthCheckMicroservicesService } from 'src/service/healthCheck.service';
import { UserService } from 'src/service/user.service';



@Module({
  imports: [ 
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ])],
  controllers: [UserController],
  providers: [UserService,HealthCheckMicroservicesService],
})
export class GatewayUserModule {}