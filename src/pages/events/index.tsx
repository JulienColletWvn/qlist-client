import { Link } from "react-router-dom";

import { EventsApp } from "../../layouts/app";
import { getRoute } from "../../router/routes";

const Events = () => {
  return (
    <EventsApp>
      <h1>Events</h1>
      <Link to={getRoute("eventDetails", "1")}>Event 1</Link>
    </EventsApp>
  );
};

export default Events;
