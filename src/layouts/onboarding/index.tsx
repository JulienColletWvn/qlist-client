import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Row, Col } from "../../layouts";
import { DynamicAccentLogo } from "../../components/logo";

const StyledCol = styled(Col)`
  flex-direction: column;
  flex: 1;
  display: flex;
  padding: 2rem;
  &:nth-of-type(2) {
    padding-left: 0;
  }
`;

const HeaderContainer = styled.div`
  padding: 2rem;
`;

const StyledRow = styled(Row)`
  flex: 1;
`;

const ImageContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-image: url("/img/onboarding.svg");
  background-size: cover;
  border-radius: 1rem;
`;

const Content = styled(Row)`
  flex: 1 1 auto;
`;

const Image = styled.img`
  position: absolute;
  right: 0;
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

const AuthLayout = ({
  children,
  header,
}: PropsWithChildren<{ header: JSX.Element }>) => (
  <Content>
    <StyledCol span={12}>
      <ImageContent>
        <DynamicAccentLogo />
      </ImageContent>
    </StyledCol>
    <StyledCol>
      <HeaderContainer>{header}</HeaderContainer>
      <StyledRow>
        <Col span={16} offset={4}>
          <FormContainer>{children}</FormContainer>
        </Col>
      </StyledRow>
    </StyledCol>
  </Content>
);
export default AuthLayout;
