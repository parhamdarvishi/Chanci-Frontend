export interface IndustryRecommendation {
    industryName: string;
    industryDescription: string;
    why: string;
    percentage: number;
    jobTitles: string[];
}

export interface AnswerData {
    cvScore: number;
    personality: string;
    highestScoringPersonality: string;
    certificateSuggestions: string[];
    courseSuggestions: string[];
    hardSkillPotentialGaps: string[];
    industryRecommendations: IndustryRecommendation[];
    networkingOpportunitiesSuggestions: string[];
    softSkillPotentialGaps: string[];
    strengths: string[];
}

export interface IndustryScore {
    order: number;
    name: string;
    score: number;
}

export interface ConvertAnswersToPromptResponse {
    jobRecommendation: AnswerData;
    industryScores?: IndustryScore[];
}
