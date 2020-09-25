import express from "express";
import { getJoin, home, postJoin } from "../controller/globalController";
import { uploadAvatar } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);

globalRouter.get("/join", getJoin);
globalRouter.post("/join", uploadAvatar, postJoin);

export default globalRouter;
