import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Header, HeaderSkeletonLoader } from "./components";
import { Outlet } from "react-router-dom";
import "./index.css";
import { setReduxPosts, deleteAllReduxPost } from "./store/configSlice";
import {  setReduxCurrentUser, setReduxUsers, deleteReduxUsers, deleteReduxCurrentUser} from "./store/userSlice";
import { setLoading } from "./store/loadingSlice";



function App() {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state)=> state.auth.userData)
  const Loading = useSelector((state) => state.loading.isLoading);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true)); // Ensure loading state is set before fetching

        const [userData, users, posts] = await Promise.all([
          authService.getUserData(),
          authService.getUsersDataFromDB(),
          authStatus ? appwriteService.getAppwritePosts(1) : Promise.resolve(null),
        ]);

        if (userData) {
          dispatch(login({ userData }));

          if (users?.documents) {
            dispatch(setReduxUsers(users.documents));
            const currentUser = users.documents.find(user => user.accountId === authData?.$id);
            dispatch(setReduxCurrentUser(currentUser));
          }

          if (authStatus && posts) {
            dispatch(setReduxPosts(posts));
          } else {
            dispatch(deleteAllReduxPost());
          }
        } else {
          dispatch(deleteReduxUsers());
          dispatch(deleteReduxCurrentUser());
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(setLoading(false)); // Ensure loading state is reset after fetching
      }
    };

    fetchData();
  }, [dispatch, authData?.$id, authStatus]);

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
