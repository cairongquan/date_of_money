const { join } = require("path");

const sqlite = require("./SqliteDB").SqliteDB;

const dateOfMoneyDB = new sqlite(join(__dirname, "./dateOfMoney.db"));

dateOfMoneyDB.createTable(
  "create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);"
);
