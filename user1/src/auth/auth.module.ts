import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtModule,JwtService} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CommonService } from 'src/common-service/common-service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    // UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
    
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
UserModule,TypeOrmModule.forFeature([User])
],
  controllers: [AuthController],
  providers: [AuthService,ConfigService,CommonService,JwtService],
  exports: [AuthService],

})
export class AuthModule { }
