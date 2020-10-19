# Products_api_nodeJS

Introduction
------------

NodeJs API for Products React Demo Application

Configurations are stored in config/default.json file

**Install in your app directory, and edit the default config file.**

```js
{
"firebase": {
        "database-url": "https://firebase-project.firebaseio.com",
        "auth-domain": "firebaseproject.firebaseapp.com"
      },
    "api-default-port":3000


}

```


**prerequisites:**


1- Install nodemon package globally:

```shell
$ npm i -g nodemon
```

2- copy admin.json file to application root :

**Use configs in your code:**

```js
const config = require('config');
//...
const apiPortConfig = config.get('api-default-port');

```

`config.get()` will throw an exception for undefined keys to help catch typos and missing values.
Use `config.has()` to test if a configuration value is defined.


**Start your app server:**

```shell
$ nodemon index.js
```

Running in this configuration, the `port` and `dbName` elements of `dbConfig`
will come from the `default.json` file





