import { PropsWithChildren } from "react";
import styled from "styled-components";
import styles from "../../styles/vars";

import { DynamicAccentLogo } from "../../components/logo";

const Header = styled.header`
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 3rem 3rem 1.5rem 3rem;
  width: 100%;
`;

export const HeaderNav = styled.nav<{ align?: string }>`
  display: flex;
  justify-content: ${({ align }) => align ?? "space-between"};
  width: 100%;
`;

export const HeaderNaviList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
`;

export const HeaderNavItem = styled.li<{ active?: boolean }>`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.solidGrey};
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  ${({ active, theme }) => (active ? `color: ${theme.accent};` : "")}

  &:last-child {
    margin-right: 0;
  }
`;

const HeaderComponent = ({ children }: PropsWithChildren<{}>) => (
  <Header>
    <DynamicAccentLogo accent={styles.accent} />
    {children}
  </Header>
);

export default HeaderComponent;
