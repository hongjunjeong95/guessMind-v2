import events from "../events";
import User from "../model/User";

import passport from "passport";

export const home = (req, res) => {
  res.render("home", { events: JSON.stringify(events) });
};

export const getJoin = (req, res) => {
  try {
    res.render("join");
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
    res.render("login");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

export const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
