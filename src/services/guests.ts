import { api } from "./api";

export type EventContent = {
  lang: string;
  content: string | number | boolean;
  type: "name" | "description";
};

export type CreateEventParams = {
  contents: EventContent[];
  start_date: string;
  end_date: string;
  location: string;
  free_wifi: boolean;
  public: boolean;
  tickets_amount: number;
  status: string;
};

export type Event = CreateEventParams & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type EventDetails = {
  guests: {}[];
  images: {}[];
  cashiers: {}[];
  products: {}[];
  sellers: {}[];
  tickets: {}[];
  wallets: {}[];
};

const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => "/user/events/",
      providesTags: ["Events"],
    }),
    getEvent: builder.query<EventDetails, string>({
      query: (eventId: string) => `/user/events/${eventId}`,
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation({
      query: (body: CreateEventParams) => {
        return {
          url: "/user/events",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Events"],
    }),
    createGuest: builder.mutation({
      query: (body: { eventId: number; contactId: number }) => {
        return {
          url: `/user/events/${body.eventId}/guests`,
          method: "POST",
          body: { contactId: body.contactId },
        };
      },
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useGetEventQuery,
  useCreateGuestMutation,
} = extendedApiSlice;
