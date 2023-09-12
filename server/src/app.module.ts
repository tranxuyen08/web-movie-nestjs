import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UsersModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CommentsModule } from './comment/comment.module';
import { GoogleAuthModule } from './authGoogle/authGoogle.module';
import { HistoryModule } from './saleManagement/saleManagement.module';
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DOCUMENT_NAME = process.env.DB_DOCUMENT_NAME;
@Module({
  imports: [
    ProductModule,
    UsersModule,
    FavoriteModule,
    CommentsModule,
    GoogleAuthModule,
    HistoryModule,
    MongooseModule.forRoot(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@xuyen.nvls4ac.mongodb.net/${DB_DOCUMENT_NAME}`,
    ),
  ],
})
export class DatabaseModule {}
