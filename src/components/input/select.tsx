import { Select as BaseSelect, SelectProps } from "antd";

import styled from "styled-components";

const StyledSelect = styled(BaseSelect)`
  margin-bottom: 0.75rem;
  border-radius: 4px;
` as (props: SelectProps) => JSX.Element;
const StyledOption = styled(BaseSelect.Option)``;

export const Select = ({
  options,
  ...props
}: {
  options: { value: string; label: string }[];
} & SelectProps) => (
  <StyledSelect {...props}>
    {options.map(({ value, label }) => (
      <StyledOption value={value}>{label}</StyledOption>
    ))}
  </StyledSelect>
);
