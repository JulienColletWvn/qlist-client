import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Sider, Content } from "../../components/layout";
import { AuthenticatedPage } from "../page";
import { SideBar } from "../../components/sidebar";
import { PageLoader } from "../../components/loader";

const StyledSider = styled(Sider)`
  padding-top: 0.5rem;
`;

export const EventsListApp = ({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading?: boolean }>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <AuthenticatedPage>
      <Layout>
        <StyledSider>
          <SideBar
            links={[
              {
                label: t("events.sidebar.create"),
                link: `/events/create`,
                icon: "fa-solid fa-calendar-plus",
              },
              {
                label: t("events.sidebar.events"),
                link: `/events`,
                icon: "fa-regular fa-calendar",
              },
            ]}
          />
        </StyledSider>
        <Content>{children}</Content>
      </Layout>
      {isLoading && <PageLoader isLoading={!!isLoading} />}
    </AuthenticatedPage>
  );
};
