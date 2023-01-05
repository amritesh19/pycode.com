import React, {useState, useEffect} from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, 
         NavbarContainer,
         NavLogo,
         MenuIcon,
         Menu,
         MenuItem,
         NavLinks,
         NavBtn,
         NavBtnLink
 } from './navbar.styles';
 import { useNavigate } from "react-router";
import { useUserAuth } from '../../context/UserAuthContext';

const NavBar = ({ toggle }) => {
    const [scrollnav, setScrollnav] = useState(false);

    const changenav = ()=>{
      if(window.location.pathname!=="/"||window.scrollY >= 50)
        setScrollnav(true);
      else setScrollnav(false);
    }

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        await logOut();
            navigate("/");
        } catch (error) {
        console.log(error.message);
        }
    };

    useEffect(() => {
      window.addEventListener('scroll', changenav);
      window.addEventListener('click', changenav);
    }, []);

    return ( 
      <Nav scrollnav={scrollnav}>
        <NavbarContainer>
          <NavLogo to="/" scrollnav={scrollnav}>PyCode</NavLogo>
          <MenuIcon onClick={toggle}>
            <FaBars/>
          </MenuIcon>
          <Menu>
            <MenuItem>
              <NavLinks scrollnav={scrollnav} to="/python" >Python</NavLinks>
            </MenuItem>
            <MenuItem>
              <NavLinks scrollnav={scrollnav} to="/mathplotlib" >Mathplotlib</NavLinks>
            </MenuItem>
            <MenuItem>
              <NavLinks scrollnav={scrollnav} to="/numpy" >Numpy</NavLinks>
            </MenuItem>
            {user&&(user.email==="anand@gmail.com")&&
            <MenuItem>
              <NavLinks scrollnav={scrollnav} to="/admin" >Admin</NavLinks>
            </MenuItem>}
            </Menu>
            {!user && (
              <Menu>
                <NavBtn>
                  <NavLinks scrollnav={scrollnav} to="/login" >Login</NavLinks>
                </NavBtn>
                <NavBtn>
                  <NavLinks scrollnav={scrollnav} to="/signup">Register</NavLinks>
                </NavBtn>
              </Menu>
            )}
            {user && (
              <Menu>
                <NavBtn>
                  <NavBtnLink to="/profile">{user.email}</NavBtnLink>
                </NavBtn>
                <NavBtn>
                  <NavLinks scrollnav={scrollnav} onClick={handleLogout} >Logout</NavLinks>
                </NavBtn>
              </Menu>
            )}
        </NavbarContainer>
      </Nav>
     );
}
 
export default NavBar;