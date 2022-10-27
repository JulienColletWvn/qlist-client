import { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Sider, Content } from "../../components/layout";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";

export const EventsListApp = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <AuthenticatedPage>
      <Layout>
        <Sider>
          <Button label="Mes événements" onClick={() => navigate("/events")} />
          <Button
            label="Créer un événement"
            onClick={() => navigate("/events/create")}
          />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
