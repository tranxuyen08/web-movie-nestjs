import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class HistoryService{
  constructor(
    @InjectModel('History') private historyModel: Model<History>
  ){}
  async handleGetAllHistory(){
    return await this.historyModel.find().populate("idUser").exec()
  }
}