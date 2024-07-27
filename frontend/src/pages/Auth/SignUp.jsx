import React, { useState } from "react";
import FormikWrapper from "../../components/FormikWrapper";
import FormInput from "../../components/FormInput";
import { signUpSchema } from "../../formValidations";
import Password from "../../components/Password";
import SvgIcon from "../../assets/icons/SvgIcon";
import ChatIcon from "../../assets/images/logo.png";
import "../../assets/scss/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import FileUpload from "../../components/FileUpload";
import Loader from "../../components/Loader";
import Image from "../../components/Image";
import { userRoutes } from "../../constants/appRoutes";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoadig] = useState(false);

  const handleLoading = (value) => setIsLoadig(value);
  const redirect = (route) => {
    navigate(route);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  };

  const handleRegister = (values) => {
    const { confirmPassword, ...data } = values;
    handleLoading(true);
    registerUser(data, handleLoading, redirect);
  };

  return (
    <div className="register-page">
      <div className="main-div">
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
              validationSchema={signUpSchema}
              onSubmit={handleRegister}
              buttonProps={{
                children: isLoading ? <Loader size="small" /> : "Register",
                className: "w-full mt-8",
                isDisabled: isLoading,
              }}
            >
              <>
                <FormInput
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
                <Password required />
                <Password
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="Enter password again"
                  required
                />
                <FileUpload
                  label="Profile Picture"
                  name="profilePic"
                  placeholder="Enter your first name"
                  type="file"
                />
              </>
            </FormikWrapper>
            <div className="text-center">
              <span>
                Already have an account? <Link to="/login">Login Now</Link>
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

export default SignUp;
