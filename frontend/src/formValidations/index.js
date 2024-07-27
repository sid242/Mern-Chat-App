import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().label("First name").required().min(3).max(20),
  lastName: Yup.string().label("Last name").required().min(3).max(20),
  email: Yup.string()
    .label("Email")
    .required()
    .matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email Address"),
  password: Yup.string()
    .label("Password")
    .required()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .label("Confirm password")
    .required()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password value should same as password field"
    ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .required()
    .matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email Address"),
  password: Yup.string().label("Password").required(),
});
