const sql = requires('better-sqlite3');
import _ORGANS from "./_ORGANS";
import _PERSONNEL from "./_PERSONNEL";

async function setUpDatabase() {
    const db = sql('trombinoscope')
    db.prepare(`
        CREATE TABLE IF NOT EXISTS personnel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prenom TEXT NOT NULL,
        nom TEXT NOT NULL,
        image TEXT NOT NULL
        )
        `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS organes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        alias TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
        )
        `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS correspondance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_organe TEXT NOT NULL,
        id_personnel TEXT NOT NULL,
        )
        `).run();

};


async function setUpAdminDatabase() {

};