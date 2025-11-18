const _ORGANS = require("./_ORGANS.js");
const _PERSONNEL = require("./_PERSONNEL");
const sql = require('better-sqlite3');

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
        CREATE TABLE IF NOT EXISTS correspondance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_organe TEXT NOT NULL,
        id_personnel TEXT NOT NULL
        );
        `).run();
    console.log("Tables set up")
};

async function initData() {
    const db = sql('trombinoscope.db');
    setUpDatabase(db);
    const organInsert = db.prepare(`INSERT INTO organes VALUES(
        null,
        @nom,
        @alias,
        @description,
        @image
        )`)
    for (const organ of _ORGANS.default) {
        organInsert.run(organ)
    }
    console.log("Organs table populated")

    const personnelInsert = db.prepare(`INSERT INTO personnel VALUES(
        null,
        @prenom,
        @nom,
        @image
        )`)

    for (const personne of _PERSONNEL.default) {
        personnelInsert.run(personne)
    }
    console.log("Personnel table populated")
    console.log("Prod database set up completed")
}

async function setUpAdminDatabase() {

};
initData()