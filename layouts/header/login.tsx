import { useRouter } from "next/router";
import { getRoute } from "@utils/routes";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const LoginHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <HeaderNav align="flex-end">
        <HeaderNaviList>
          <HeaderNavItem onClick={() => router.push(getRoute("register"))}>
            Register
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default LoginHeader;
