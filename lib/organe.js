import sql from 'better-sqlite3';
import xss from 'xss';
import path from 'path';
const db = sql(path.join(process.cwd(), 'databases', 'trombinoscope.db'));

export function getAllOrganes() {
    let all = db.prepare(`SELECT * FROM organes`).all();
    // console.log(all);
    return all
}

export function getAllDisplayOrganes() {
    let data = db.prepare(`SELECT * FROM organes WHERE display_organe = true`).all();
    console.log(data);
    return data;
}

export function getOrganeFromAlias(alias) {
    console.log(alias);
    let data = db.prepare(`SELECT * FROM organes WHERE alias=?`).get(alias);
    // console.log(data);
    return data;
}


export function getMembresFromOrganeId(id) {
    console.log(id);
    let data = db.prepare(`
        SELECT personnel.* FROM correspondances 
        JOIN personnel ON id_personnel = personnel.id
        WHERE id_organe=?
    `).all(id);
    // console.log(data);
    return data;
}

export function getResponsable(id) {
    return db.prepare(`
        SELECT personnel.* FROM correspondances 
        JOIN personnel ON id_personnel = personnel.id
        WHERE id_organe=? AND is_Responsable = 1
    `).all(id);
}
//Déprécié, on ne stocke plus le Responsable dans l'organe
// export function editOrganeResponsable(Responsable, id) {
//     if (typeof (Responsable) === "string") {
//         Responsable = xss(Responsable)
//     }
//     db.prepare(`
//         UPDATE organes
//         SET Responsable = ?
//         WHERE id = ?
//     `).run(Responsable, id)
// }


//TODO
//Add people, remove people, modify people
//Same with organs
//Add people and remove people to organs