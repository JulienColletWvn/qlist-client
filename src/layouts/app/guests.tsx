import { PropsWithChildren } from "react";
import { redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
import { Layout, Sider, Content } from "../../components/layout";

export const GuestsApp = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthenticatedPage>
      <Layout>
        <Sider>
          <Button label="Guests" onClick={() => null} />
          <Button label="Groups" onClick={() => null} />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </AuthenticatedPage>
  );
};
