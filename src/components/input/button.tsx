import styled from "styled-components";

const ButtonElement = styled.button`
  padding: 12px 14px;
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
`;

export const Button = ({
  label,
  onClick,
}: {
  label: string;
  onClick(): void;
}) => <ButtonElement onClick={onClick}>{label}</ButtonElement>;
