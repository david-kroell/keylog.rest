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
        "url": "https://david-kroell.github.io/keylog.rest/"
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
        "url": "https://david-kroell.github.io/keylog.rest/payloads/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/payloads/{PayloadName}",
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
        "url": "https://david-kroell.github.io/keylog.rest/payloads/{PayloadName}"
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
        "url": "https://david-kroell.github.io/keylog.rest/api/victims"
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
        "url": "https://david-kroell.github.io/keylog.rest/api/victims/:id"
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
