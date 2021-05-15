require('dotenv').config();

const path = require('path');

module.exports = {
    development: {
        sitename: 'Bagels & Bacon [Development]',
        database: {
            dsn: process.env.DEVELOPMENT_DB_DSN,
        },
    },
    production: {
        sitename: 'Bagels & Bacon ',
        database: {
            dsn: process.env.PRODUCTION_DB_DSN,
        },
    }
}