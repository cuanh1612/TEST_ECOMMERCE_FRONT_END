import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Email format is invalid")
    .required("email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
