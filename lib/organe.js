import sql from 'better-sqlite3';
import xss from 'xss';


const db = sql('./databases/trombinoscope.db');

export function getOrganeFromAlias(alias) {
    return db.prepare(`SELECT * FROM organes WHERE alias=?`).get(alias);
}

export function getMembreFromNom(nom) {
    return db.prepare(`SELECT * FROM personnel WHERE nom=?`).get(nom);
}

export function getMembresFromOrganeId(id) {
    return db.prepare(`SELECT personnel.* FROM correspondances 
        JOIN personnel ON id_personnel = personnel.id
        WHERE id_organe=?`).all(id);
}

export function getOrganesFromMembreId(id) {
    return db.prepare(`SELECT organes.* FROM correspondances 
        JOIN organes ON id_organe = organes.id
        WHERE id_personnel=?`).all(id);
}

export function editOrganeChef(value, id) {
    if (typeof (value) === "string") {
        value = xss(value)
    }
    db.prepare(`UPDATE organes
        SET chef = ?
        WHERE id = ?
        `).run(value, id)
}

//TODO
//Add people, remove people, modify people
//Same with organs
//Add people and remove people to organs