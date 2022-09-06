import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController.js";
import { home } from "../controllers/postController.js";
import { publicOnlyMiddleware } from "../middlewares.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

export default globalRouter;
