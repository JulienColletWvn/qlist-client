import { PropsWithChildren } from "react";
import { AuthenticatedHeader } from "./header";
import Authenticated from "../components/authenticated";

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
