const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://loacalhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { DB_URL } = require("./app/config/db.config");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((err) => {
    console.log("Cannot connect to the database...", err);
    process.exit();
  });

//route
app.get("/", (req, res) => {
  res.json({ message: " Welcome to tutorials application" });
});

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
