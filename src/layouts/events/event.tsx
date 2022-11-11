import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Event as EventType } from "../../services/event";
import { getEventContent } from "../../utils/event";
import { Lang } from "../../types";

const StyledEventCard = styled.div`
  flex: 1 1 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.05);
  }
`;
const StyledEventImage = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGrey};
  height: 150px;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const StyledEventTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const StyledEventDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.solidGrey};
  line-height: 140%;
`;

export const Event = ({
  event,
  onClick,
}: {
  event: EventType;
  onClick?(): void;
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { name, description } = getEventContent({
    event,
    lang: language as Lang,
  });

  return (
    <StyledEventCard onClick={onClick}>
      <StyledEventImage />
      <StyledEventTitle>{name}</StyledEventTitle>
      <StyledEventDescription>{description}</StyledEventDescription>
    </StyledEventCard>
  );
};
