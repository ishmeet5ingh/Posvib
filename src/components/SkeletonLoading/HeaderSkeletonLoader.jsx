import React,{useState, useEffect} from "react";
import Logo from "../Logo";
import { FaHome, FaSearch, FaPlus, FaUser, FaSignOutAlt} from "react-icons/fa";



function HeaderSkeletonLoader() {

  const [isLogo, setIsLogo] = useState(window.innerWidth < 640);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsLogo(window.innerWidth < 640);
      setIsSmallScreen(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);

  const navItems = [
    <FaHome />,
    <FaUser />,
    <FaSearch />,
    <FaPlus />,
    <FaSignOutAlt />,
  ];


  return (
     <header className="z-30  h-[68px] text-[#3a3a3a] w-full sm:w-[120px]  md:w-[130px] xmd:w-[220px] lg:w-[270px] xl:w-[300px] border-r border-teal-800  py-3  shadow sm:min-h-screen fixed  bottom-0 bg-black ">
      <nav className="flex sm:flex-col justify-center items-center">
        <div className="sm:items-start mb-10">{isLogo ? "" : <Logo width="70px" />}</div>
        <div className="w-full sm:w-fit">
        <ul className="flex sm:flex-col w-full sm:items-center lg:items-start justify-around sm:gap-6">
          {navItems.map((logo, index) =>
              <li key={logo}>
                  <div
                    className={`text-2xl sm:text-lg duration-100`}
                  >
                    {isSmallScreen ? (
                      <div className="flex flex-col items-center">
                    
                      <div>{logo}</div>
                      
                      <div className="mt-1 w-9 rounded-lg shimmer-bg h-3">
                      
                      </div>
                        </div>
                    ) : (
                      <div className="text-2xl lg:pr-4 gap-4  flex items-end">
                      <div>
                      {logo}
                      </div>
                      <div className="w-14 rounded-lg shimmer-bg h-4">
                      </div>
                      </div>
                      
                    )}
                  </div>
                
              </li>
          )}
        </ul>
        </div>
      </nav>

    </header>
  );
}

export default HeaderSkeletonLoader;
