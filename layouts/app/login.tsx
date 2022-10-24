import { PropsWithChildren } from "react";
import Page from "../page";
import { LoginHeader } from "../header";
import AuthLayout from "@layouts/onboarding/index";

export const LoginApp = ({ children }: PropsWithChildren<{}>) => (
  <Page header={<LoginHeader />}>
    <AuthLayout>{children}</AuthLayout>
  </Page>
);
