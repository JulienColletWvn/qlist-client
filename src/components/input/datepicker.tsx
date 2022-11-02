import { DatePicker, DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Label } from "./label";

export const RangePicker = (props: { label?: string } & RangePickerProps) => (
  <>
    {props.label && props.id && <Label name={props.id} label={props.label} />}
    <DatePicker.RangePicker {...props} />
  </>
);
