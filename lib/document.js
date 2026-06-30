import sql from 'better-sqlite3';
import path from 'path';
const db = sql(path.join(process.cwd(), 'databases', 'trombinoscope.db'));

export function getDocumentsFromOrganeId(id){
    return db.prepare(`
        SELECT * FROM DOCUMENTS
        WHERE id_organe=?
    `).all(id)
}