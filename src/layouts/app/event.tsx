import { PropsWithChildren } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/input";
import { Layout, Sider, Content } from "../../components/layout";
import { AuthenticatedPage } from "../page";

export const EventApp = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const eventId = String(id);

  return (
    <AuthenticatedPage>
      <Layout>
        <Sider>
          <Button
            label="Event"
            onClick={() => navigate(`/events/${id}/details`)}
          />
          <Button
            label="Guests"
            onClick={() => navigate(`/events/${id}/guests`)}
          />
          <Button
            label="Tickets"
            onClick={() => navigate(`/events/${id}/tickets`)}
          />
          <Button
            label="Cashiers"
            onClick={() => navigate(`/events/${id}/cashiers`)}
          />
          <Button
            label="Sellers"
            onClick={() => navigate(`/events/${id}/sellers`)}
          />
          <Button
            label="Transactions"
            onClick={() => navigate(`/events/${id}/transactions`)}
          />
          <Button
            label="Statistics"
            onClick={() => navigate(`/events/${id}/statistics`)}
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
