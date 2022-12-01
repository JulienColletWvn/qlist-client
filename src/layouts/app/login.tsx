import { PropsWithChildren } from "react";
import Page from "../page";
import { LoginHeader } from "../header";
import AuthLayout from "../onboarding/index";
import { PageLoader } from "../../components/loader";

export const LoginApp = ({
  children,
  isLoading,
}: PropsWithChildren<{ isLoading?: boolean }>) => (
  <Page>
    <AuthLayout header={<LoginHeader />}>{children}</AuthLayout>
    {isLoading && <PageLoader isLoading />}
  </Page>
);
