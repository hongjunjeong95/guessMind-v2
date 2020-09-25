import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  points: Number,
  avatarUrl: String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "username" });

const model = mongoose.model("User", UserSchema);

export default model;
