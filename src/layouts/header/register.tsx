import { useNavigate } from "react-router-dom";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const RegisterHeader = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <HeaderNav align="flex-end">
        <HeaderNaviList>
          <HeaderNavItem onClick={() => navigate("/login")}>
            Login
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default RegisterHeader;
