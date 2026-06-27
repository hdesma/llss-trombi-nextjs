import sql from 'better-sqlite3';
const db = sql('./databases/trombinoscope.db');

export function getMembreFromNom(nom) {
    let membre = db.prepare(`SELECT * FROM personnel WHERE nom=?`).get(nom);
    console.log(membre);
    return membre;
}

export function getOrganesFromMembreId(id) {
    let membres = db.prepare(`
        SELECT organes.* FROM correspondances 
        JOIN organes ON id_organe = organes.id
        WHERE id_personnel=? AND display_link = 1
    `).all(id);
    console.log(membres);
    return membres;
}