import express, { urlencoded } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./services/user";
import { json } from "express";
import { body, checkSchema } from "express-validator";
import { validateUserInput } from "./middleware";
const app = express();
app.use(json());
app.use(urlencoded());
app.use(morgan("dev"));
app.use("/api/v1", protect, router);
app.post(
  "/user",
  checkSchema({
    username: { isString: true },
    password: { isStrongPassword: true },
    email: { isEmail: true },
  }),
  validateUserInput,
  createNewUser
);
app.post("/login", signin);
export default app;
