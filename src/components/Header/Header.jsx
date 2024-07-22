import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeaderSkeletonLoader, Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { FaHome, FaSearch, FaPlus,FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaFacebookMessenger} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.users.currentUser)


  const logoutHandler = () => {
    toast("Logging out...")
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/')
      toast.success("Successfully logged out")
    });
  };

  const [isLogo, setIsLogo] = useState(window.innerWidth < 640);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);
  const [isHeader, setIsHeader] = useState(window.innerHeight < 768)

  const isHide = useSelector(state => state.hide.isHide)

  
  useEffect(() => {
    setIsHeader(window.innerWidth < 640)
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLogo(window.innerWidth < 640);
      setIsSmallScreen(window.innerWidth < 900);
      setIsHeader(window.innerWidth < 640)

    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const navItems = [
    {
      name: "Home",
      symbol: <FaHome />,
      slug: "/",
      active: true,
    },
    {
      name: "Chat",
      symbol: <FaFacebookMessenger />,
      slug: "/chat",
      active:  authStatus,
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
      name: "Profile",
      symbol: <FaUser />,
      slug: `/user/${userData?.username}`,
      active: authStatus,
    },
    {
      name: "Search",
      symbol: <FaSearch/>,
      slug: "/search",
      active: authStatus
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
    <>
    {!userData && authStatus ? <HeaderSkeletonLoader/> : 
    (
      <div >
      {!isHide && isHeader ? 
        null : (
          <header className="z-20 text-white h-[68px] w-full sm:w-[120px]  md:w-[130px] xmd:w-[220px] lg:w-[270px] xl:w-[300px] border-r border-teal-900  py-3  shadow sm:min-h-screen fixed  bottom-0 bg-black ">
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
                    className="text-2xl sm:text-lg duration-200 flex hover:text-red-300 "
                  >
                    {isSmallScreen ? (
                      <div className="flex flex-col items-center">
                          {item.symbol} <span className="text-xs mt-1">{item.name}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl  pr-3 ">{item.symbol}</span>
                        {item?.name}
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.slug}
                    className={({isActive})=>` text-2xl sm:text-lg duration-100 ${isActive ? "text-blue-300" : ""}   hover:text-blue-100 flex`}
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
        ) }
      </div>
    )
    }
    
    </>
  );
}

export default Header;
