import { Module } from '@nestjs/common';
import { NextModule } from '../logics/next/next.module';
import { AuthModule } from '../logics/auth/auth.module';
import { UserModule } from '../logics/user/user.module';
import { ApiAuthController } from './api/auth.controller';
import { ApiUserController } from './api/user.controller';
import { AuthController } from './auth.controller';
import { HomeController } from './home.controller';

@Module({
  imports: [
    NextModule,
    AuthModule,
    UserModule,
  ],
  controllers: [
    ApiAuthController,
    AuthController,
    HomeController,
    ApiUserController,
  ],
})
export class RouteModule {}
