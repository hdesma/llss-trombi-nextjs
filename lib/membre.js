import sql from 'better-sqlite3';
const db = sql('./databases/trombinoscope.db');

export function getMembreFromNom(nom) {
    return db.prepare(`SELECT * FROM personnel WHERE nom=?`).get(nom);
}

export function getOrganesFromMembreId(id) {
    return db.prepare(`
        SELECT organes.* FROM correspondances 
        JOIN organes ON id_organe = organes.id
        WHERE id_personnel=? AND display_link = 1
    `).all(id);
}