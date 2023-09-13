import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
@Controller('/api/v1/favorite')
export class FavoriteController {
  constructor(public favoriteService: FavoriteService) {}

  @Post()
  async likeFavorites(
    @Req() req,
    @Res() res: Response,
    @Body() body: { idMovie: ObjectId },
  ) {
    return await this.favoriteService.handleLikeMovie(res, {
      idMovie: body.idMovie,
      idUser: req.user.userId,
    });
  }
  @Get()
  async getLikeMovie(@Req() req ){
    const idUser = req.user.userId;
    return await this.favoriteService.handleGetLikeMovie(idUser)
  }
  @Delete(":id")
  async deleteLikeMovie(@Param('id') param,@Req() req){
    const idMovie = param;
    return await this.favoriteService.handleDelete(idMovie)
  }
}
