import { PropsWithChildren } from "react";
import styled from "styled-components";
import { AuthenticatedHeader } from "./header";
import Authenticated from "../components/authenticated";
import { Layout } from "../components/layout";

const PageComponent = ({
  children,
  header,
}: PropsWithChildren<{ header: JSX.Element }>) => (
  <>
    {header}
    {children}
  </>
);

export const AuthenticatedPage = ({ children }: PropsWithChildren<{}>) => (
  <Authenticated>
    <PageComponent header={<AuthenticatedHeader />}>{children}</PageComponent>
  </Authenticated>
);

export default PageComponent;
