import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/_root";

import Register from "../pages/auth/register";
import Login from "../pages/auth/login";

import User from "../pages/user";
import Preferences from "../pages/user/preferences";

import Events from "../pages/events";
import CreateEvent from "../pages/events/create";

import EventsDetails from "../pages/events/[id]/details";
import EventsGuests from "../pages/events/[id]/guests";
import EventsTickets from "../pages/events/[id]/tickets";
import EventsCashiers from "../pages/events/[id]/cashiers";
import EventsSellers from "../pages/events/[id]/sellers";
import EventsTransactions from "../pages/events/[id]/transactions";
import EventsStatistics from "../pages/events/[id]/statistics";

import Contacts from "../pages/contacts";
import AddContact from "../pages/contacts/add";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Error</h1>,
    children: [
      { path: "register", element: <Register /> },
      {
        path: "events/:id/details",
        element: <EventsDetails />,
      },
      {
        path: "events/:id/guests",
        element: <EventsGuests />,
      },
      {
        path: "events/:id/tickets",
        element: <EventsTickets />,
      },
      {
        path: "events/:id/cashiers",
        element: <EventsCashiers />,
      },
      {
        path: "events/:id/sellers",
        element: <EventsSellers />,
      },
      {
        path: "events/:id/transactions",
        element: <EventsTransactions />,
      },
      {
        path: "events/:id/statistics",
        element: <EventsStatistics />,
      },
      {
        path: "user/preferences",
        element: <Preferences />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "events/create",
        element: <CreateEvent />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "contacts/add",
        element: <AddContact />,
      },
      { path: "", element: <Login /> },
    ],
  },
]);
