import { Layout as BaseLayout } from "antd";
import styled from "styled-components";

export { Col, Row } from "antd";
export const Layout = styled(BaseLayout)`
  flex: 1;
  margin-left: 2rem;
  margin-right: 2rem;
`;
export const Sider = styled(BaseLayout.Sider)`
  margin-right: 2rem;
`;
export const Content = styled(BaseLayout.Content)`
  overflow: auto;
`;
export const Header = styled(BaseLayout.Header)``;
export const Footer = styled(BaseLayout.Footer)``;
