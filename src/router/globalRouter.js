import express from "express";
import {
  getJoin,
  getLogin,
  home,
  loginNotify,
  logout,
  postJoin,
  postLogin,
} from "../controller/globalController";
import { onlyPrivate, onlyPublic, uploadAvatar } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);

globalRouter.get("/login", onlyPublic, getLogin);
globalRouter.post("/login", onlyPublic, postLogin, loginNotify);

globalRouter.get("/join", onlyPublic, getJoin);
globalRouter.post("/join", onlyPublic, uploadAvatar, postJoin, postLogin);

globalRouter.get("/logout", onlyPrivate, logout);

export default globalRouter;
