// handler-get-persons.ts
import { APIGatewayProxyHandler } from "aws-lambda";
import mysql from "mysql2/promise";

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const [rows] = await connection.query("SELECT * FROM persons");
    await connection.end();

    return {
        statusCode: 200,
        body: JSON.stringify(rows),
        headers: { "Content-Type": "application/json" }
    };
};
