const ORGANES = require("../db_sources/ORGANES.js");
const PERSONNEL = require("../db_sources/PERSONNEL.js");
const ROSTERS = require("../db_sources/ROSTERS.js");
const DOCUMENTS = require("../db_sources/DOCUMENTS.js");
const sql = require('better-sqlite3');

function purgeDatabase(db) {
    db.prepare(`DROP TABLE IF EXISTS personnel;`).run();
    db.prepare(`DROP TABLE IF EXISTS organes;`).run();
    db.prepare(`DROP TABLE IF EXISTS correspondances;`).run();
    db.prepare(`DROP TABLE IF EXISTS documents;`).run();


    console.log("Database purged")
}

function setUpDatabase(db) {
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
            short TEXT NOT NULL,
            alias TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            display_organe BOOLEAN NOT NULL DEFAULT 1
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS correspondances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_organe INTEGER NOT NULL,
            id_personnel INTEGER NOT NULL,
            is_chef BOOLEAN,
            display_link BOOLEAN NOT NULL DEFAULT 1
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            auteur TEXT NOT NULL,
            description TEXT,
            path TEXT NOT NULL,
            id_organe INTEGER NOT NULL
        )
    `).run();

    console.log("Tables set up")
};

function fillDatabase(db) {
    const organesInsert = db.prepare(`
        INSERT INTO organes VALUES(
            null,
            @nom,
            @short,
            @alias,
            @description,
            @image,
            true
        )`
    )
    for (const organe of ORGANES.default) {
        organesInsert.run(organe)
    }
    console.log("Organes table populated")

    const personnelInsert = db.prepare(`
        INSERT INTO personnel VALUES(
            null,
            @prenom,
            @nom,
            @image
        )`
    )

    for (const personne of PERSONNEL.default) {
        personnelInsert.run(personne)
    }
    console.log("Personnel table populated")

    const documentsInsert = db.prepare(`
        INSERT INTO documents VALUES(
            null,
            @nom,
            @auteur,
            @description,
            @path,
            @id_organe
        )
    `)
    for (document of DOCUMENTS.default) {
        documentsInsert.run(document)
    }
    console.log("Documents table populated")

}

function fillCorrespondancesTable(db, rosters) {

    rosters.default.forEach((organe) => {
        const organeAlias = organe.organeAlias
        const membresNomsArray = organe.membresNomsArray
        const organeId = db.prepare(`SELECT id FROM organes WHERE alias=?`).get(organeAlias)
        const chefIdArray = organe.chef
        const membresId = membresNomsArray.map((membreNom) => {
            return db.prepare(`SELECT id FROM personnel WHERE nom=?`).get(membreNom)
        })

        membresId.forEach((id_personnel) => {
            console.log(chefIdArray, id_personnel)

            isChef = chefIdArray ? (chefIdArray.includes(id_personnel.id) ? 1 : 0) : 0;
            const args = { id_organe: organeId.id, id_personnel: id_personnel.id, is_chef: isChef }
            db.prepare(`INSERT INTO correspondances VALUES(
            null,
            @id_organe,
            @id_personnel,
            @is_chef,
            true
            )`).run(args)
        })
    })
}

function initData() {
    console.log("Prod database setup")

    const db = sql('./databases/trombinoscope.db');
    purgeDatabase(db)
    setUpDatabase(db);
    fillDatabase(db)
    fillCorrespondancesTable(db, ROSTERS)

    console.log("Prod database set up completed")
}


function setUpAdminDatabase() {

};

initData()