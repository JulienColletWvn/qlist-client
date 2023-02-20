import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { LangSelector } from "../../components/langSelector";

import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";
import { useLogout } from "../../services";

export const AuthenticatedHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { mutate, isSuccess } = useLogout();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  return (
    <Header>
      <HeaderNav>
        <HeaderNaviList>
          <HeaderNavItem
            onClick={() => navigate("/events")}
            active={/\/events/.test(pathname)}
          >
            {t("header.events")}
          </HeaderNavItem>
          <HeaderNavItem
            onClick={() => navigate("/contacts")}
            active={/\/contacts/.test(pathname)}
          >
            {t("header.contacts")}
          </HeaderNavItem>
        </HeaderNaviList>
        <HeaderNaviList>
          <HeaderNavItem
            onClick={() => navigate("/user")}
            active={/\/user/.test(pathname)}
          >
            {t("header.profile")}
          </HeaderNavItem>
          <HeaderNavItem onClick={() => mutate()}>
            {t("header.logout")}
          </HeaderNavItem>
          <HeaderNavItem>
            <LangSelector />
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default AuthenticatedHeader;
