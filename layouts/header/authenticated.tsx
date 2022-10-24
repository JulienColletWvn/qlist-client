import { useRouter } from "next/router";
import { getRoute } from "@utils/routes";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const AuthenticatedHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <HeaderNav>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => router.push(getRoute("events"))}>
            Events
          </HeaderNavItem>
          <HeaderNavItem onClick={() => router.push(getRoute("guests"))}>
            Guests
          </HeaderNavItem>
        </HeaderNaviList>
        <HeaderNaviList>
          <HeaderNavItem onClick={() => router.push(getRoute("user"))}>
            Profile
          </HeaderNavItem>
          <HeaderNavItem>Logout</HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default AuthenticatedHeader;
