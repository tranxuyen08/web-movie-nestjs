import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { ProductSchema } from './product.entites';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "ProductsMovie", schema: ProductSchema, collection: 'productsMovie' }]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
