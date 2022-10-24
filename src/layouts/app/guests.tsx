import { PropsWithChildren } from "react";
import { redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/input";
import { AuthenticatedPage } from "../page";
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

export const GuestsApp = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthenticatedPage>
      <Grid>
        <SideBar>
          <Button label="Guests" onClick={() => null} />
          <Button label="Groups" onClick={() => null} />
        </SideBar>
        <Content>{children}</Content>
      </Grid>
    </AuthenticatedPage>
  );
};
