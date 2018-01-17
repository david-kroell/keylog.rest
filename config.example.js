var path = require("path");

module.exports = {
    payload: {
        ip: "1.2.3.4",
        port: "5000"
    },
    db: {
        database: "",
        username: "",
        password: "",
        dialect: "sqlite",
        sqliteFile: path.join(__dirname, "db.sqlite")
    },
    api: {
        keys: [
            'secret',
            ''
        ]
    }
}