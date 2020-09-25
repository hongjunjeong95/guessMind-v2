import events from "../events";

export const home = (req, res) => {
  res.render("home", { events: JSON.stringify(events) });
};

export const join = (req, res) => {
  res.render("join");
};
