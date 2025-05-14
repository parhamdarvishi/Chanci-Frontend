export type Industry = {
  id: number;
  parentId: number;
  title: string;
  description: string;
  isDeleted: boolean
};

export type IndustryResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: Industry[];
    totalCount: number;
  };
};