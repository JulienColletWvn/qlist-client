import { Input, InputProps } from "antd";
import styled from "styled-components";

export const StyledInput = styled(Input)`
  margin-bottom: 0.75rem;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-family: "Inter", sans-serif;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.solidGrey};
  margin-bottom: 0.25rem;
`;

export const TextInput = (props: InputProps & { label?: string }) => (
  <>
    {props.label && <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>}
    <StyledInput {...props} />
  </>
);
