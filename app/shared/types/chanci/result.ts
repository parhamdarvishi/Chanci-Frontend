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
    traitReview: TraitReview[];
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
    };
}
