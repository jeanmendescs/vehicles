const app = require("./app");
require("dotenv").config();

const { connectToDB } = require("./models/connection");

const PORT = process.env.PORT || 5000;

connectToDB((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
