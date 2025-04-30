export type FixedSection = {
  id: number;
  index: number;
  order: number;
  innerHtml: string;
  categoryType: number;
  minValue: number | null;
  maxValue: number | null;
}

export interface FixedSectionResponse {
  isSuccess?: boolean;
  message?: string;
  data?: {
    items ?: FixedSection[] 
  };
}