import { PropsWithChildren } from "react";
import styled from "styled-components";

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-column-gap: ${({ theme }) => theme.sizes.m}px;
  height: 100%;
`;

export default function Grid({ children }: PropsWithChildren<{}>) {
  return <MainGrid>{children}</MainGrid>;
}
