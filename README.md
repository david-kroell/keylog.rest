# keylog.rest
[![](https://images.microbadger.com/badges/version/davidkroell/keylog.rest.svg)](https://microbadger.com/images/davidkroell/keylog.rest "Get your own version badge on microbadger.com") [![](https://images.microbadger.com/badges/image/davidkroell/keylog.rest.svg)](https://microbadger.com/images/davidkroell/keylog.rest "Get your own image badge on microbadger.com")

REST-API Keylogger Webapplication in Node.js

Documentation can be found at <https://david-kroell.github.io/keylog.rest/> and in this file.

# Installation
## Running locally
### Dependencies
There is only one dependency, as npm gets installed with Node.js. But here is the 'complete' list:
* Node.js
* npm

Make sure you also install the database and the Node.js driver you want to use.
Available database systems:
* PostgresSQL
* MySQL
* MSSQL
* SQLite (nothing to install)

[Click here if you want to learn something about the necessary database drivers](http://docs.sequelizejs.com/manual/installation/getting-started.html#installation)

### Prepare the installation

* Get the code
```bash
git clone https://github.com/david-kroell/keylog.rest
```
* Install npm packages
```bash
cd keylog.rest && npm install
```
* Configure your installation

Copy ```config.example.js``` to ```config.js``` and move on with the [configuration section](#configuration).

* Run the application
```bash
npm start
```
Or make use of something like ```pm2```.

## Deployment using Docker
### Single Container
Do NOT use the following command to run the container, because there is some more to do...

```bash
docker run -d --name keylogger -p 3000:3000 kroelld/keylog.rest
```

First of all head onto [configuration](#configuration) and get your config file ready. 
You are also able to use your custom payloads.

```
docker run -d --name keylogger -p 3000:3000 \
    -v /path/to/payloads:/usr/src/app:ro \
    -v /path/to/config.js:/usr/src/app/config.js:ro \
    kroelld/keylog.rest
```
I assume you understand the command above, as if you are currently in the [Docker](https://www.docker.com/) section.

### Using microservices
Actually, there is no documentation for this, but you can take a look at [docker-compose.yml](docker-compose.yml)

TODO: Docs about docker (coming soon)

# Configuratoin
You can specify custom configuration using the ```config.example.js``` file. But make sure to copy it or rename it to ```config.js``` as it won´t work if you do not.

```
// config.js (from config.example.js)
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
```
The attributes specified in the ```payload``` section can be accessed in the payload scripts.
Example:
```
$a = "b"
{{ ip }}
echo $a
```
Such statement in the script results in rendering like:
```
$a = "b"
my ip or hostname
echo $a
```

The ```db``` section holds information about the database connection.

The ```api``` section holds information about the api and the keys for accessing it.

# Disclaimer
This whole software is provided for educational use only. The authors are not responsible for any misuse of the software. Performing any keylogging without permission from the owner of the computer system is illegal. Use at your own risk.
