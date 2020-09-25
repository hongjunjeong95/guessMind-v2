import express from "express";
import { home, join } from "../controller/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);

globalRouter.get("/join", join);
globalRouter.post("/join", join);

export default globalRouter;
