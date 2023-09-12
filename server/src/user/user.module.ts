import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, UsersSchema } from './user.schema';
import { CheckAuth } from 'src/middleware/auth.middleware';
import { authGooglesSchema } from 'src/authGoogle/authGoogle.schema';
import { HistorySchema } from 'src/saleManagement/saleManagement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UsersSchema, collection: 'users' },{ name: "authGoogle", schema: authGooglesSchema, collection: 'authGoogle' },{ name: "History", schema: HistorySchema, collection: 'salesManagement' }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      .forRoutes({ path: 'api/v1/users/update/:id', method: RequestMethod.PATCH },{ path: 'api/v1/users/logout', method: RequestMethod.POST });
      // .forRoutes(UserController);
  }
}
