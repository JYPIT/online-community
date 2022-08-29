import express from "express";
import { watch, getEdit, deletePost, postEdit, getUpload, postUpload } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postRouter.route("/:id([0-9a-f]{24})/delete").get(deletePost);

export default postRouter;
