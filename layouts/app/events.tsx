import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
import Grid from "@components/grid";
import { getRoute } from "@utils/routes";

const SideBar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  grid-column: col-start / span 2;
  align-items: flex-start;
`;

const Content = styled.div`
  height: 100%;
  grid-column: col-start 3 / span 10;
  overflow: auto;
`;

export const EventsApp = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const { id } = router.query;
  const eventId = String(id);

  return (
    <AuthenticatedPage>
      <Grid>
        <SideBar>
          <Button
            label="Event"
            onClick={() => router.push(getRoute("eventDetails", eventId))}
          />
          <Button
            label="Guests"
            onClick={() => router.push(getRoute("eventGuests", eventId))}
          />
          <Button
            label="Tickets"
            onClick={() => router.push(getRoute("eventTickets", eventId))}
          />
          <Button
            label="Cashiers"
            onClick={() => router.push(getRoute("eventCashiers", eventId))}
          />
          <Button
            label="Sellers"
            onClick={() => router.push(getRoute("eventSellers", eventId))}
          />
          <Button
            label="Transactions"
            onClick={() => router.push(getRoute("eventTransactions", eventId))}
          />
          <Button
            label="Statistics"
            onClick={() => router.push(getRoute("eventStatistics", eventId))}
          />
        </SideBar>
        <Content>{children}</Content>
      </Grid>
    </AuthenticatedPage>
  );
};
