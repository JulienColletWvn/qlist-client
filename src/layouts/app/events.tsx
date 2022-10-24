import { PropsWithChildren } from "react";
import { redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
import Grid from "../../components/grid";
import { getRoute } from "../../router/routes";

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
  const { id } = useParams();
  const eventId = String(id);

  return (
    <AuthenticatedPage>
      <Grid>
        <SideBar>
          <Button
            label="Event"
            onClick={() => redirect(getRoute("eventDetails", eventId))}
          />
          <Button
            label="Guests"
            onClick={() => redirect(getRoute("eventGuests", eventId))}
          />
          <Button
            label="Tickets"
            onClick={() => redirect(getRoute("eventTickets", eventId))}
          />
          <Button
            label="Cashiers"
            onClick={() => redirect(getRoute("eventCashiers", eventId))}
          />
          <Button
            label="Sellers"
            onClick={() => redirect(getRoute("eventSellers", eventId))}
          />
          <Button
            label="Transactions"
            onClick={() => redirect(getRoute("eventTransactions", eventId))}
          />
          <Button
            label="Statistics"
            onClick={() => redirect(getRoute("eventStatistics", eventId))}
          />
        </SideBar>
        <Content>{children}</Content>
      </Grid>
    </AuthenticatedPage>
  );
};
