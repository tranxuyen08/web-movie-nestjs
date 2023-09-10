import { Module } from '@nestjs/common';
import { GoogleAuthController } from './authGoogle.controller';
import { GoogleAuthService } from './authGoogle.service';
import { JwtModule } from '@nestjs/jwt';
require("dotenv").config()

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Thay bằng secret key thực tế
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class GoogleAuthModule {}