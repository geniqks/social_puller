import { getModelForClass } from "@typegoose/typegoose";


class CommentDto { }

export const CommentModel = getModelForClass(CommentDto);