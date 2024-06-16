import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { FaHome, FaPlus, FaList, FaSignOutAlt, FaSignInAlt, FaUserPlus} from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/')
    });
  };

  const [isLogo, setIsLogo] = useState(window.innerWidth < 640);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  // useEffect(() => { ... }, []);
  //This useEffect hook runs once after the initial render. It sets up an event listener to track window resize events and updates the state variables accordingly.

  useEffect(() => {
    const handleResize = () => {
      setIsLogo(window.innerWidth < 640);
      setIsSmallScreen(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    //return () => { ... };
    //This cleanup function removes the event listener when the component is unmounted, preventing memory leaks.
  }, []);

  const navItems = [
    {
      name: "Home",
      symbol: <FaHome />,
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      symbol: <FaSignInAlt />,
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      symbol: <FaUserPlus />,
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      symbol: <FaList />,
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      symbol: <FaPlus />,
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Logout",
      symbol: <FaSignOutAlt />,
      slug: "/",
      active: authStatus,
    },
  ];

  return (
    <header className="z-30 text-white sm:w-1/4 border-r border-teal-800  py-3 px-3 shadow sm:min-h-screen fixed sm:static w-full  bottom-0 bg-black ">
      <nav className="flex sm:flex-col justify-center items-center">
        <div className="sm:items-start mb-10">{isLogo ? "" : <Logo width="70px" />}</div>
        <div className="w-full sm:w-fit">
        <ul className="flex sm:flex-col w-full sm:items-center lg:items-start justify-around sm:gap-5">
          {navItems.map((item) =>
            item.active ? (
              <li key={item?.name}>
                {item.name === "Logout" ? (
                  <button
                    onClick={logoutHandler}
                    className="text-2xl  md:text-lg duration-200 flex hover:text-red-300 "
                  >
                    {isSmallScreen ? (
                      <div className="flex flex-col items-center">
                          {item.symbol} <span className="text-xs mt-1">{item.name}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl pr-3 ">{item.symbol}</span>
                        {item?.name}
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.slug}
                    className={({isActive})=>`text-2xl md:text-lg  duration-100 ${isActive ? "text-blue-300" : ""}   hover:text-blue-100 flex`}
                  >
                    {isSmallScreen ? (
                      <div className="flex flex-col items-center">
                          {item.symbol} <span className="text-xs mt-1">{item.name}</span>
                        </div>
                    ) : (
                      <>
                      <span className="text-2xl pr-4">{item.symbol}</span>
                      {item?.name}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ) : null
          )}
        </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
