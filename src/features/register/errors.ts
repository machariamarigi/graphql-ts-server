import { createError } from "apollo-errors";

export const EmailUsedError = createError("EmailUsedError", {
  message: "Email has already been used"
});
