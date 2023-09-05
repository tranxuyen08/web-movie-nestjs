import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './favorite.schema';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { CheckAuth } from 'src/middleware/auth.middleware';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Favorite", schema: FavoriteSchema, collection: 'favorite' }]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      // .forRoutes({ path: 'api/v1/favorite', method: RequestMethod.PATCH },{ path: 'api/v1/users/logout', method: RequestMethod.POST });
      .forRoutes(FavoriteController);
  }
}
