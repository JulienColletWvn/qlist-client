import { Select } from "./input";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 0;
`;

export const LangSelector = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  return (
    <StyledSelect
      defaultValue={language}
      options={[
        { value: "fr", label: "FR" },
        { value: "en", label: "EN" },
        { value: "nl", label: "NL" },
      ]}
      onChange={(nextValue) => changeLanguage(nextValue)}
    />
  );
};
