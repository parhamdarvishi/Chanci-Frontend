import { SlideData } from "@/widget/Candidates/model";

export interface ExternalReferenceResponse {
    isSuccess?: boolean;
    data?: {
       
      items: SlideData[]; // Adjust the type as necessary
    };
  }
  export type UserHeaders = {
    id: number,
    index: number;
    userId: string;
    createAt: string;//"2025-03-27T11:07:54.416183",
    fullName: string;
    email: string;
    reportStatusName: string;
    
    //userAnswers: null,
    isDeleted: boolean;
  }
  export type TPrompt = {
    id: number;
    content: string;
    minimalContent: string;
    role: number;
    parameters: any[];
    isActive: boolean;
  };
  export interface ApiResponse<T>{
    isSuccess?: boolean;
    data?: {
      items?: T[];
    };
    message?: string;
  }