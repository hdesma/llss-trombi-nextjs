const PERSONNEL = require("../db_sources/PERSONNEL.js");
const ROSTERS = require("../db_sources/ROSTERS.js");
const sql = require('better-sqlite3');
const functions = require("./scripts.js")

function restorePersonnel() {
    const db = sql('./databases/trombinoscope.db');
    if(db === null){
        console.log("Database unreachable");
        //TODO faire un log
        return;
    }
    functions.purgePersonnel(db);
    functions.purgeCorrespondances(db);
    functions.setUpPersonnel(db);
    functions.setUpCorrespondances(db);
    functions.fillPersonnel(db, PERSONNEL);
    functions.fillCorrespondancesTable(db, ROSTERS);
};

restorePersonnel();