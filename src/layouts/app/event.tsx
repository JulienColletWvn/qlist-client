import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Layout, Sider, Content } from "../../components/layout";
import { AuthenticatedPage } from "../page";
import { SideBar } from "../../components/sidebar";

const StyledSider = styled(Sider)`
  padding-top: 0.5rem;
`;

export const EventApp = ({ children }: PropsWithChildren<{}>) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <AuthenticatedPage>
      <Layout>
        <StyledSider>
          <SideBar
            links={[
              {
                label: t("event.sidebar.event"),
                link: `/events/${id}/details`,
                icon: "fa-regular fa-calendar",
              },
              {
                label: t("event.sidebar.guests"),
                link: `/events/${id}/guests`,
                icon: "fa-solid fa-users",
              },
              {
                label: t("event.sidebar.tickets"),
                link: `/events/${id}/tickets`,
                icon: "fa-solid fa-ticket-simple",
              },
              {
                label: t("event.sidebar.cashiers"),
                link: `/events/${id}/cashiers`,
                icon: "fa-solid fa-receipt",
              },
              {
                label: t("event.sidebar.sellers"),
                link: `/events/${id}/sellers`,
                icon: "fa-solid fa-shop",
              },
              {
                label: t("event.sidebar.transactions"),
                link: `/events/${id}/transactions`,
                icon: "fa-solid fa-right-left",
              },
              {
                label: t("event.sidebar.statistics"),
                link: `/events/${id}/statistics`,
                icon: "fa-solid fa-chart-line",
              },
            ]}
          />
        </StyledSider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
