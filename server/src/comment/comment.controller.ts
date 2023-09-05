import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CommentService } from './comment.service';
import { CommentDTO } from './dto/comment.dto';

@Controller('/api/v1/comments')
export class CommentController{
  constructor(public commentService : CommentService){}
  @Get(":id")
  async getComment(@Param("id") id : ObjectId){
    return this.commentService.handleGetComment(id)
  }
  @Post()
  async postComment(@Body() comment: CommentDTO){
    return this.commentService.handlePostComment(comment)
  }
}