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
    
    //userAnswers: null,
    isDeleted: boolean;
  }