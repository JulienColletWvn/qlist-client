import styled from "styled-components";

const StyledTipContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 4px;
  padding: 1rem;
`;
const StyledTipIcon = styled.i`
  color: ${({ theme }) => theme.accent};
  margin-right: 0.75rem;
`;
const StyledTipContentTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.accent};
`;
const StyledTipContentDescription = styled.p`
  font-size: 13px;
  line-height: 140%;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 0;
`;

export const Tip = ({
  type,
  title,
  description,
}: {
  type: "info";
  title?: string;
  description?: string;
}) => (
  <StyledTipContainer>
    <StyledTipIcon className="fa-solid fa-circle-info" />
    <div>
      {title && <StyledTipContentTitle>{title}</StyledTipContentTitle>}
      {description && (
        <StyledTipContentDescription>{description}</StyledTipContentDescription>
      )}
    </div>
  </StyledTipContainer>
);
