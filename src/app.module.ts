import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user/entity/user.entity';
import { Report } from './reports/entity/reports.entity';
import { ReportsModule } from './reports/reports.module';
import { CurrentUserMiddleware } from './user/middlewares/currentUser.middleware';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true
    }),
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
