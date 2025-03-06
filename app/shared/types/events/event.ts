import { Speaker } from "../speakers/speaker";

export type Event = {
  id: number;
  address: string;
  shortTitle: string;
  longTitle: string;
  description: string;
  isShowable: boolean;
  speakers: Speaker[];
  supportedBy: string;
  hostedBy: string;
  redirectUrl: string;
  start: string;
  end: string;
  cardImagePath: string;
  mobileImagePath: string;
  content: string;
  bannerImagePath: string | null;
}
export type Events = {
    data: Event[]
};

export interface EventsResponse {
    isSuccess?: boolean;
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: Event[]; // Adjust the type as necessary
    };
  }