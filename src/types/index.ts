
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  publishYear: number;
  categories: string[];
  prices: BookPrice[];
  purchased: boolean;
  likes: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  bookId: string;
}

export interface BookPrice {
  id: string;
  price: number;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  sellerId: string;
  sellerName: string;
}

export interface Discussion {
  id: string;
  bookId: string;
  chapterId?: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  discussionId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  purchasedBooks: string[];
}
