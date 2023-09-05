require('dotenv').config();
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


@Injectable()
export class CheckAuth implements NestMiddleware{

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.sendStatus(401); // Unauthorized
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.sendStatus(401); // Unauthorized
    }
    const token = tokenParts[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user): void => {
      if (err) {
        res.status(403).json("Token is not valid");
      } else {
        // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
        (req as any).user = user;
        next();
      }
    });
  }
}