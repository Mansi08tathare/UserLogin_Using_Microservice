import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';



// import { ConfigModule ,ConfigService} from '@nestjs/config';
import { GatewayUserModule } from './gateway/gateway.module';



// import { HealthCheckMicroservicesService } from './mqtt/services/HealthCheck.service';



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
   
    ]),
   
    GatewayUserModule
  ],
  
  providers: []
})
export class AppModule {}
