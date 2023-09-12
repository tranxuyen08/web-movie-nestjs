import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './saleManagement.schema';
import { HistoryService } from './saleManagement.service';
import { HistoryController } from './saleManagement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "History", schema: HistorySchema, collection: 'salesManagement' }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})

export class HistoryModule{}