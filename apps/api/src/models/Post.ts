import { Comment } from './Comment';

export type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string | Category;
  comments: Comment[];
};

export type Category = {
  id: string;
  name: string;
};
