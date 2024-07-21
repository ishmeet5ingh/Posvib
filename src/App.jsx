import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import "./index.css";
import { setReduxCurrentUser, setReduxUsers, deleteReduxUsers, deleteReduxCurrentUser } from "./store/userSlice";
import { setLoading } from "./store/loadingSlice";
import { setHide } from "./store/hideSlice";
import { deleteReduxChatRooms } from "./store/chatRoomSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);
  const Loading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
       if(authStatus){
        dispatch(setLoading(true));
        const [userData, users] = await Promise.all([
          authService.getUserData(),
          authService.getUsersDataFromDB(),
        ]);

        if (userData) {
          dispatch(login({ userData }));

          if (users?.documents) {
            dispatch(setReduxUsers(users.documents));
            const currentUser = users.documents.find(user => user.accountId === authData?.$id);
            dispatch(setReduxCurrentUser(currentUser));
          }
       }
        } else {
          dispatch(deleteReduxUsers());
          dispatch(deleteReduxCurrentUser());
          dispatch(logout());
          dispatch(deleteReduxChatRooms())
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, authData?.$id, authStatus]);

  return !Loading ? (
    <div>
      <div className="sm:flex ">
        <Header />
        <main className="w-full sm:ml-[120px] md:ml-[130px] xmd:ml-[220px] lg:ml-[270px] xl:ml-[300px]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div>
      <div className="sm:flex">
        <Header />
        <main className="w-full sm:ml-[120px] md:ml-[130px] xmd:ml-[220px] lg:ml-[270px] xl:ml-[300px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
