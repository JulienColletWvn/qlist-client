import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Row, Col } from "../../layouts";

const ImageContent = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  height: 100%;
  grid-column: col-start / span 7;
`;

const Content = styled(Row)`
  height: 100%;
`;

const Image = styled.img`
  position: absolute;
  right: 0;
  top: -10%;
  max-height: 110%;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;

const AuthLayout = ({ children }: PropsWithChildren<{}>) => (
  <Content>
    <Col span={14}>
      <ImageContent>
        <Image src="/img/onboarding.svg" />
      </ImageContent>
    </Col>
    <Col span={6}>
      <FormContainer>{children}</FormContainer>
    </Col>
  </Content>
);
export default AuthLayout;
