import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  display: inline-block;
  font-weight: 800;
  margin: 0;
`;

const Block = styled.div`
  display: inline-block;
  margin-left: 3px;
  margin-bottom: -1px;
  height: 6px;
  width: 6px;
  background-color: ${({ theme }) => theme.accent};
`;

export default function HeadingComponent({ children }: PropsWithChildren<{}>) {
  return (
    <Container>
      <Heading>{children}</Heading>
      <Block />
    </Container>
  );
}
