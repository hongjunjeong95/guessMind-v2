import express from "express";
import { join } from "path";
import morgan from "morgan";
import socketIO from "socket.io";
import socketController from "./socketController";
import events from "./events";

import "./db";
import globalRouter from "./router/globalRouter";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.use(morgan("dev"));

app.use("/", globalRouter);

const handleListening = () => {
  console.log(`✅ Listening : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);

io.on("connection", (socket) => socketController(socket, io));
