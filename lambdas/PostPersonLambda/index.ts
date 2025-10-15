import { APIGatewayProxyHandler } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

type PersonType = {
  first_name: string,
  last_name: number,
  address: string,
  document_type: number,
  document_value?: number,
  document_value_string?: string
}
export const handler: APIGatewayProxyHandler = async (event) => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      port: Number(process.env.DB_PORT) || 3306,
    });

    let table = process.env.DB_TABLE;
    if (!table || !/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("DB_TABLE entorno inválido");
    }

    let { first_name, last_name, address, document_type, document_value }: PersonType = JSON.parse(event.body || '{}');

    if (!first_name || !last_name || !address || !document_type || !document_value === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Campos requeridos: first_name,last_name,address,document_type,document_value" }),
      };
    }

    let SQL_FIELDS_EXCUTE = `first_name,last_name,address,document_type,document_value`;
    if (document_type === 2) {
      SQL_FIELDS_EXCUTE = SQL_FIELDS_EXCUTE.replace('document_value', 'document_value_string')
    }

    let SQL_EXCUTE = `INSERT INTO ${table} (${SQL_FIELDS_EXCUTE}) VALUES (?, ?, ?)`
    const [rows] = await connection.execute(
      SQL_EXCUTE, [first_name, last_name, address, document_type, document_value]
    );

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