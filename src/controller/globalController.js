import passport from "passport";

import User from "../model/User";
import events from "../events";
import io from "../server";

export const home = (req, res) => {
  res.render("home", { events: JSON.stringify(events) });
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
    console.log(user);
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

export const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

export const loginNotify = async (req, res) => {
  res.redirect("/login");
  const {
    user: { id },
  } = req;
  const user = await User.findById(id);
  const username = user.username;

  io.on("connection", (socket) => {
    socket.broadcast.emit(events.newUser, { username });
  });
};
