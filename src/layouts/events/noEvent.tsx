import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/input/button";

const StyledTitle = styled.h4`
  margin-bottom: 1.5rem;
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 50%;
  max-width: 350px;
`;

export const NoEvent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <StyledImageContainer>
      <StyledImage src="/img/notFound.png" />
      <StyledTitle>{t("events.list.noEvent.title")}</StyledTitle>
      <Button
        onClick={() => navigate("/events/create")}
        label={t("events.sidebar.create")}
      />
    </StyledImageContainer>
  );
};
