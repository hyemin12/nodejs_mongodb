if (process.env.NODE_ENV === "production") {
  // local
  module.exports = require("./prod");
} else {
  // deploy
  module.exports = require("./dev");
}
