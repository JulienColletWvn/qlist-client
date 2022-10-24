import Link from "next/link";
import { EventsApp } from "@layouts/app";
import { getRoute } from "@utils/routes";

const Events = () => {
  return (
    <EventsApp>
      <h1>Events</h1>
      <Link href={getRoute("eventDetails", "1")}>Event 1</Link>
    </EventsApp>
  );
};

export default Events;
