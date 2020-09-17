import express from "express";
import { join } from "path";

const app = express();
const PORT = 5003;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

const handleListening = () => {
  console.log(`✅ Listening : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
