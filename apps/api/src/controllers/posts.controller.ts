import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

const posts: Post[] = [];

// * UTILS
export const getPost = (id: string) => {
  return posts.find((post) => post.id === id);
};

// * ROUTES HANDLERS
export const getPosts = (req, res) => {
  res.status(200).json(posts);
};

export const getPostsByCategory = (req, res) => {
  const { category } = req.params;

  const categorizedPosts = posts.map((post) => post.category === category);
  res.status(200).json(categorizedPosts);
};

export const getPostById = (req, res) => {
  const { id } = req.params;

  const post = getPost(id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  }

  // * makes sure the category field is an object
  if (typeof post.category === 'string') {
    post.category = {
      id: post.category,
      name: 'something'
    };
  }

  res.status(200).json(post);
};

export const createPost = (req, res) => {
  const { title, image, description, category } = req.body;

  if (!title || !image || !description || !category) {
    res.status(400).json({ message: 'Some fields are missing' });
  }

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    image,
    description,
    category,
    comments: []
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

export const createCommentOnPost = (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author || !content) {
    res.status(400).json({ message: 'Some fields are missing' });
  }

  const post = getPost(id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  }

  const newComment: Comment = {
    id: Date.now().toString(),
    author,
    content
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
};

export const updatePostById = (req, res) => {
  const { id } = req.params;
  const { title, image, description, category } = req.body;

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    res.status(404).json({ message: 'Post not found' });
  }

  const post = posts[postIndex];
  const updatedPost = {
    ...posts[postIndex],
    title: title ?? post.title,
    image: image ?? post.image,
    description: description ?? post.description,
    category: category ?? post.category,
    comments: post.comments
  };

  posts[postIndex] = updatedPost;
  res.status(200).json(updatedPost);
};

export const deletePostById = (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    res.status(404).json({ message: 'Post not found' });
  }

  const deletedPosts = posts.splice(postIndex, 1);
  res.status(200).send(deletedPosts[0]);
};
