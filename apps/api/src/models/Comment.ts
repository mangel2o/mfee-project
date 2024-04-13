import { Document, Schema, model } from 'mongoose';

export interface IComment extends Document {
  author: string;
  content: string;
}

export const CommentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: [true, 'Property is required']
    },
    content: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  { timestamps: true }
);

export default model<IComment>('Comment', CommentSchema);
