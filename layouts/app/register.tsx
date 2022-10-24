import { PropsWithChildren } from "react";
import Page from "../page";
import { RegisterHeader } from "../header";
import AuthLayout from "@layouts/onboarding/index";

export const RegisterApp = ({ children }: PropsWithChildren<{}>) => (
  <Page header={<RegisterHeader />}>
    <AuthLayout>{children}</AuthLayout>
  </Page>
);
