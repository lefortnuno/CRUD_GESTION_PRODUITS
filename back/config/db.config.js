"use strict";
const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: process.env.URL_BDD_HOST2,
  user: process.env.URL_BDD_USER2,
  password: process.env.URL_BDD_MDP2,
  database: process.env.URL_BDD_NAME2,
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connexion base de donnees avec Succes!");
});
module.exports = dbConn;
