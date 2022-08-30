import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController.js";
import { home } from "../controllers/postController.js";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);

export default globalRouter;
