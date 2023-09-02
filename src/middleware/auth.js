require("dotenv").config();

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User.js");

const jwtOptions = {
  secretOrKey: process.env.SECRET_JWT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Invalid email or password" });
      }

      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload.userId });
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

exports.localAuthMiddleware = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ Message: info.message });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      next();
    });
  })(req, res, next);
};
exports.jwtAuthMiddleware = passport.authenticate("jwt", { session: false });
