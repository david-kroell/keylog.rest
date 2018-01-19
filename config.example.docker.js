var path = require("path");

module.exports = {
    payload: {
        ip: "1.2.3.4",
        port: "5000"
    },
    db: {
        host: "mysql",
        database: "keylogger",
        username: "keylog_user",
        password: "secret",
        dialect: "mysql",
        sqliteFile: path.join(__dirname, "db.sqlite")
    },
    api: {
        keys: [
            'secret',
            ''
        ]
    }
}