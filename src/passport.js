import passport from "passport";
import User from "./model/User";

passport.use(User.createStrategy());

// 어떤 정보를 쿠키에게 줄 것인지를 의미한다.
passport.serializeUser(User.serializeUser());

// 그 쿠키의 정보를 어떻게 사용자로 전환할 것인가를 의미한다.
passport.deserializeUser(User.deserializeUser());
