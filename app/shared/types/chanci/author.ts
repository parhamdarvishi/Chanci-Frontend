export type Author = {
  id: number;
  fullName: string;
  linkToProfile: string;
  jobTitle: string;
  isDeleted: boolean;
  blogs: any;
};

export type AuthorResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: Author[];
    totalCount: number;
  };
};
