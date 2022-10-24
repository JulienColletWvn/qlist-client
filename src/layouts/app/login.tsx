import { PropsWithChildren } from "react";
import Page from "../page";
import { LoginHeader } from "../header";
import AuthLayout from "../onboarding/index";

export const LoginApp = ({ children }: PropsWithChildren<{}>) => (
  <Page header={<LoginHeader />}>
    <AuthLayout>{children}</AuthLayout>
  </Page>
);
