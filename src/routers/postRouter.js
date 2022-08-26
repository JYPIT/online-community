import express from "express";
import { see, editPost, deletePost, upload } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/upload", upload);
postRouter.get("/:id(\\d+)", see);
postRouter.get("/:id(\\d+)/edit", editPost);
postRouter.get("/:id(\\d+)/delete", deletePost);

export default postRouter;
