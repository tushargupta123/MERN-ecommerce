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
const passport = require("passport");
const { User } = require("./model/User");
const { isAuth } = require("./services/common");
const JWT = require('passport-jwt');

server.use(express.json());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

async function main() {
  await mongoose.connect("mongodb+srv://tushargupta2k3:tUshar%40123@twitter.fzbvq5v.mongodb.net/ecommerce");
}

main().catch((err) => console.log(err));
server.use("/products", isAuth, productRouters);
server.use("/brands", isAuth, brandRouters);
server.use("/categories", isAuth, categoryRouters);
server.use("/users", isAuth, userRouters);
server.use("/auth", authRouters);
server.use("/cart", isAuth, cartRouters);
server.use("/orders", isAuth, orderRouters);

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'auth_secret'
}
server.use(passport.initialize());
passport.use(new JwtStrategy(opts,async(jwt_payload,done) => {
    const user = await User.findById(jwt_payload.id);
    if(!user){done(null,false)}
    else{done(null,user)}
}))


//Payments

const stripe = require('stripe')('sk_test_51NS13iSCXLoy346ZK25A4MGCusQvLF5GrH5gtdqNxVY4klABYY11Sa159oj1LQ3LtNWt8YxPKlyUylaDv0enju3J00aaq1cYU0')

server.post('/create-payment-intent',async(req,res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:req.body.totalAmount*100,
    currency:'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      orderId:req.body.orderId
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
