import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Header, PostsContainer } from "./components";
import { Outlet } from "react-router-dom";
import "./index.css";
import { setPosts, deleteAllPost } from "./store/configSlice";

// import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getUserData();
        if (userData) {
          console.log("userdata",userData)
          dispatch(login({ userData }));

          if (authStatus) {
            const posts = await appwriteService.getPosts([]);
            if (posts) {
              dispatch(setPosts(posts.documents));
              console.log("hello 1");
            }
          } else {
            dispatch(deleteAllPost());
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, authStatus]);

  return !loading ? (
    <div>
      <div className="sm:flex">
        <Header />
        <main>{authStatus ? <Outlet /> : <Outlet />}</main>
        {/* <Footer/> */}
      </div>
    </div>
  ) : (
    <div>
      <div className="sm:flex">
        {authStatus ? (
          <>
            <Header />
            <Outlet />
          </>
        ) : null}
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App;
