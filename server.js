const express = require('express');
const mysql = require('mysql');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const dotenv = require('dotenv');
const mysql2 = require('mysql2');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/your-route', (req, res) => {
  // Use the connection pool for executing queries
  pool.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Query results:', results);
    res.json(results);
  });
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
