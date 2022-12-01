import { PropsWithChildren } from "react";
import Page from "../page";
import { RegisterHeader } from "../header";
import AuthLayout from "../onboarding/index";

export const RegisterApp = ({ children }: PropsWithChildren<{}>) => (
  <Page>
    <AuthLayout header={<RegisterHeader />}>{children}</AuthLayout>
  </Page>
);
