import { useRouter } from "next/router";
import { getRoute } from "@utils/routes";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";

export const RegisterHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <HeaderNav align="flex-end">
        <HeaderNaviList>
          <HeaderNavItem onClick={() => router.push(getRoute("login"))}>
            Login
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default RegisterHeader;
