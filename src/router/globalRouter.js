import express from "express";
import {
  getJoin,
  getLogin,
  home,
  logout,
  postJoin,
  postLogin,
} from "../controller/globalController";
import { uploadAvatar } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);

globalRouter.get("/login", getLogin);
globalRouter.post("/login", postLogin);

globalRouter.get("/join", getJoin);
globalRouter.post("/join", uploadAvatar, postJoin, postLogin);

globalRouter.get("/logout", logout);

export default globalRouter;
