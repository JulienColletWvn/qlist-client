import { PropsWithChildren } from "react";
import styled from "styled-components";
import styles from "../../styles/vars";

import { DynamicAccentLogo } from "../../components/logo";

const Header = styled.header`
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 2rem;
  padding-left: 2.5rem;
  padding-right: 2rem;
  width: 100%;
`;

export const HeaderNav = styled.nav<{ align?: string }>`
  display: flex;
  justify-content: ${({ align }) => align ?? "space-between"};
  width: 100%;
  padding: 0 2% 0 2%;
`;

export const HeaderNaviList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
`;

export const HeaderNavItem = styled.li`
  margin-left: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const HeaderComponent = ({ children }: PropsWithChildren<{}>) => (
  <Header>
    <DynamicAccentLogo accent={styles.accent} />
    {children}
  </Header>
);

export default HeaderComponent;
