export type Event = {
    title: String,
    desc: String,
    //poster: brandingPoster,
}
export type Events = {
    data: Event[]
};

export interface EventsResponse {
    isSuccess?: boolean;
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items?: Event[]; // Adjust the type as necessary
    };
  }