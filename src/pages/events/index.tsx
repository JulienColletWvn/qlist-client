import { Link } from "react-router-dom";

import { EventsListApp } from "../../layouts/app";
import { getRoute } from "../../router/routes";

const Events = () => {
  return (
    <EventsListApp>
      <h1>Events</h1>
      <Link to={getRoute("eventDetails", "1")}>Event 1</Link>
    </EventsListApp>
  );
};

export default Events;
