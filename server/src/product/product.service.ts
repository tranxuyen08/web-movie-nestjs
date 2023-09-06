import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductsMovie, ProductDocument } from './product.entites'; // Import ProductDocument
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("ProductsMovie") private productModel: Model<ProductsMovie>,
  ) {}

  async findAll(res,page,limit ): Promise<ProductsMovie[]> {
    try{
      const skip = (page - 1) * limit;
      const totalMovie = await this.productModel.find();
      const movies = await this.productModel.find().skip(skip).limit(limit).exec()
      return res.status(200).json({
        data: movies,
        pagination: {
          _limit: Number(limit),
          _page: Number(page),
          _totalMovie: totalMovie.length,
        },
      });
    }catch(error){
      return res.status(500).json({ msg: "Lỗi server" });
    }
  }

  async findOne(_id: ObjectId): Promise<ProductsMovie | null> {
    return  await this.productModel.findById(_id).exec();
  }

  async createProduct(data: ProductDTO): Promise<{ message: string }> {
    const product = new this.productModel(data); // Use the model to create an object

    try {
      await product.save(); // Save the created object to the database
      return { message: 'Created successfully' };
    } catch (err) {
      console.log(err);
      throw new Error('Error creating product');
    }
  }
  async findByIdAndDelete(id: string): Promise<{ message: string }> {
    try {
      const product = await this.productModel.findByIdAndDelete(id).exec();
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Product deleted successfully' };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateProduct(id: string, data): Promise<{ message: string }> {
    try {
      const update = await this.productModel
        .findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        .exec();
      return { message: 'Update successfully' };
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error while updating product:', error);
      throw error;
    }
  }
  async searchProductByTitle(title: string): Promise<ProductsMovie[] | { message: string }> {
    try {
      const searchRegex = new RegExp(title, 'i');
      const searchValue = await this.productModel.find({ title: searchRegex }).exec();

      if (searchValue.length === 0) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return searchValue;
    } catch (error) {
      console.error('Error while searching product:', error);
      return { message: error.message || 'An error occurred' };
    }
  }
  async handleGetMoviePopular(res, limit : number) {
    try {
      const popularMovie = await this.productModel.find()
        .sort({
          popularity: -1,
        })
        .limit(limit);
      res.status(200).json({ data: popularMovie });
    } catch (err) {
      // Lỗi server
      console.error("Error handling add movie:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async handleGetMovieByTopRate(res, limit){
    try {
      const rateMovie = await this.productModel.find()
        .sort({
          vote_average: -1,
        })
        .limit(limit);
      res.status(200).json({ data: rateMovie });
    } catch (err) {
      // Lỗi server
      console.error("Error handling add movie:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
