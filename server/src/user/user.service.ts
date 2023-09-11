import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import cookie from 'cookie-parser';
import { IUserLogin } from './types';

require('dotenv').config();
let refreshTokenArr: string[] = [];

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserByEmail(email: string): Promise<User[] | { message: string }> {
    try {
      const searchRegex = new RegExp(email, 'i');
      const searchValue = await this.userModel
        .find({ email: searchRegex })
        .exec();
      if (searchValue.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return searchValue;
    } catch (error) {
      console.error('Error while searching product:', error);
      return { message: error.message || 'An error occurred' };
    }
  }
  async register(data: UserDTO): Promise<{ message: string }> {
    // Check if the email already exists
    try {
      const existingUser = await this.userModel.findOne({ email: data.email });

      if (existingUser) {
        throw new Error('Email already exists'); // Throw an error if the email is already in use
      }

      // If email doesn't exist, create the new user
      const saltRounds = 10; // Độ an toàn mã hóa của password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const user = new this.userModel({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role_admin: data.role_admin,
        role_subscription: data.role_subscription,
        role_active: data.role_active,
      });
      await user.save();
      // Perform your logic here
      return { message: 'User created successfully' };
    } catch (error) {
      console.log(error);
    }
  }
  async handleLogin(data: IUserLogin, res: Response): Promise<any> {
    try {
      const checkEmail = await this.userModel.findOne({ email: data.email });
      if (checkEmail) {
        const isPasswordMatched = await bcrypt.compare(
          data.password,
          checkEmail.password,
        );
        if (isPasswordMatched) {
          const accessToken = jwt.sign(
            { userId: checkEmail._id },
            process.env.SECRET_KEY,
            {
              expiresIn: '1d',
            },
          );
          const refreshToken = jwt.sign(
            { userId: checkEmail._id },
            process.env.SECRET_KEY_REFRESH_TOKEN,
            { expiresIn: '365d' },
          );
          // Thêm refreshToken vào mảng refreshTokenArr
          refreshTokenArr.push(refreshToken);
          const { password, ...userData } = checkEmail.toObject();
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'none', // Hoặc sameSite: "strict" hoặc không sử dụng sameSite
            secure: true,
          });

          return res.status(200).json({
            data: userData,
            accessToken,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    return res.status(200).json({ message: 'Login failed' });
  }
  async handleUpdateUser(data, _id: string) {
    try {
      const userUpdate = await this.userModel.findByIdAndUpdate(_id, data, {
        new: true,
        runValidators: true,
      });
      // if (data.avatar) {
      //   userUpdate.avatar = data.avatar;
      // }
      await userUpdate.save();
      return userUpdate;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error while updating product:', error);
      throw error;
    }
  }
  async handleUpdateAvatar(data, _id: string) {
    try {
      const userUpdate = await this.userModel.findByIdAndUpdate(
        _id,
        data.avatar,
        {
          new: true,
          runValidators: true,
        },
      );
      if (userUpdate) {
        userUpdate.avatar = data.avatar;
      }
      await userUpdate.save();
      return userUpdate
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error while updating product:', error);
      throw error;
    }
    return;
  }
  async handleLogout(req: Request, res: Response) {
    // Remove the lines related to accessToken
    // Clear the refreshToken cookie
    res.clearCookie('refreshToken');
    refreshTokenArr = refreshTokenArr.filter(
      (token) => token !== req.cookies.refreshToken,
    );
    res.status(200).json('Logout successfully');
  }
  async handleRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json('Unauthenticated');
    }
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json('Unauthenticated');
    }
    jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN,
      (err: any, user: any) => {
        if (err) {
          return res.status(400).json('refreshToken is not valid');
        }
        const { iat, exp, ...userOther } = user as { [key: string]: any }; // Type assertion for userOther
        refreshTokenArr = refreshTokenArr.filter(
          (token) => token !== refreshToken,
        ); // Lọc ra những thằng cũ
        // Nếu đúng thì nó sẽ tạo accessToken mới và cả refreshToken mới
        const newAccessToken = jwt.sign(userOther, process.env.SECRET_KEY, {
          expiresIn: '1d',
        });
        const newRefreshToken: any = jwt.sign(
          userOther,
          process.env.SECRET_KEY_REFRESH_TOKEN,
          { expiresIn: '365d' },
        );
        refreshTokenArr.push(newRefreshToken);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none', // hoặc sameSite: "strict"
        });
        return res.status(200).json({ accessToken: newAccessToken });
      },
    );
    return;
  }
}
