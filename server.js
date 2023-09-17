require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const cookieSession = require("cookie-session");
const app = express();
const mongoose = require("mongoose");
const eventRoute = require("./routes/eventRoute");
const StudentCourse = require("./routes/studentcourseRoute");
require("./passport");

mongoose.connect(process.env.MONGO_URL)
.then(_=> console.log("connection successful"))
.catch(err=> console.log("database connection fail",err));

app.use(express.json());

app.set("trust proxy", true);

app.use(
	cookieSession({
		name: "session",
		sameSite: "none",
		secure: true ,
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		// methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

app.use("/register", signupRoute);

app.use("/api/events", eventRoute);

app.use("/api/studentcourses",StudentCourse);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listenting on port ${port}...`));





















