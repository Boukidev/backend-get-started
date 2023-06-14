require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
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

      const hash = await bcrypt.hash(password, 10);
      const valid = await bcrypt.compare(password, hash);
      if (!valid) {
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

exports.localAuthMiddleware = passport.authenticate("local", { session: false });
exports.jwtAuthMiddleware = passport.authenticate("jwt", { session: false });
