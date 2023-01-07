import styled from "styled-components";
import { NavLink as LinkR } from "react-router-dom";

export const Nav = styled.nav`
  background: ${({ scrollnav }) => (scrollnav ? "#fff" : "transparent")};
  height: 60px;
  margin-top: 0px;
  font-size: 18px;
  display: flex;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  //box-shadow: 0px 2px 10px rgba(0, 0, 0);
  justify-content: center;
  align-items: center;
  //border-bottom-style: solid;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkR)`
  color: ${({ scrollnav }) => (scrollnav ? "#000" : "#fff")};
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  margin-left: 24px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.5s ease;
  &:hover {
    color: #000;
    transform: scale(1.08);
    text-decoration: none;
  }
  @media (max-width: 680px) {
    margin-left: 0;
  }
`;

export const MenuIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    //transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: -22px;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MenuItem = styled.li`
  list-style: none;
  height: 60px;
`;

export const NavLinks = styled(LinkR)`
  color: ${({ scrollnav }) => (scrollnav ? "#000" : "#fff")};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 20px;
  background: #010606;
  white-space: nowrap;
  padding: 5px 10px;
  color: ${({ scrollnav }) => (scrollnav ? "#000" : "#fff")};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  //box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

  &:hover {
    text-decoration: none;
    background: #13c24f;
    color: #fff;
  }
`;
