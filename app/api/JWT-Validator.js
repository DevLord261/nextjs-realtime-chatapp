const jwt = require("jsonwebtoken");
const { context } = require("./DBContext");
const secretkey = "enjoywebprogramming";

function validatetoken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secretkey, (err, decoded) => {
      if (err) {
        return resolve(null);
      }
      resolve(decoded);
    });
  });
}

function signer(username) {
  const token = jwt.sign({ username }, secretkey, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = { validatetoken, signer };
