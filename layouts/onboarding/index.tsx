import { PropsWithChildren } from "react";
import styled from "styled-components";

import Grid from "../../components/grid";

const ImageContent = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  height: 100%;
  grid-column: col-start / span 7;
`;

const Content = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  height: 100%;
  grid-column: col-start 8 / span 3;
`;

const Image = styled.img`
  position: absolute;
  right: 0;
  top: -10%;
  max-height: 110%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  width: 100%;
`;

const AuthLayout = ({ children }: PropsWithChildren<{}>) => (
  <Grid>
    <ImageContent>
      <Image src="/img/onboarding.svg" />
    </ImageContent>
    <Content>
      <FormContainer>{children}</FormContainer>
    </Content>
  </Grid>
);
export default AuthLayout;
