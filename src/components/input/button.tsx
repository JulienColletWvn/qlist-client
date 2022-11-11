import styled from "styled-components";

type ButtonStyle = "outline";

const ButtonElement = styled.button<{
  style?: ButtonStyle;
  disabled?: boolean;
}>`
  height: 2.5rem;
  padding: 0 2rem 0 2rem;
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 0.25rem;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  margin: 0;
  &:not(:last-of-type) {
    margin-right: 0.75rem;
  }

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  transition: 0.2s;

  ${({ style, theme }) => {
    switch (style) {
      case "outline":
        return `
          border: 1px solid ${theme.colors.green};
          background-color: transparent;
          color: ${theme.colors.green};
        `;
    }
    return "";
  }}

  ${({ disabled }) =>
    disabled
      ? `
  opacity: .3;
  cursor: initial;
  &:hover {
    opacity: .3;
  }
  `
      : ""}
`;

export const Button = ({
  label,
  onClick,
  style,
  disabled,
}: {
  label: string;
  onClick(): void;
  style?: ButtonStyle;
  disabled?: boolean;
}) => (
  <ButtonElement onClick={onClick} style={style} disabled={disabled}>
    {label}
  </ButtonElement>
);
