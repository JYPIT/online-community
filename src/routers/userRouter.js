import express from "express";
import { getEdit, postEdit, logout, see, startGithubLogin, finishGithubLogin, getChangePasswd, postChangePasswd } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares.js";

const userRouter = express.Router();

userRouter.route("/change-password").all(protectorMiddleware).get(getChangePasswd).post(postChangePasswd);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
