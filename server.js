const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'your-jawsdb-hostname',
  port: 'your-jawsdb-port',
  user: 'your-jawsdb-username',
  password: 'your-jawsdb-password',
  database: 'your-jawsdb-database-name'
});
require('./routes/htmlRoutes')(app);

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

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to JawsDB:', err);
    return;
  }
  console.log('Connected to JawsDB MySQL database!');
  connection.release();
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
