//npm i inquirer@8.2.4
//npm i dotenv 
//npm init -y
//npm i express
//mysql -u root -p
//SOURCE schema.sql;
//SOURCE insert-schema.sql;
//SHOW databases;
//SHOW tables;
//node server.js
//gonna use insomnia
//npx sequelize-cli migration:generate --name add_name_to_users
//npm i startbootstrap-clean-blog
//npm i --save-dev nodemon



const path = require('path');
const express = require('express');
// const api = require('./controllers/api');
const exphbs = require("express-handlebars");
const session = require("express-session");

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({ });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    db: sequelize
};
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


