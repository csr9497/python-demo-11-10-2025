import { APIGatewayProxyHandler } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

export const handler: APIGatewayProxyHandler = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    });

    const [rows] = await connection.execute('SELECT NOW() AS now;');
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (connection) await connection.end();
  }
};