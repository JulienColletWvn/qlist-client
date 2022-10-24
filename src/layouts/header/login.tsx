import { useNavigate } from "react-router-dom";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const LoginHeader = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <HeaderNav align="flex-end">
        <HeaderNaviList>
          <HeaderNavItem onClick={() => navigate("/register")}>
            Register
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default LoginHeader;
