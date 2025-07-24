export type CvAnalysisSectionFlags = {
  PersonalityAnalysis: boolean;
  CvEvaluation: boolean;
  SkillAssessment: boolean;
  JobIndustryMatrix: boolean;
  ActionableGuidence: boolean;
};

export type CvAssessmentSection = {
  assess: string;
  improve: string;
};

export type TraitReview = {
  analysis: string;
  whatResearchSays: string;
  whereYouFitBest: string;
  potentialChallenges: string;
  whyThisMatters: string;
  miniStorySnippet: string;
};
export type ResultSection = {
  id: number;
  order: number;
  innerHtml: string;
  categoryType: number;
  minValue: number | null;
  maxValue: number | null;
  isDeleted: boolean;
};
export type IndustryRecommendation = {
  industryName: string;
  industryDescription: string;
  why: string;
  percentage: string;
  jobTitles: string[];
};

export type IndustryScore = {
  order: number;
  name: string;
  score: number;
};

export interface JobRecommendation {
  cvFormat: CvAssessmentSection;
  keyInsight: CvAssessmentSection;
  cvEducationAndEmploymentHistory: CvAssessmentSection;
  cvAdditionalSection: CvAssessmentSection;
  cvStrengths: string[];
  cvAreasForImprovment: string[];
  cvActionablePlan: string[];
  traitReview: string;
  highestScoringPersonality: string;
  industryAlignment: string;
  whereToGo: string;
  personality: string;
  courseSuggestions: string[];
  certificateSuggestions: string[];
  networkingOpportunitiesSuggestions: string[];
  softSkillPotentialGaps: string[];
  hardSkillPotentialGaps: string[];
  strengths: string[];
  industryRecommendations: IndustryRecommendation[];
  industryReOrder: string[];
}
export type Resume = {
  id: string;
  userId: string;
  path: string;
  extension: string;
  size: number;
  filename: string;
  content: string;
  isDeleted: boolean;
};
export type Course = {
  id: number;
  industryTitle: string;
  industryId: number;
  name: string;
  level: string;
  cost: string;
  duration: string;
  credential: string;
  reviews: string;
  impact: string;
  platform: string;
};
export type UserAnswerHeader = {
  id: number;
  code:string;
  compeletedAt: string;
  email: string;
  userId: string;
  fullName:string;
  reportStatus: number;
  createAt: string;
  isDeleted: boolean;
  reportStatusName:string;
}
export type ResultBigFive = {
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
};
export interface ResultApiResponse {
  statusCode?: number;
  isSuccess?: boolean;
  message?: string | null;
  errors?: string | null;
  data?: {
    activeResult: {
      sections: CvAnalysisSectionFlags;
    };
    jobRecommendation: JobRecommendation;
    industryScores: IndustryScore[];
    sections?: ResultSection[];
    resume?: Resume;
    bigFiveAverage?: ResultBigFive;
    reportStatus?: number;
    courses?: Course[];
    userAnswerHeader?: UserAnswerHeader;
  };
}

