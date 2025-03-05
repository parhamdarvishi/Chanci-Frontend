import { speaker } from "../speakers/speaker";

export type Event = {
  id: number;
  shortTitle: string;
  longTitle: string;
  description: string;
  speakers: speaker[]
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