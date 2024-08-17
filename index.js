require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
require("./config/passport");

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
