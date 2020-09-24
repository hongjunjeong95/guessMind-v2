import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/guessMind-v2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connted to DB");
const handleError = (error) => console.log(`❌ Connecion ${error}`);

db.on("error", handleError);
db.once("open", handleOpen);
