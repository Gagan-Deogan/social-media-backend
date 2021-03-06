const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeDBConnection } = require("./config/db.connect");
const { initialize } = require("./config/passport");
const users = require("./routes/user.router");
const posts = require("./routes/post.router");
const profiles = require("./routes/profile.router");
const search = require("./routes/search.router");
const notifications = require("./routes/notification.router");
const app = express();

app.use(bodyParser.json());

app.use(cors());
initializeDBConnection();

app.use(initialize());
app.use("/users", users);
app.use("/posts", posts);
app.use("/profiles", profiles);
app.use("/search", search);
app.use("/notifications", notifications);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Working ryt",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(503).json({
    success: false,
    error: "Something went wrong",
  });
});

app.listen(8080, () => {
  console.log("app listen on 8080");
});
