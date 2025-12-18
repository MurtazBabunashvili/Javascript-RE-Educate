import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HasTokenGuard } from './guards/HasToken.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HasTokenGuard],
  exports: [HasTokenGuard],
})
export class AuthModule {}
