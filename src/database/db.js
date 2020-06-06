const sqlite = require('sqlite3').verbose()
const dbm = new sqlite.Database('./src/database/database.db')




// dbm.serialize(() => {
//     dbm.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             number TEXT, 
//             state TEXT,
//             city TEXT,
//             itens TEXT
//         );
//     `)

// })


module.exports = dbm;
