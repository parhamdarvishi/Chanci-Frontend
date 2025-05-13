type Author = {
  id: number;
  fullName: string;
  linkToProfile: string;
  jobTitle: string;
  isDeleted: boolean;
  blogs: any;
};

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

export type BlogData = {
  items: BlogItem[];
  totalCount: number;
};

export type BlogResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: BlogItem[];
    totalCount: number;
  };
};
