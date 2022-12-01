import { Input, InputProps } from "antd";
import { TextAreaProps } from "antd/es/input";
import styled from "styled-components";
import { Label } from "./label";
import { Error } from "./error";

export const TextInputIconContainer = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: 0.2s;
`;

const StyledContainer = styled.div`
  margin-bottom: 0.75rem;
`;

export const StyledInput = styled(Input)`
  border-radius: 4px;
`;

export const StyledTextArea = styled(Input.TextArea)`
  border-radius: 4px;
`;

export const TextInput = (
  props: InputProps & {
    label?: string;
    errors?: string[];
    showErrors?: boolean;
  }
) => (
  <StyledContainer>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <StyledInput {...props} />
    {props.errors &&
      props.showErrors &&
      props.errors.map((error, i, a) => (
        <Error>{`${error}${i < a.length - 1 ? ", " : ""}`}</Error>
      ))}
  </StyledContainer>
);

export const TextArea = (
  props: TextAreaProps & {
    label?: string;
    errors?: string[];
    showErrors?: boolean;
  }
) => (
  <>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <StyledTextArea {...props} />
    {props.errors &&
      props.showErrors &&
      props.errors.map((error, i, a) => (
        <Error>{`${error}${i < a.length - 1 ? ", " : ""}`}</Error>
      ))}
  </>
);
