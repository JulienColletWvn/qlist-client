import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../services/auth";

import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const AuthenticatedHeader = () => {
  const [trigger, { isSuccess }] = useLazyLogoutQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess]);

  return (
    <Header>
      <HeaderNav>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => navigate("/events")}>
            Events
          </HeaderNavItem>
        </HeaderNaviList>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => navigate("/user")}>
            Profile
          </HeaderNavItem>
          <HeaderNavItem onClick={() => trigger()}>Logout</HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default AuthenticatedHeader;
