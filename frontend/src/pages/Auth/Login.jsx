import React, { useEffect } from "react";
import FormikWrapper from "../../components/FormikWrapper";
import FormInput from "../../components/FormInput";
import Password from "../../components/Password";
import SvgIcon from "../../assets/icons/SvgIcon";
import ChatIcon from "../../assets/images/logo.png";
import "../../assets/scss/auth.scss";
import Image from "../../components/Image";
import { loginSchema } from "../../formValidations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { login } from "../../redux/actions/auth";
import { userRoutes } from "../../constants/appRoutes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (userInfo) {
      navigate(userRoutes.CHAT);
    }
  }, [userInfo]);

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="login-page">
      <div className="main-div login-main-div">
        <div className="flex flex-col items-center gap-5 sm:gap-10 p-6">
          <Link to={userRoutes?.HOME} className="logo-link">
            <div className="main-logo">
              <Image src={ChatIcon} alt="chat-icon" />
              <span>Chit Chat</span>
            </div>
          </Link>
          <div>
            <FormikWrapper
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
              buttonProps={{
                children: loading ? <Loader size="small" /> : "Login",
                className: "w-full mt-8",
                isDisabled: loading,
              }}
            >
              <>
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />
                <div className="relative">
                  <Password />
                  <span className="absolute bottom-[-22px] right-0">
                    <Link to={userRoutes?.HOME}>Forgot Password?</Link>
                  </span>
                </div>
              </>
            </FormikWrapper>
            <div className="text-center">
              <span>
                Do you have an account? <Link to="/register">Register Now</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="svg-div">
        <SvgIcon iconName="signup" className="bg-[#15a6ff] h-screen p-10" />
      </div>
    </div>
  );
};

export default Login;
