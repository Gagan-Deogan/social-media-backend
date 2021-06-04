const express = require("express");
const { initializeDBConnection } = require("./config/db.connect");
const app = express();

initializeDBConnection();

app.listen(8080, () => {
  console.log("app listen on 8000");
});
