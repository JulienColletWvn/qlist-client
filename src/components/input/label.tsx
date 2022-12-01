import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

export const Label = ({ name, label }: { name: string; label: string }) => (
  <StyledLabel htmlFor={name}>{label}</StyledLabel>
);
