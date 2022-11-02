import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Label = ({ name, label }: { name: string; label: string }) => (
  <StyledLabel htmlFor={name}>{label}</StyledLabel>
);
