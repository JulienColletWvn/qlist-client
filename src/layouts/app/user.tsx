import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
import { Layout, Sider, Content } from "../../components/layout";

export const UserApp = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthenticatedPage>
      <Layout>
        <Sider>
          <Button label="Profile" onClick={() => null} />
          <Button label="Preferences" onClick={() => null} />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
