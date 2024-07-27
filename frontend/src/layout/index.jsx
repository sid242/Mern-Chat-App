import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/auth";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

let count = 0;
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const accessToken = getLocalStorage("accessToken");

  useEffect(() => {
    if (accessToken && !count) {
      count++;
      dispatch(getUserData());
    }
  }, [accessToken]);

  return (
    <div className="main-layout">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <Loader />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
