import express from "express";
import { watch, getEdit, deletePost, postEdit, getUpload, postUpload } from "../controllers/postController.js";
import { protectorMiddleware, videoUpload } from "../middlewares.js";

const postRouter = express.Router();

postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
postRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deletePost);
postRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);

export default postRouter;
