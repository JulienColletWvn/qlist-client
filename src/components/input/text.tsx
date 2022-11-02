import { Input, InputProps } from "antd";
import { TextAreaProps } from "antd/es/input";
import styled from "styled-components";
import { Label } from "./label";

const StyledContainer = styled.div`
  margin-bottom: 0.75rem;
`;

export const StyledInput = styled(Input)`
  border-radius: 4px;
`;

export const StyledError = styled.span`
  font-size: 0.75rem;
  color: red;
`;

export const StyledTextArea = styled(Input.TextArea)`
  margin-bottom: 0.75rem;
  border-radius: 4px;
`;

export const TextInput = (
  props: InputProps & { label?: string; errors?: string[] }
) => (
  <StyledContainer>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <StyledInput {...props} />
    {props.errors &&
      props.errors.map((error, i, a) => (
        <StyledError>{`${error}${i < a.length - 1 ? ", " : ""}`}</StyledError>
      ))}
  </StyledContainer>
);

export const TextArea = (props: TextAreaProps & { label?: string }) => (
  <>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <StyledTextArea {...props} />
  </>
);
