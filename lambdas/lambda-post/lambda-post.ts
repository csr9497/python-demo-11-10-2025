// handler-create-person.ts
import { APIGatewayProxyHandler } from "aws-lambda";
import mysql from "mysql2/promise";

interface PersonInput {
    nombre: string;
    apellidos: string;
    correo_electronico: string;
    documento_identidad: string;
    tipo_documento_identidad: string;
}

function validate(data: PersonInput): string[] {
    const errors: string[] = [];
    if (!data.nombre) errors.push("El nombre es obligatorio.");
    if (!data.apellidos) errors.push("Los apellidos son obligatorios.");
    if (!data.correo_electronico || !/^[^@]+@[^@]+\.[^@]+$/.test(data.correo_electronico))
        errors.push("El correo electrónico no es válido.");
    if (!data.documento_identidad) errors.push("El documento de identidad es obligatorio.");
    if (!data.tipo_documento_identidad) errors.push("El tipo de documento es obligatorio.");
    return errors;
}

export const handler: APIGatewayProxyHandler = async (event : any, _context : any) => {
    let body: PersonInput;
    try {
        body = JSON.parse(event.body || "{}");
    } catch (_) {
        return { statusCode: 400, body: "JSON malformado", headers: { "Content-Type": "application/json" } };
    }

    const errores = validate(body);
    if (errores.length > 0) {
        return {
            statusCode: 422,
            body: JSON.stringify({ errores }),
            headers: { "Content-Type": "application/json" }
        };
    }

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    await connection.execute(
        `INSERT INTO persons (nombre, apellidos, correo_electronico, documento_identidad, tipo_documento_identidad)
         VALUES (?, ?, ?, ?, ?)`,
        [
            body.nombre,
            body.apellidos,
            body.correo_electronico,
            body.documento_identidad,
            body.tipo_documento_identidad,
        ]
    );
    await connection.end();

    return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Persona creada correctamente" }),
        headers: { "Content-Type": "application/json" }
    };
};
