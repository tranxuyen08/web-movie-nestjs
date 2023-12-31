import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
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
  async postComment(@Req() req:any ,@Body() comment: CommentDTO ){
    comment.idUser = req.user.userId
    return this.commentService.handlePostComment(comment)
  }
}