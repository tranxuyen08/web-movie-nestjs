import { Type } from "@nestjs/common";
import { ObjectId, Types } from "mongoose";

export class CommentDTO {
  idMovie : Types.ObjectId;
  idUser : Types.ObjectId;
  titleComment : string;
  rating?: number;
}