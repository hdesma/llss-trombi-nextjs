import sql from 'better-sqlite3';
import xss from 'xss';
const db = sql('./databases/trombinoscope.db');

export function getAllOrganes(){
     return db.prepare(`SELECT * FROM organes`).all();
}

export function getAllDisplayOrganes(){
     return db.prepare(`SELECT * FROM organes WHERE display_organe = true`).all();
}

export function getOrganeFromAlias(alias) {
    return db.prepare(`SELECT * FROM organes WHERE alias=?`).get(alias);
}


export function getMembresFromOrganeId(id) {
    return db.prepare(`
        SELECT personnel.* FROM correspondances 
        JOIN personnel ON id_personnel = personnel.id
        WHERE id_organe=?
    `).all(id);
}

export function getChef(id){
return db.prepare(`
        SELECT personnel.* FROM correspondances 
        JOIN personnel ON id_personnel = personnel.id
        WHERE id_organe=? AND is_chef = 1
    `).all(id);
}
//Déprécié, on ne stocke plus le chef dans l'organe
// export function editOrganeChef(chef, id) {
//     if (typeof (chef) === "string") {
//         chef = xss(chef)
//     }
//     db.prepare(`
//         UPDATE organes
//         SET chef = ?
//         WHERE id = ?
//     `).run(chef, id)
// }


//TODO
//Add people, remove people, modify people
//Same with organs
//Add people and remove people to organs