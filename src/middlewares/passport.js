import GooglePlusTokenStrategy from "passport-google-plus-token";
import FacebookTokenStrategy from "passport-facebook-token";
import passport from "passport";
import User from "../models/user";
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID:
        "10991149300-1u8eole3nca5hh28shglh15b2bjn2p8o.apps.googleusercontent.com",
      clientSecret: "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",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({
          authGoogleID: profile.id,
          authType: "google",
        });

        if (user) {
          console.log(user);
          return done(null, {
            mesage: "Đăng nhập thành công",
            accessToken,
            user,
          });
        }
        if (!user) {
          console.log("chua co tai khoan");
          const newUser = await User.create({
            authType: "google",
            authGoogleID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });

          return done(null, {
            message: "Đăng nhập tk thành công",
            accessToken,
            newUser,
          });
        }
      } catch (error) {
        return res.json({
          mesage: error.mesage,
        });
      }
    }
  )
);
// passport Facebook
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: "137854749148362",
      clientSecret: "8b27f3b5938207169503eae6610f8f74",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accesstoken: " + accessToken);
        console.log("refreshToken: " + refreshToken);
        const { ...name } = await profile.user.name;
        console.log("profile: " + name);

        const user = await User.findOne({
          authFacebookID: profile.id,
          authType: "facebook",
        });
        if (user) {
          console.log(user);
          return done(null, {
            mesage: "Đăng nhập thành công",
            accessToken,
            user,
          });
        }
        if (!user) {
          console.log("chua co tai khoan");
          const newUser = await User.create({
            authType: "facebook",
            authFacebookID: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });
          return done(null, {
            message: "Đăng nhập tk thành công",
            accessToken,
            newUser,
          });
        }
      } catch (error) {
        return done(null, {
          mesage: error.mesage,
        });
      }
    }
  )
);
