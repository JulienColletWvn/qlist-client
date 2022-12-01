import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 2rem;
`;

const H1 = styled.h1`
  display: inline-block;
  font-weight: 600;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.fontGrey};
  margin: 0;
`;

const H2 = styled.h2`
  display: inline-block;
  font-weight: 800;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.fontGrey};
  margin: 0;
`;

const H3 = styled.h3`
  display: inline-block;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.fontGrey};
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

export default function HeadingComponent({
  children,
  level = 1,
}: PropsWithChildren<{ level?: 1 | 2 | 3 }>) {
  if (level === 3) return <H3>{children}</H3>;
  return (
    <Container>
      <H1>{children}</H1>
      <Block />
    </Container>
  );
}
