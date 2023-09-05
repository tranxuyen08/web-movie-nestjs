import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './favorite.schema';
import { Model, Types } from 'mongoose';
import { Response } from 'express';
import { FavoriteModule } from './favorite.module';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel('Favorite') private favoriteModel: Model<Favorite>,
  ) {}

  async handleLikeMovie(res: Response, { idMovie, idUser }) {
    const userId = new Types.ObjectId(idUser); // Chuyển đổi thành ObjectId
    const movieId = new Types.ObjectId(idMovie); // Chuyển đổi thành ObjectId
    try {
      const checkFavorite = await this.favoriteModel
        .findOne({ idUser: userId, idMovie: movieId })
        .populate('idMovie')
        .exec();

        if (checkFavorite) {
          // Nếu đã có trong danh sách yêu thích, xóa khỏi danh sách
          await checkFavorite.deleteOne();
          res
            .status(200)
            .json({ message: 'Loại bỏ khỏi danh sách yêu thích thành công' });
        } else {
          // Nếu chưa có trong danh sách yêu thích, thêm vào danh sách
          const newFavorite = new this.favoriteModel({ idUser: userId, idMovie: movieId });
          await newFavorite.save();
          res
            .status(200)
            .json({ message: 'Bộ phim đã được thêm vào danh sách yêu thích' });
        }
    } catch (error) {
      console.error(error);
    }
}


  async handleGetLikeMovie(idUser: string) {
    const userId = new Types.ObjectId(idUser); // Chuyển đổi thành ObjectId

    try {
      const favoriteMovie = await this.favoriteModel
        .findOne({idUser: userId})
        .populate('idMovie')
        .exec();
      return favoriteMovie;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting favorite movie');
    }
  }
  async getListFavorite(): Promise<{ message: string }> {
    try {
      const favorite = await this.favoriteModel
        .find()
        .populate('idMovie')
        .populate('idUser')
        .exec();
      console.log(1111, favorite);
      return { message: 'favorite' };
    } catch (error) {
      console.log(error);
    }
  }
}
