function purgeDatabase(db) {
    purgePersonnel(db);
    purgeOrganes(db);
    purgeCorrespondances(db);
    purgeDocuments(db);
    console.log("Database purged")
}

function purgePersonnel(db) {
    db.prepare(`DROP TABLE IF EXISTS personnel;`).run();
    console.log("Table personnel purged")
}

function purgeOrganes(db) {
    db.prepare(`DROP TABLE IF EXISTS organes;`).run();
    console.log("Table organes purged")
}

function purgeCorrespondances(db) {
    db.prepare(`DROP TABLE IF EXISTS correspondances;`).run();
    console.log("Table correspondances purged")
}

function purgeDocuments(db) {
    db.prepare(`DROP TABLE IF EXISTS documents;`).run();
    console.log("Table documents purged")
}

function purgeTable(db, table) {
    if (table !== "admin" && table !== "users") {
        db.prepare(`DROP TABLE IF EXISTS ${table};`).run();
        console.log(`Table ${table} purged`)
    } else {
        console.log("This table can't be purged")
    }
}

function setUpDatabase(db) {
    setUpPersonnel(db);
    setUpOrganes(db);
    setUpCorrespondances(db);
    setUpDocuments(db);
    console.log("Tables set up")
};

function setUpPersonnel(db) {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS personnel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prenom TEXT NOT NULL,
        nom TEXT NOT NULL,
        image TEXT NOT NULL
        );
    `).run();
    console.log("Personnel table set up")
}

function setUpOrganes(db) {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS organes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            short TEXT NOT NULL,
            alias TEXT NOT NULL,
            resp_titre TEXT,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            display_organe BOOLEAN NOT NULL DEFAULT 1
        );
    `).run();
    console.log("Organes table set up")
}

function setUpDocuments(db) {
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
    console.log("Documents table set up")
}

function setUpCorrespondances(db) {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS correspondances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_organe INTEGER NOT NULL,
            id_personnel INTEGER NOT NULL,
            is_responsable BOOLEAN,
            display_link BOOLEAN NOT NULL DEFAULT 1
        );
    `).run();
    console.log("Correspondances table set up")
}
function fillDatabase(db, organes, personnel, documents) {
    fillPersonnel(db, personnel);
    fillOrganes(db, organes);
    fillDocuments(db, documents);
    console.log("Tables populated")
}

function fillPersonnel(db, personnel) {
    const personnelInsert = db.prepare(`
        INSERT INTO personnel VALUES(
            null,
            @prenom,
            @nom,
            @image
        )`
    )

    for (const personne of personnel.default) {
        personnelInsert.run(personne)
    }
    console.log("Personnel table populated")
}

function fillOrganes(db, organes) {
    const organesInsert = db.prepare(`
        INSERT INTO organes VALUES(
            null,
            @nom,
            @short,
            @alias,
            @resp_titre,
            @description,
            @image,
            true
        )`
    )
    for (const organe of organes.default) {
        organesInsert.run(organe)
    }
    console.log("Organes table populated")
}

function fillDocuments(db, documents) {
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
    for (document of documents.default) {
        documentsInsert.run(document)
    }
    console.log("Documents table populated")
}

function fillCorrespondancesTable(db, rosters) {

    rosters.default.forEach((organe) => {
        const organeAlias = organe.organeAlias
        const membresNomsArray = organe.membresNomsArray
        const organeId = db.prepare(`SELECT id FROM organes WHERE alias=?`).get(organeAlias)
        const ResponsableIdArray = organe.responsableId
        const membresId = membresNomsArray.map((membreNom) => {
            return db.prepare(`SELECT id FROM personnel WHERE nom=?`).get(membreNom)
        })

        membresId.forEach((id_personnel) => {
            isResponsable = ResponsableIdArray ? (ResponsableIdArray.includes(id_personnel.id) ? 1 : 0) : 0;
            const args = { id_organe: organeId.id, id_personnel: id_personnel.id, is_responsable: isResponsable }
            db.prepare(`INSERT INTO correspondances VALUES(
            null,
            @id_organe,
            @id_personnel,
            @is_responsable,
            true
            )`).run(args)
        })
    })
    console.log("Correspondances table populated")
}

module.exports = {
    purgeDatabase, purgeCorrespondances, purgePersonnel, purgeDocuments, purgeOrganes, purgeTable,
    setUpDatabase, setUpPersonnel, setUpOrganes, setUpCorrespondances, setUpDocuments,
    fillDatabase, fillPersonnel, fillOrganes, fillDocuments, fillCorrespondancesTable
};
