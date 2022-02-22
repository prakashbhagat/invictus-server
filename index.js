const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const db = require("./src/models");
const path = require('path');

var corsOptions = {
  origin: "https://prakashbhagat.herokuapp.com"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// frontend display
app.use(express.static('public'));
// db
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'public/index.html'))
});

require("./src/routes/student.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});