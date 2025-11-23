import sql from 'better-sqlite3';
const db = sql('./databases/trombinoscope.db');

export function getDocumentsFromOrganeId(id){
    return db.prepare(`
        SELECT * FROM DOCUMENTS
        WHERE id_organe=?
    `).all(id)
}