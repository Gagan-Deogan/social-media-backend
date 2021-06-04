const express = require("express");
const cors = require("cors");
const { initializeDBConnection } = require("./config/db.connect");
const { initialize } = require("./config/passport");
const users = require("./routes/user.router");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
initializeDBConnection();

app.use(initialize());
app.use("/users", users);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: "Something went wrong",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

app.listen(8080, () => {
  console.log("app listen on 8000");
});
