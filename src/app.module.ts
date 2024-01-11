import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { AttendeeModule } from './attendee/attendee.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: 
  [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[ormConfig],
      expandVariables:true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !='production'? ormConfig:ormConfigProd,
    }),    
    EventsModule, AttendeeModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
