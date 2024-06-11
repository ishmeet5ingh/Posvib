import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Header, PostsContainer } from "./components";
import { Outlet } from "react-router-dom";
import "./index.css";
import { setPosts, deleteAllPost } from "./store/configSlice";
import {  setCurrentUser, setUsers, deleteUsers, deleteCurrentUser } from "./store/userSlice";
import { createSelector } from "reselect";

// import './App.css'
// const selectAuthData = (state, authData) => authData;
// const selectUsers = (state) => state.users.users?.users.documents;

// const selectCurrentUser = createSelector(
//   [selectUsers, selectAuthData],
//   (users, authData) => users?.find(user => user.accountId === authData?.$id)
// );

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state)=> state.auth.userData)
  const authUsers = useSelector((state)=> state.users.users?.users.documents)
  // const currentUser = useSelector((state)=> state.users?.users?.users.documents?.find(user => user.accountId === authData?.$id))
  // const currentUser = useSelector(state => selectCurrentUser(state, authData));


  // const currentUser1 = useSelector((state)=> state.users.currentUser)

  // console.log(currentUser1)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getUserData();
        if (userData) {
          dispatch(login({ userData }))
          const users = await authService.getUsersDataFromDB()
          console.log("usersType", users)
          const currentUser = users.documents?.find(user => user.accountId === authData?.$id)

          console.table({users: users, authUsers: authUsers, authData: authData})
          dispatch(setUsers({users}))
          if (authStatus) {
            const posts = await appwriteService.getPosts([]);
            if (posts) {
              dispatch(setPosts(posts.documents));
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
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, authStatus, ]);

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
