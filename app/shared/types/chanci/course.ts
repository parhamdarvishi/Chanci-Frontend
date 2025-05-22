export type Course = {
    id: number;
    industryId: number;
    industryTitle?: string;
    level: string;
    cost: string;
    duration: string;
    credential: string;
    review: string;
    impact: string;
    platform: string;
    link: string;
    name: string;
}

export interface CourseResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items ?: Course[]
    };
}