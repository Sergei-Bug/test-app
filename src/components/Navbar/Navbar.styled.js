import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  gap: 16px;
  padding: 16px 10px;
  width: 800px;
  border-bottom: 2px solid #a8a8a8;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderMenu = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const StyledLink = styled(NavLink)`
  color: black;
  font-weight: 600;
  text-decoration: none;
  transition: color 500ms cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    color: rgb(57, 176, 255);
  }
`;
