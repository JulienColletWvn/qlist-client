import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "../../components/input";
import Page from "../page";
import { RegisterHeader } from "../header";
import Grid from "../../components/grid";

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

export const UserApp = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  return (
    <Page header={<RegisterHeader />}>
      <Grid>
        <SideBar>
          <Button label="Profile" onClick={() => null} />
          <Button label="Preferences" onClick={() => null} />
        </SideBar>
        <Content>{children}</Content>
      </Grid>
    </Page>
  );
};
