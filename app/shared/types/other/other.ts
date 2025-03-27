import { SlideData } from "@/widget/Candidates/model";

export interface ExternalReferenceResponse {
    isSuccess?: boolean;
    data?: {
       
      items: SlideData[]; // Adjust the type as necessary
    };
  }