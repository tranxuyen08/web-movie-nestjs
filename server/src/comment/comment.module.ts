import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CheckAuth } from 'src/middleware/auth.middleware';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Comments", schema: CommentSchema, collection: 'comments' }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      .forRoutes({ path: 'api/v1/comments', method: RequestMethod.POST });
  }
}
