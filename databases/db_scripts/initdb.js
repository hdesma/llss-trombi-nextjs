const ORGANES = require("../db_sources/ORGANES.js");
const PERSONNEL = require("../db_sources/PERSONNEL.js");
const DOCUMENTS = require("../db_sources/DOCUMENTS.js");
const ROSTERS = require("../db_sources/ROSTERS.js");
const sql = require('better-sqlite3');
const functions = require("./scripts.js")


function initData() {
    console.log("Prod database setup")
    const db = sql('./databases/trombinoscope.db');
    if (db === null) {
        console.log("Database unreachable");
        //TODO faire un log
        return;
    }
    functions.purgeDatabase(db)
    functions.setUpDatabase(db);
    functions.fillDatabase(db, ORGANES, PERSONNEL, DOCUMENTS)
    functions.fillCorrespondancesTable(db, ROSTERS)

    console.log("Prod database set up completed")
}

initData()