## Intall nodejs using npm

    npm install npm@latest -g

## Initialize a project

    mkdir node-rest-shop

    cd node-rest-shop

    npm init

    npm install --save express

## Install nodemon (so we don't have to run node server.js each time we made changes to code)

    npm install --save-dev nodemon

    then, edit packages.json and add under script:
        "script": {
            ...
            "start": "nodemon server.js"
        }

## Install package morgan to maintain logging

    npm install --save morgan

## Install body-parser to look at the content of the request

    npm install --save body-parser

## Use MongoQB Atlas (free tier)

    hurricanemark@gmail.com / markn123$
    markn/markn123$

## Let's jump in

    1.  add file server.js
        
        ```
        const http = require('http');

        const app = require('./app');

        const port = process.env.PORT || 5009;

        const server = http.createServer(app);

        server.listen(port)
        ```
        

    2.  add file app.js
        ```
        const express = require('express');
        const app = express();

        app.use(( req, res, next ) => {
            res.status(200).json({
                message: 'It works!'
            });
        });

        module.exports = app;
        ```


## Git

git remote add origin https://github.com/hurricanemark/node-rest-fullstack.git

git push -u origin master
        


