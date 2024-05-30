import React, { useState, useEffect } from "react";
import authSlice from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { FaBeer, FaHome, FaPlus, FaList, FaSignOutAlt, FaSignInAlt, FaUserPlus} from "react-icons/fa";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
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
    <header className="text-white sm:w-1/4 sm:border-r py-3 px-3 shadow sm:min-h-screen border-teal-800 fixed sm:static w-full  bottom-0 bg-black ">
      <nav className="flex sm:flex-col justify-center items-center">
        <div className="sm:items-start mb-10">{isLogo ? "" : <Logo width="70px" />}</div>
        <div className="w-full sm:w-fit">
        <ul className="flex sm:flex-col w-full sm:items-start justify-around sm:gap-5">
          {navItems.map((item) =>
            item.active ? (
              <li key={item?.name}>
                {item.name === "Logout" ? (
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      logoutHandler();

                    }}
                    className="text-2xl  md:text-lg duration-200 flex hover:text-red-300 "
                  >
                    {isSmallScreen ? (
                      item.symbol
                    ) : (
                      <>
                        <span className="text-2xl pr-4">{item.symbol}</span>
                        {item?.name}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-2xl md:text-lg  duration-200   hover:text-red-300 flex"
                  >
                    {isSmallScreen ? (
                      item.symbol
                    ) : (
                      <>
                      <span className="text-2xl pr-4">{item.symbol}</span>
                      {item?.name}
                      </>
                    )}
                  </button>
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
