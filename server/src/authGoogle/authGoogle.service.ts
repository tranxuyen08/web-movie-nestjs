import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
require("dotenv").config()

@Injectable()
export class GoogleAuthService {
  constructor(private readonly jwtService: JwtService) {}
  async getEmailFromCode(code: string) {
    const data = await this.getOauthGoogleToken(code);
    // Đây, bạn có thể trích xuất email từ data nếu có thông tin email trong response.
    const email = data
    return email;
  }
  async getOauthGoogleToken(code: string) {
    const body = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI as string,
      grant_type: 'authorization_code'
    });

    const { data } = await axios.post(
      'https://oauth2.googleapis.com/token',
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return data;
  }


  async generateToken(email: string) {
    const payload = { email, expiresIn: '15m' };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async getGoogleUser({ id_token, access_token }: { id_token: string, access_token: string }) {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        params: {
          access_token,
          alt: 'json'
        },
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      }
    );

    return data;
  }
}
