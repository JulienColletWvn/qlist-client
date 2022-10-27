import styled from "styled-components";

const ButtonElement = styled.button`
  height: 2.5rem;
  padding: 0 2rem 0 2rem;
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 0.25rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  margin: 0;
  margin-top: 1rem;
`;

export const Button = ({
  label,
  onClick,
}: {
  label: string;
  onClick(): void;
}) => <ButtonElement onClick={onClick}>{label}</ButtonElement>;
