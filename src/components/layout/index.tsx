import { Layout as BaseLayout } from "antd";
import styled from "styled-components";

export { Col, Row } from "antd";

export const Layout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  overflow: auto;
`;

export const Sider = styled.aside`
  width: 250px;
  flex: 0 0 250px;
  margin-right: 2rem;
  padding-left: 1.5rem;
`;

export const Content = styled(BaseLayout.Content)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 3.5rem;
  padding-right: 3.5rem;
`;

export const Header = styled(BaseLayout.Header)``;
export const Footer = styled(BaseLayout.Footer)``;
