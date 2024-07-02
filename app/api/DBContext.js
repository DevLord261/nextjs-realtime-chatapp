const sqlite3 = require("sqlite3");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class DBContext {
  constructor() {
    this.db = new sqlite3.Database("./database.sqlite3", (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the SQLite database.sqlite3.");
    });
    this.db.run(
      "create table if not exists Users(" +
        "ID TEXT PRIMARY_KEY NOT NULL," +
        "username TEXT NOT NULL UNIQUE," +
        "hashpassword TEXT NOT NULL);",
      (err) => {
        if (err) throw err;
        console.log("database created");
      },
    );
  }

  generateUUID() {
    return crypto.randomUUID();
  }

  async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async checkifexists(username) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "select username from Users where username=?",
        [username],
        (err, result) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          resolve(result !== undefined);
        },
      );
    });
  }

  async newuser(username, password) {
    return new Promise(async (resolve, reject) => {
      this.db.run(
        "insert into Users values(:id,:username,:password)",
        {
          ":id": this.generateUUID(),
          ":username": username,
          ":password": password,
        },
        (err) => {
          if (err) {
            console.error(err.message);
            return reject(err);
          }
          return resolve(true);
        },
      );
    });
  }

  async signin(username, password) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "select * from Users where username=? ",
        [username],
        async (err, result) => {
          if (err) {
            console.error(err.message);
            return reject(err);
          }

          if (!result) return reject("user not found");

          try {
            const match = await bcrypt.compare(password, result.hashpassword);
            if (match) return resolve(result);
            else return reject("wrong password");
          } catch (e) {
            console.error("bcrypt error:", e.message);
            reject("An error occurred during password verification");
          }
        },
      );
    });
  }

  async checkforlogin(payload) {
    return new Promise((resolve, reject) => {
      const { user, pass } = payload;
      this.db.get(
        "select * from Users where username=? and hashpassword=?",
        [user, pass],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return reject(err);
          }
          console.log(result);
          return resolve(result !== undefined);
        },
      );
    });
  }
}

const context = new DBContext();
module.exports = { context };
