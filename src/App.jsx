import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Header, HeaderSkeletonLoader } from "./components";
import { Outlet } from "react-router-dom";
import "./index.css";
import { setPosts, deleteAllPost } from "./store/configSlice";
import {  setCurrentUser, setUsers, deleteUsers, deleteCurrentUser} from "./store/userSlice";
import { setLoading } from "./store/loadingSlice";



function App() {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state)=> state.auth.userData)
  const Loading = useSelector((state) => state.loading.isLoading);
  
  // const page = useSelector(state => state.config.page);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getUserData();
        if (userData) {
          dispatch(login({ userData }))
          const users = await authService.getUsersDataFromDB()
          const currentUser = users.documents?.find(user => user.accountId === authData?.$id)
          dispatch(setUsers(users?.documents))
          if (authStatus) {
            const posts = await appwriteService.getPosts(1);
            if (posts) {
              dispatch(setPosts(posts));
            }
            dispatch(setCurrentUser(currentUser))
          } else {
            dispatch(deleteAllPost());
          }
        } else {
          dispatch(deleteUsers())
          dispatch(deleteCurrentUser())
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, authStatus,]);

  return !Loading ? (
    <div>
      <div
       className="sm:flex">
        <Header />
        <main
        className="w-full sm:ml-[120px] md:ml-[130px] xmd:ml-[220px] lg:ml-[270px] xl:ml-[300px]">{authStatus ? <Outlet /> : <Outlet />}</main>
      </div>
    </div>
  ) : (
    <div>
      <div className="sm:flex">
          <>
          <Header/>
            <main className="w-full sm:ml-[120px] md:ml-[130px] xmd:ml-[220px] lg:ml-[270px] xl:ml-[300px]">
            <Outlet />
            </main>
          </>
      </div>
    </div>
  );
}

export default App;
