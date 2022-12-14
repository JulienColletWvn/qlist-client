import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
import { Layout, Sider, Content } from "../../components/layout";
import { SideBar } from "../../components/sidebar";

const StyledSider = styled(Sider)`
  padding-top: 0.5rem;
`;

export const UserApp = ({ children }: PropsWithChildren<{}>) => {
  const { t } = useTranslation();
  return (
    <AuthenticatedPage>
      <Layout>
        <StyledSider>
          <SideBar
            links={[
              {
                label: t("user.sidebar.profile"),
                link: `/user`,
                icon: "fa-solid fa-calendar-plus",
              },
              {
                label: t("user.sidebar.preferences"),
                link: `/user/preferences`,
                icon: "fa-regular fa-calendar",
              },
            ]}
          />
        </StyledSider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
