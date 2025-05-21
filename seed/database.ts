import * as mysql from 'mysql2';

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3300,
  user: 'root',
  password: 'secret',
  database: 'e-commerce'
});