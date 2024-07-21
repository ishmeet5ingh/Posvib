import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import AuthLayout from "./components/auth/AuthLayout.jsx";
import {
  Home,
  Login,
  Signup,
  EditPost,
  MyPosts,
  AddPost,
  Post,
  Search,
  UserProfile,
  Followers,
  Following,
  EditProfile,
  Chat,
  ChatRoom,
} from "./pages/index.js";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chat",
        element: (
        <AuthLayout authentication>
        <Chat/>
        </AuthLayout>
      ),
        children: [
          {
            path: "/chat/room/:currentUser_selectedUser",
            element: (
              <AuthLayout authentication>
              <ChatRoom/>
              </AuthLayout>
            )
          }
        ]
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/user/:username",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/user/:username/followers",
        element: (
          <AuthLayout authentication>
            <Followers />
          </AuthLayout>
        ),
      },
      {
        path: "user/:username/following",
        element: (
          <AuthLayout authentication>
            <Following />
          </AuthLayout>
        ),
      },
     {
      path: "user/:username/edit-profile",
      element: (
        <AuthLayout authentication>
          <EditProfile/>
        </AuthLayout>
      )
     },
      {
        path: "/search",
        element: (
          <AuthLayout authentication>
            <Search />
          </AuthLayout>
        ),
      },

      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/Edit-post/:id",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Provider>
);
