const sqlite3 = require("sqlite3");
const crypto = require("crypto");

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
    return new Promise((resolve, reject) => {
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
        "select * from Users where username=? and hashpassword=?",
        [username, password],
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

module.exports = { DBContext };
