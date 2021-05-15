require('dotenv').config();

const path = require('path');

module.exports = {
    development: {
        sitename: 'Bagels & Bacon [Development]',
        data: {
            menu: path.join(__dirname, '../data/menu.json'),
            feedbacks: path.join(__dirname, '../data/feedback.json')
        },
        database: {
            dsn: process.env.DEVELOPMENT_DB_DSN,
        },
    },
    production: {
        sitename: 'Bagels & Bacon ',
        data: {
            menu: path.join(__dirname, '../data/menu.json'),
            feedbacks: path.join(__dirname, '../data/feedback.json')
        },
        database: {
            dsn: process.env.PRODUCTION_DB_DSN,
        },
    }
}