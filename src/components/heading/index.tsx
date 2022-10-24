import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  margin-bottom: ${({ theme }) => theme.sizes.l}px;
`;

const Heading = styled.h1`
  font-family: "Bitter", serif;
  margin: 0;
  z-index: 1;
`;

const Underline = styled.div`
  height: 8px;
  width: 100%;
  margin-top: -12px;
  background-color: ${({ theme }) => theme.accent};
`;

export default function HeadingComponent({ children }: PropsWithChildren<{}>) {
  return (
    <Container>
      <span>
        <Heading>{children}</Heading>
        <Underline />
      </span>
    </Container>
  );
}
