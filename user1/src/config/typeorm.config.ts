import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModuleAsyncOptions,TypeOrmModuleOptions} from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';


export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      //migrations:['migrations/**'],
      entities: [User],
      
        // other configurations
        "logging": true,
      
      
      synchronize: true,
   
    };
  }
}

// const typeOrmconfig =  new TypeOrmConfig()

export const typeOrmconfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
