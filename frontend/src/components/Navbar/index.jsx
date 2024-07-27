import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import ChatIcon from "../../assets/images/logo.png";
import "./index.scss";
import MenuDropDown from "../MenuDropDown";
import SvgIcon from "../../assets/icons/SvgIcon";
import Button from "../Button";
import { logout } from "../../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { authRoutes, userRoutes } from "../../constants/appRoutes";
import { clearLocalStorage, eventBus, getLocalStorage } from "../../utils";
import SearchUserIcon from "../../assets/images/search-user.png";
import Drawer from "../Drawer";
import SearchUser from "../SearchUser";
import Tooltip from "../Tooltip";

const Navbar = () => {
  const isAuthenticated = getLocalStorage("accessToken");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transparent, setTransparent] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);

    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  const NAVBAR_DROPDOWN_MENUITEMS = [
    {
      key: "profile",
      value: "Profile",
      icon: <SvgIcon iconName="profile" />,
    },
    {
      key: "logout",
      value: "Logout",
      icon: <SvgIcon iconName="logout" />,
    },
  ];

  const handleAction = (item) => {
    if (item?.key === "profile") {
      navigate(userRoutes.PROFILE);
    } else if (item?.key === "logout") {
      clearLocalStorage();
      dispatch(logout());
    }
  };

  useEffect(() => {
    eventBus.on("logout", () => {
      console.log("event bus logout");
      navigate(authRoutes.LOGIN);
    });

    return () => {
      eventBus.remove("logout");
    };
  }, [userInfo, logout]);

  return (
    <>
      <header className="navbar-header">
        <nav>
          <div
            className={`navbar-container ${transparent ? "bg-transparent" : ""}`}
          >
            <div className="logo">
              <Link to={isAuthenticated ? userRoutes.CHAT : userRoutes.HOME}>
                <Image src={ChatIcon} alt="chat-icon" />
              </Link>
            </div>
            <div className="right-section">
              {userInfo ? (
                <>
                  <Tooltip message="Search Users to chat">
                    <Image
                      src={SearchUserIcon}
                      alt="search-user"
                      className="search-user cursor-pointer"
                      handleClick={() => setOpen(true)}
                    />
                  </Tooltip>
                  <MenuDropDown
                    heading={
                      <div className="flex gap-2 justify-center items-center">
                        <Image
                          src={userInfo?.profilePic}
                          alt={"User Image"}
                          imgClassName="object-cover rounded"
                        />
                        <span>{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
                      </div>
                    }
                    menuItems={NAVBAR_DROPDOWN_MENUITEMS}
                    handleClick={handleAction}
                  />
                </>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => {
                    navigate(authRoutes.LOGIN);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <Drawer
        show={open}
        close={() => setOpen(false)}
        position="left"
        className="search-user-drawer"
        header={"Search User"}
      >
        <SearchUser close={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default Navbar;
