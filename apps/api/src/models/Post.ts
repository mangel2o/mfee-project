import { Document, Schema, model } from 'mongoose';
import { IComment } from './Comment';

export interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: string | ICategory;
  comments: IComment[];
}

export interface ICategory {
  id: string;
  name: string;
}

export const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Property is required']
    },
    image: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Property is required']
    },
    category: {
      ref: 'Category',
      type: Schema.Types.ObjectId
    },
    comments: {
      type: [{ ref: 'Comment', type: Schema.Types.ObjectId }]
    }
  },
  { timestamps: true }
);

export default model<IPost>('Post', PostSchema);
