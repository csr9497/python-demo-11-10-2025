import { Handler } from 'aws-lambda';
import * as mysql from 'mysql2/promise';
import * as fs from 'fs';

export const handler: Handler = async (event: any) => {
  // Evento puede tener 'sqlFilePath' o 'sqlString'
  let sql: string;
  if (event.sqlString) {
    sql = event.sqlString;
  } else if (event.sqlFilePath) {
    // Sólo posible si el archivo fue cargado a /tmp antes de la ejecución
    sql = fs.readFileSync(event.sqlFilePath, 'utf-8');
  } else {
    return { statusCode: 400, body: 'Debe proporcionar sqlFilePath o sqlString' };
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true, // permite varios statements en un solo exec
    });

    const [result] = await connection.query(sql);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    if (connection) await connection.end();
  }
};
