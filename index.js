require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const companyRoutes = require('./routes/companyRoutes');
const roleRoutes = require('./routes/roleRoutes');
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

app.use('/auth', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/categories', categoryRoutes);
app.use('/companies', companyRoutes);
app.use('/roles', roleRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
