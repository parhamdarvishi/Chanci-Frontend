import {Course} from "@shared/types/chanci/result";

export type Industry = {
  id: number;
  parentId: number;
  title: string;
  description: string;
  isDeleted: boolean;
};
export type IndustryScore = {
  order: number;
  name: string;
  score: number;
};

export type OnlyIndustryResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: Industry[];
    totalCount: number;
  };
}
export type IndustryResponse = {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items?: Industry[];
    industryScores: IndustryScore[];
    jobRecommendation: {
      assess: string;
      industryRecommendations: IndustryRecommendation[];
    };
    courses: Course[];
    industries: Industry[];
    totalCount: number;
  };
};
type JobTitle = {
  title: string;
  minimumSalaryPerYear: number;
  maximumSalaryPerYear: number;
};

export type IndustryRecommendation = {
  industryName: string;
  industryDescription: string;
  jobTitles: JobTitle[];
};

