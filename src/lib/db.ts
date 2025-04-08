import mysql from 'mysql2/promise';

// MySQL bağlantı havuzu oluştur
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  /**
   * Veritabanından bağlantı alır
   */
  getConnection: async () => {
    return await pool.getConnection();
  },
  
  /**
   * SQL sorgusu çalıştırır ve sonuçları döndürür
   */
  query: async (sql: string, params?: any[]) => {
    return await pool.query(sql, params);
  },
  
  /**
   * Tekil bir sorgu çalıştırır ve ilk sonucu döndürür
   */
  queryOne: async (sql: string, params?: any[]) => {
    const [rows] = await pool.query(sql, params);
    const rowsArray = rows as any[];
    return rowsArray.length > 0 ? rowsArray[0] : null;
  }
};