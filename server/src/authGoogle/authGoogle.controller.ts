import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAuthService } from './authGoogle.service';
import * as jwt from "jsonwebtoken";

@Controller('api/oauth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  async handleLoginGoogle(@Res() res, @Query('code') code: string) {
    try {
      const data = await this.googleAuthService.getOauthGoogleToken(code);
      // const token: any = await this.googleAuthService.generateToken(email);
      // console.log("token",token)
      const { id_token, access_token } = data;
      const googleUser = await this.googleAuthService.getGoogleUser({
        id_token,
        access_token
      });
      console.log("googleUser",googleUser)

      // Kiểm tra email đã được xác minh từ Google
      if (!googleUser.verified_email) {
        return {
          message: 'Google email not verified'
        };
      }

      const manual_access_token = jwt.sign(
        { email: googleUser.email, type: 'access_token' },
        process.env.AC_PRIVATE_KEY as string,
        { expiresIn: '15m' }
      );
      const manual_refresh_token = jwt.sign(
        { email: googleUser.email, type: 'refreshToken' },
        process.env.RF_PRIVATE_KEY as string,
        { expiresIn: '100d' }
      );

      // Redirect người dùng về trang login với access token và refresh token
      return res.redirect(
        `http://localhost:3000/login?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}`
      );
    } catch (error) {
      throw error;
    }
  }
}
