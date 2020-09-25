import multer from "multer";

const multerAvatar = multer({ dest: "src/uploads/avatar" });

export const uploadAvatar = multerAvatar.single("avatar");
