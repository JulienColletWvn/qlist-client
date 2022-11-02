import { PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";
import { CheckCircle, DangerCircle } from "../../components/icons";

const slide = keyframes`
    0% { transform: translateY(-20px); opacity: 0; }
    100% { transform: translateY(0px); opacity: 1; }
`;

const StyledToastContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 2rem;
  z-index: 1;
`;

const StyledToast = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: white;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  animation-name: ${slide};
  animation-duration: 0.25s;
`;

const StyledTitle = styled.span`
  font-size: 14px;
  color: #2e2e2e;
  margin-left: 6px;
`;

export type ToastProps = {
  id: string;
  title?: string;
  type: "success" | "danger";
  timeOut?: number;
};

export const ToastContainer = ({ children }: PropsWithChildren<{}>) => (
  <StyledToastContainer>{children}</StyledToastContainer>
);

export const Toast = ({ title, type }: ToastProps) => {
  return (
    <StyledToast>
      {type === "danger" && <DangerCircle height={16} width={16} />}
      {type === "success" && <CheckCircle height={16} width={16} />}
      <StyledTitle>{title}</StyledTitle>
    </StyledToast>
  );
};
