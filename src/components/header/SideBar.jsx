import React from "react";
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBarMenu,
  SideBarWrapper,
  SideBarLink,
  SideBtn,
  SideBtnLink,
} from "./sidebar.styles";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";

const SideBar = ({ isOpen, toggle }) => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    toggle();
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SideBarContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLink to="/python" onClick={toggle}>
            Python
          </SideBarLink>
          <SideBarLink to="/mathplotlib" onClick={toggle}>
            Mathplotlib
          </SideBarLink>
          <SideBarLink to="/numpy" onClick={toggle}>
            Numpy
          </SideBarLink>
          {!user && (
            <React.Fragment>
              <SideBarLink to="/login" onClick={toggle}>
                Login
              </SideBarLink>
              <SideBtn>
                <SideBtnLink to="/signup" onClick={toggle}>
                  SignUp
                </SideBtnLink>
              </SideBtn>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <SideBarLink to="/profile" onClick={toggle}>
                {user.email}
              </SideBarLink>
              <SideBtn>
                <SideBtnLink onClick={handleLogout}>Logout</SideBtnLink>
              </SideBtn>
            </React.Fragment>
          )}
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  );
};

export default SideBar;
