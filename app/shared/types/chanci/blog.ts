import { Author } from "./author";

export type BlogItem = {
  id: number;
  index: number;
  title: string;
  metaKey: string;
  metaDescription: string;
  description: string;
  bannerImagePath: string;
  authorId: number;
  author: Author;
};

export type BlogResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: BlogItem[];
    totalCount: number;
  };
};
