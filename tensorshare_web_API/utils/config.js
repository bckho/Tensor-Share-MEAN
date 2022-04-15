const dbConnectionStringProd = process.env.DB_CONNECTION_PROD || null;

const jwtSecretKey = process.env.JWT_SECRET || null;

const saltRounds = parseInt(process.env.SALT_ROUNDS) || null;

module.exports = { dbConnectionStringProd, jwtSecretKey, saltRounds };
