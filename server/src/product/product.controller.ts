import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerUpload } from 'src/config/multer.config';
import { query } from 'express';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(public productService: ProductService) {
    //DONT DO THIS ON REAL APP
    //USE DEPENDENCY INJECTION
  }
  @Get()
  getProducts(
    @Res() res: Response,
    @Query('_page') page: number = 1,
    @Query('_limit') limit: number = 10,
  ) {
    return this.productService.findAll(res, page, limit);
  }
  @Post('/add-movie')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'backdrop_path', maxCount: 1 },
        { name: 'poster', maxCount: 1 },
      ],
      multerUpload,
    ),
  )
  creteProduct(@UploadedFiles() files: any, @Body() body) {
    let avatarUrl: string;
    if (files.backdrop_path & files.poster) {
      body.backdrop_path = files.backdrop_path[0].path;
      body.poster = files.poster[0].path;
    }
    return this.productService.createProduct(body);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    await this.productService.findByIdAndDelete(id);
    return { message: 'deleted successfully' };
  }
  @Get('/search')
  async searchProductByTitle(@Query('title') title: string) {
    const data = await this.productService.searchProductByTitle(title);
    return data;
  }
  @Get(':id')
  getProductById(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  @Patch(':id')
  async upDateProduct(@Body() body: any, @Param('id') id: string) {
    const update = await this.productService.updateProduct(id, body);
    return update;
  }
}
