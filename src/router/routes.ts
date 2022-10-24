export const routes = {
  register: "register",
  login: "login",
  user: "/user",
  events: "/events",
  guests: "/guests",
  eventDetails: "/events/:id/details",
  eventGuests: "/events/:id/guests",
  eventTickets: "/events/:id/tickets",
  eventCashiers: "/events/:id/cashiers",
  eventSellers: "/events/:id/sellers",
  eventTransactions: "/events/:id/transactions",
  eventStatistics: "/events/:id/statistics",
};

export type Route = keyof typeof routes;

export function getRoute(pageKey: keyof typeof routes, id?: number | string) {
  if (id) {
    return routes[pageKey].replace(/:id/, String(id));
  }
  return routes[pageKey];
}
