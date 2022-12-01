import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Layout, Sider, Content } from "../../components/layout";
import { AuthenticatedPage } from "../page";
import { SideBar } from "../../components/sidebar";
import { PageLoader } from "../../components/loader";

const StyledSider = styled(Sider)`
  padding-top: 0.5rem;
`;

export const ContactsApp = ({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading?: boolean }>) => {
  const { t } = useTranslation();

  return (
    <AuthenticatedPage>
      <Layout>
        <StyledSider>
          <SideBar
            links={[
              {
                label: t("contacts.sidebar.add"),
                link: `/contacts/add`,
                icon: "fa-solid fa-user-plus",
              },
              {
                label: t("contacts.sidebar.contacts"),
                link: `/contacts`,
                icon: "fa-regular fa-user-group",
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
