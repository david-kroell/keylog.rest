# keylog.rest
REST-API Keylogger Webapplication in Node.js

Documentation can be found at <https://david-kroell.github.io/keylog.rest/>

# Configuratoin
You can specify custom configuration using the ```config.js``` file.

```
module.exports = {
    payload: {
        ip: "my ip or hostname",
        port: "5000",
        key: "value"
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
# Deployment in Docker
## Single Container
Use the following command to run the container

```
docker run -d --name keylogger -p 3000:3000 kroelld/keylog.rest
```

You can also map custom payloads and configuration into the container

```
docker run -d --name keylogger -p 3000:3000 \
    -v /path/to/payloads:/usr/src/app:ro \
    -v /path/to/config.js:/usr/src/app/config.js:ro \
    kroelld/keylog.rest
```
