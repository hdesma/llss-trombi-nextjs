const ORGANES = require("../db_sources/ORGANES.js");
const PERSONNEL = require("../db_sources/PERSONNEL.js");
const sql = require('better-sqlite3');

async function purgeDatabase(db) {
    db.prepare(`DROP TABLE IF EXISTS personnel;`).run();
    db.prepare(`DROP TABLE IF EXISTS organes;`).run();
    db.prepare(`DROP TABLE IF EXISTS correspondances;`).run();

    console.log("Database purged")
}

async function setUpDatabase(db) {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS personnel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prenom TEXT NOT NULL,
        nom TEXT NOT NULL,
        image TEXT NOT NULL
        );
        `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS organes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        alias TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
        );
        `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS correspondances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_organe TEXT NOT NULL,
        id_personnel TEXT NOT NULL
        );
        `).run();
    console.log("Tables set up")
};

async function initData() {
    const db = sql('./databases/trombinoscope.db');
    purgeDatabase(db)
    setUpDatabase(db);

    const organesInsert = db.prepare(`INSERT INTO organes VALUES(
        null,
        @nom,
        @alias,
        @description,
        @image
        )`)
    for (const organe of ORGANES.default) {
        organesInsert.run(organe)
    }
    console.log("Organes table populated")

    const personnelInsert = db.prepare(`INSERT INTO personnel VALUES(
        null,
        @prenom,
        @nom,
        @image
        )`)

    for (const personne of PERSONNEL.default) {
        personnelInsert.run(personne)
    }
    console.log("Personnel table populated")
    console.log("Prod database set up completed")
}

async function setUpAdminDatabase() {

};
initData()