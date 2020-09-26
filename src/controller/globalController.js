import passport from "passport";

import User from "../model/User";
import events from "../events";
import io from "../server";
import { sockets } from "../socketController";

export const home = async (req, res) => {
  res.render("home", { events: JSON.stringify(events), users: sockets });
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  io.once("connection", () => {
    console.log("homenome");
    sendPlayerUpdate();
  });
};

export const getJoin = (req, res) => {
  try {
    res.render("join", { events: JSON.stringify(events) });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const postJoin = async (req, res, next) => {
  const {
    body: { username, password, password2 },
    file,
  } = req;

  if (password !== password2) {
    res.status(400);
    res.redirect("/");
  }
  try {
    const user = await User({
      username,
      avatarUrl: file ? file.path : null,
    });
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const getLogin = (req, res) => {
  try {
    res.render("login", { events: JSON.stringify(events) });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: "/login",
});

export const loginNotify = async (req, res) => {
  const {
    user: { id },
  } = req;
  res.redirect("/login");
  const user = await User.findById(id);
  const username = user.username;

  sockets.push({ id: user.id, points: user.points, username });
  io.once("connection", (socket) => {
    console.log("connection");
    socket.broadcast.emit(events.newUser, { username });
  });
};

export const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
