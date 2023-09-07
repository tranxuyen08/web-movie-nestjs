import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { Model, Types } from 'mongoose';
import { CommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comments') private commentModel: Model<Comment>) {}
  async handleGetComment(id) {
    try {
      const movieId = new Types.ObjectId(id);
      const comments = await this.commentModel
        .find({ idMovie: movieId })
        .populate('idUser')
        .exec();
      return comments;
    } catch (error) {
      console.error(error);
    }
  }
  async handlePostComment(data : CommentDTO) {
    data.idMovie = new Types.ObjectId(data.idMovie)
    try {
      const newComment = new this.commentModel(data);
      return newComment.save();
    } catch (error) {
      console.error(error);
    }
  }
}
