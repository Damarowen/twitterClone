const {
    Pool
} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'twitter_clone',
    password: 'root',
    port: 5432
});

module.exports = pool;