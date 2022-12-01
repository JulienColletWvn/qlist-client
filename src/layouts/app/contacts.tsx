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
        <Content>{children}</Content>
      </Layout>
      {isLoading && <PageLoader isLoading={!!isLoading} />}
    </AuthenticatedPage>
  );
};
