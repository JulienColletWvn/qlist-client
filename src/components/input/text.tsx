import styled from "styled-components";

const Input = styled.input`
  font-family: "Inter", sans-serif;
  font-weigth: 300;
  color: ${({ theme }) => theme.colors.solidGrey};
  margin-bottom: ${({ theme }) => theme.sizes.m}px;
  padding: ${({ theme }) => theme.sizes.s}px;
  font-size: 16px;
  width: 100%;
`;
const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.sizes.s}px;
`;

export const TextInput = ({
  name,
  value,
  setValue,
}: {
  name: string;
  value: string;
  setValue(nextValue: string): void;
}) => (
  <>
    <Label htmlFor={name}>{name}</Label>
    <Input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  </>
);
