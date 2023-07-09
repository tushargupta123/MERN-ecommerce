const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productRouters = require("./routes/Products");
const brandRouters = require("./routes/Brands");
const categoryRouters = require("./routes/Categories");
const userRouters = require("./routes/User");
const authRouters = require("./routes/Auth");
const cartRouters = require("./routes/Cart");
const orderRouters = require("./routes/Order");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./model/User");
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

server.use(express.static('build'))

server.use(express.json());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(cookieParser());
server.use(passport.authenticate("session"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
}

main().catch((err) => console.log(err));
server.use("/products", isAuth(), productRouters);
server.use("/brands", isAuth(), brandRouters);
server.use("/categories", isAuth(), categoryRouters);
server.use("/users", isAuth(), userRouters);
server.use("/auth", authRouters);
server.use("/cart", isAuth(), cartRouters);
server.use("/orders", isAuth(), orderRouters);

passport.use(
  "local",
  new LocalStrategy({usernameField:'email'},async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "invalid credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            done(null, {id:user.id,role:user.role});
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, sanitizeUser(user));
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


//Payments

const stripe = require('stripe')('sk_test_51NS13iSCXLoy346ZK25A4MGCusQvLF5GrH5gtdqNxVY4klABYY11Sa159oj1LQ3LtNWt8YxPKlyUylaDv0enju3J00aaq1cYU0')
const calculateOrderAmount = (items) => {
  return 1400;
}

server.post('/create-payment-intent',async(req,res) => {
  const {items} = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount:calculateOrderAmount(items),
    currency:'inr',
    automatic_payment_methods: {
      enabled: true,
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret
  })
})

server.listen("8080", () => {
  console.log("server started on port 8080");
  main();
  console.log("mongodb connected");
});
