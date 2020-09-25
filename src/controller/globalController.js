import events from "../events";
import User from "../model/User";

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

export const postJoin = async (req, res) => {
  const {
    body: { username, email, password, password2 },
    file,
  } = req;
  console.log(file);
  if (password !== password2) {
    res.status(400);
    res.redirect("/");
  }
  try {
    const user = await User({
      username,
      email,
      avatarUrl: file ? file.path : null,
    });
    User.register(user, password);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
