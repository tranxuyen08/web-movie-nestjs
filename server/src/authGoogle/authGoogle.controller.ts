import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAuthService } from './authGoogle.service';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { authGoogle } from './authGoogle.schema';
let refreshTokenArr: string[] = [];

@Controller('api/oauth/google')
export class GoogleAuthController {
  constructor(
    @InjectModel('authGoogle') private userModelAuthGoogle: Model<authGoogle>,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Get()
  async handleLoginGoogle(@Res() res, @Query('code') code: string) {
    try {
      const data = await this.googleAuthService.getOauthGoogleToken(code);
      const { id_token, access_token } = data;
      const googleUser = await this.googleAuthService.getGoogleUser({
        id_token,
        access_token,
      });
      // Kiểm tra email đã được xác minh từ Google
      if (!googleUser.verified_email) {
        return {
          message: 'Google email not verified',
        };
      }
      const existingUser = await this.userModelAuthGoogle.findOne({
        email: googleUser.email,
      });

      if (!existingUser) {
        // Người dùng chưa tồn tại, tạo một bản ghi mới
        const newUser = new this.userModelAuthGoogle({
          firstName: googleUser.family_name,
          lastName: googleUser.given_name,
          email: googleUser.email,
          password: '', // Bạn có thể để trống hoặc set một giá trị mặc định
          role_admin: 1, // Các giá trị mặc định khác nếu cần
          role_subscription: 1,
          role_active: 1,
          avatar: googleUser.picture,
        });

        await newUser.save();
      }

      const manual_access_token = jwt.sign(
        {
          firstName: googleUser.family_name,
          lastName: googleUser.given_name,
          email: googleUser.email,
          password: '',
          role_admin: 1,
          role_subscription: 1,
          role_active: 1,
          avatar: googleUser.picture,
        },
        process.env.AC_PRIVATE_KEY as string,
        { expiresIn: '15m' },
      );
      const manual_refresh_token = jwt.sign(
        {
          firstName: googleUser.family_name,
          lastName: googleUser.given_name,
          email: googleUser.email,
          password: '', // Bạn có thể để trống hoặc set một giá trị mặc định
          role_admin: 1, // Các giá trị mặc định khác nếu cần
          role_subscription: 1,
          role_active: 1,
          avatar: googleUser.picture,
        },
        process.env.RF_PRIVATE_KEY as string,
        { expiresIn: '100d' },
      );
      refreshTokenArr.push(manual_refresh_token);
      // const userLoginGoogle = googleUser.toObject();
      //     res.cookie('refreshToken', manual_refresh_token, {
      //       httpOnly: true,
      //       sameSite: 'none', // Hoặc sameSite: "strict" hoặc không sử dụng sameSite
      //       secure: true,
      //     });

      // Redirect người dùng về trang login với access token và refresh token
      return res.redirect(
        `http://localhost:3000/login?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}`,
      );
    } catch (error) {
      throw error;
    }
  }
}
