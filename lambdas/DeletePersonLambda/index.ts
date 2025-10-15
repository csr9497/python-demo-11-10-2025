import { APIGatewayProxyHandler } from 'aws-lambda';
import * as mysql from 'mysql2/promise';

type PersonType = {
  first_name: string,
  last_name: string,
  address: string,
  document_type: number,
  document_value?: number | string,
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

    let person_id = event?.pathParameters?.id
    if (!person_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Identificador erroneo" }),
      };
    }

    let find_person_sql = `SELECT * FROM ${table} WHERE person_id = ?`;
    const [find_person] = await connection.execute(find_person_sql, [person_id]);
    if ((find_person as any[]).length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Persona no encontrada" }),
      };
    }

    let SQL_EXCUTE = `DELETE FROM ${table}  WHERE person_id = ?`
    const [rows] = await connection.execute(
      SQL_EXCUTE, [person_id]
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