import { redirect } from "react-router-dom";
import { getRoute } from "../../router/routes";

import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const AuthenticatedHeader = () => {
  return (
    <Header>
      <HeaderNav>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => redirect(getRoute("events"))}>
            Events
          </HeaderNavItem>
          <HeaderNavItem onClick={() => redirect(getRoute("guests"))}>
            Guests
          </HeaderNavItem>
        </HeaderNaviList>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => redirect(getRoute("user"))}>
            Profile
          </HeaderNavItem>
          <HeaderNavItem>Logout</HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default AuthenticatedHeader;
