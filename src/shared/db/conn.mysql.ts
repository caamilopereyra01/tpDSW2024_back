import mysql from  'mysql2/promise'

export const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3382,
    user: process.env.MYSQL_ROOT_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || '12345',
    database: process.env.MYSQL_DATABASE || 'sysvol',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})