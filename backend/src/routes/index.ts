import { Router } from "express";
import quizzesRoute from "./quizzes.route";
import usersRoute from "./users.route";
import authRoute from "./auth.route";

const api = Router()
  .use("/quizzes", quizzesRoute)
  .use("/users", usersRoute)
  .use("/auth", authRoute);

export default Router().use("/api", api);
