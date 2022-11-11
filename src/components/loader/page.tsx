import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% { 
    -webkit-transform: rotate(0deg) scale(0.8); 
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% { 
    -webkit-transform: rotate(360deg) scale(1.2); 
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% { 
    -webkit-transform: rotate(720deg) scale(0.8); 
    -moz-transform: rotate(720deg) scale(0.8);
  }
`;

const ball1 = keyframes`
0% {
    box-shadow: 30px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
`;

const ball2 = keyframes`
0% {
    box-shadow: 30px 0 0 #97bf0d;
  }
  50% {
    box-shadow: 0 0 0 #97bf0d;
    margin-top: -20px;
    -webkit-transform: translate(15px,15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #97bf0d;
    margin-top: 0;
  }

`;

const StyledLoaderContainer = styled.div<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const StyledLoader = styled.div`
  animation: ${rotate} 1s infinite;
  height: 50px;
  width: 50px;

  &:before,
  :after {
    border-radius: 50%;
    content: "";
    display: block;
    height: 20px;
    width: 20px;
  }

  &:before {
    animation: ${ball1} 1s infinite;
    background-color: #cb2025;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }

  &:after {
    animation: ${ball2} 1s infinite;
    background-color: #00a096;
    box-shadow: 30px 0 0 #97bf0d;
  }
`;

export const PageLoader = ({ isLoading }: { isLoading: boolean }) => (
  <StyledLoaderContainer isLoading={isLoading}>
    <StyledLoader />
  </StyledLoaderContainer>
);
