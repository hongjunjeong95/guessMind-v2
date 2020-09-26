import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Guess Mind";
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

const multerAvatar = multer({ dest: "src/uploads/avatar" });

export const uploadAvatar = multerAvatar.single("avatar");
