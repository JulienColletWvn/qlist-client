import { PropsWithChildren } from "react";
import styled from "styled-components";
import { AuthenticatedHeader } from "./header";

const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  padding: 0 2rem 0 2rem;
`;

const PageComponent = ({
  children,
  header,
}: PropsWithChildren<{ header: JSX.Element }>) => (
  <Page>
    <>
      {header}
      <Main>{children}</Main>
    </>
  </Page>
);

export const AuthenticatedPage = ({ children }: PropsWithChildren<{}>) => (
  <PageComponent header={<AuthenticatedHeader />}>{children}</PageComponent>
);

export default PageComponent;
