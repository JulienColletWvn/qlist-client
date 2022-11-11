import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header, { HeaderNav, HeaderNavItem, HeaderNaviList } from "./header";
import { LangSelector } from "../../components/langSelector";

export const RegisterHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Header>
      <HeaderNav align="flex-end">
        <HeaderNaviList>
          <HeaderNavItem onClick={() => navigate("/")}>
            {t("header.login")}
          </HeaderNavItem>
          <HeaderNavItem>
            <LangSelector />
          </HeaderNavItem>
        </HeaderNaviList>
      </HeaderNav>
    </Header>
  );
};

export default RegisterHeader;
