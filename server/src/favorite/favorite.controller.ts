import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
@Controller('/api/v1/favorites')
export class FavoriteController {
  constructor(public favoriteService: FavoriteService) {}

  @Post(':id')
  async likeFavorites(
    @Res() res: Response,
    @Param('id') id: ObjectId,
    @Body() body: { idUser: ObjectId },
  ) {
    return await this.favoriteService.handleLikeMovie(res, {
      idMovie: id,
      idUser: body.idUser,
    });
  }
  @Get()
  async getLikeMovie(@Body()  body: { idUser: string }){
    return await this.favoriteService.handleGetLikeMovie(body.idUser)
  }
  @Get()
  getListLikeMovie() {
    this.favoriteService.getListFavorite();
  }
}
