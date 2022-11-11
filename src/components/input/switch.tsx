import styled from "styled-components";
import { Switch as BaseSwitch, SwitchProps } from "antd";
import { Label } from "./label";

const StyledSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledSwitch = styled(BaseSwitch)`
  margin-right: 1rem;
`;

export const Switch = (props: SwitchProps & { label: string }) => (
  <StyledSwitchContainer>
    <StyledSwitch {...props} />
    {props.label && <Label label={props.label} name={props.id ?? ""} />}
  </StyledSwitchContainer>
);
