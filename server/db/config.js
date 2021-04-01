const {
    Pool
} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'twiter_clone',
    password: 'root',
    port: 5432
});


exports.dbQuery = async (text) => {
   
        try {
            await pool.connect()
            const res = await pool.query(text);
            console.log('executed query')
            return res;
        } catch (err) {
            console.log(err);
        }
    }

