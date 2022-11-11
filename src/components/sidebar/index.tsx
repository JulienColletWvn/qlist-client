import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";

type SideBarProps = {
  links: {
    label: string;
    icon: string;
    link: string;
  }[];
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled.li<{ selected: boolean }>`
  font-size: 14px;
  color: #2e2e2e;
  padding-right: 1.25rem;
  padding-left: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  border-radius: 8px;

  span {
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }

  transition: 0.2s;

  i {
    text-align: center;
    width: 1.5rem;
    margin-right: 0.35rem;
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }

  cursor: pointer;

  ${({ selected }) =>
    selected
      ? `
        background-color: #4992ff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        span, i {
            color: white;
        }
  `
      : ""}
`;

export const SideBar = ({ links }: SideBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <StyledList>
      {links.map(({ label, link, icon }) => (
        <StyledLink
          key={label}
          selected={link.replace(":id", id ?? "") === pathname}
          onClick={() => navigate(link)}
        >
          <i className={icon} />
          <span>{label}</span>
        </StyledLink>
      ))}
    </StyledList>
  );
};
