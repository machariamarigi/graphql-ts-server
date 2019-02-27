import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3)
    .max(255),
  email: yup
    .string()
    .min(3)
    .max(255)
    .email(),
  password: yup
    .string()
    .min(8)
    .max(255)
});