import styled  from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';

export const SideBarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #0d0d0d;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%':'0')};
    top: ${({ isOpen })=> (isOpen ? '0' : '-100%')};

`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SideBarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 70px);
    text-align: center;

    /* @media screen and (max-width: 480px){
        grid-template-rows: repeat(6, 80px);
    } */
`;

export const SideBarWrapper = styled.div`
    color: #fff;
`;

export const SideBarLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: #fff;
    cursor: pointer;

    &:hover{
        text-decoration: none;
        color: #01bf71;
        transition: 0.2s ease-in-out;
    }
    &.active {
        font-weight: 700;
    }
`;

export const SideBtn = styled.div`
    display: flex;
    justify-content: center;
`;

export const SideBtnLink = styled(Link)`
border-radius:35px;
background: #1ba94c;
white-space: nowrap;
padding: 10px 20px;
color: #fff;
font-size: 1.5rem;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
box-shadow: 0 8px 16px 0 rgba(f,f,f,f.2), 0 6px 20px 0 rgba(f,f,f,f.19);

&:hover{
    text-decoration: none;
    background: #1ba94c;
    color: #fff;
}
`;