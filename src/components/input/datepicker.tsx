import { DatePicker } from "antd";
import styled from "styled-components";
import { RangePickerProps } from "antd/es/date-picker";
import { Label } from "./label";
import { Error } from "./error";

const StyledContainer = styled.div`
  margin-bottom: 12px;
`;

const StyledRangerPicker = styled(DatePicker.RangePicker)`
  width: 100%;
`;

export const RangePicker = (
  props: { label?: string; errors?: string[] } & RangePickerProps
) => (
  <StyledContainer>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <StyledRangerPicker {...props} />
    {props.errors &&
      props.errors.map((error, i, a) => (
        <Error>{`${error}${i < a.length - 1 ? ", " : ""}`}</Error>
      ))}
  </StyledContainer>
);
