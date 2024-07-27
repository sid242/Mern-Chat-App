import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { authRoutes, userRoutes } from "../constants/appRoutes";
import { getLocalStorage } from "../utils";

const Layout = lazy(() => import("../layout"));
const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Chat = lazy(() => import("../pages/Chat"));
const Profile = lazy(() => import("../pages/Profile"));

const Router = () => {
  const isAuthenticated = getLocalStorage("accessToken");

  return (
    <Routes>
      <Route path={userRoutes.HOME} element={<Layout />}>
        <Route
          index
          element={
            isAuthenticated ? <Navigate to={userRoutes?.CHAT} /> : <Home />
          }
        />
        <Route path={userRoutes.CHAT} element={<PrivateRoute />}>
          <Route index element={<Chat />} />
        </Route>
        <Route
          path={userRoutes.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path={authRoutes.REGISTER}
        element={
          isAuthenticated ? <Navigate to={userRoutes?.HOME} /> : <SignUp />
        }
      />
      <Route
        path={authRoutes.LOGIN}
        element={
          isAuthenticated ? <Navigate to={userRoutes?.HOME} /> : <Login />
        }
      />
      <Route path={userRoutes.NOT_FOUND} element={<h2>not found</h2>} />
    </Routes>
  );
};

export default Router;
