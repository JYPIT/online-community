import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

const handleListening = () => console.log(`💡 Server listening on port http://localhost:${PORT} 🚀`);

app.listen(4000, handleListening);
