export type Job = {
    id: number;
    industryId: number;
    title?: string;
    description: string;
    link: string;
    salary: string;
    responsibilities: string;
    basicQualifications: string;
    preferredQualifications: string;
}

export interface JobResponse {
    isSuccess?: boolean;
    message?: string;
    data?: {
        items ?: Job[]
    };
}