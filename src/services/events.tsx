import { useQuery, useMutation } from "react-query";
import { request } from "./utils";

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

const getEvents = async () => request<Event[]>({ url: "/user/events" });

const getEvent = async (eventId: number) =>
  request<EventDetails>({ url: `/user/events/${eventId}` });

const createEvent = async (body: CreateEventParams) =>
  request({
    url: "/user/events",
    options: { method: "POST", body: JSON.stringify(body) },
  });

export const useGetEvents = () =>
  useQuery("events", getEvents, { staleTime: 10 * (60 * 1000) });
export const useGetEvent = (eventId: number) =>
  useQuery("event", () => getEvent(eventId), { staleTime: 10 * (60 * 1000) });
export const useCreateEvent = () => useMutation("events", createEvent);
