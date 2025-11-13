import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS data_entries (
        id SERIAL PRIMARY KEY,
        input_data VARCHAR(255) NOT NULL,
        balance DECIMAL(10, 2) NOT NULL,
        date_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Initialize on first request
let initialized = false;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (!initialized) {
      await initializeDatabase();
      initialized = true;
    }

    if (req.method === 'GET') {
      // Get all data entries
      const result = await pool.query(
        'SELECT id, input_data, balance, date_checked FROM data_entries ORDER BY date_checked DESC'
      );
      const dataEntries = result.rows.map(row => ({
        _id: row.id,
        input_data: row.input_data,
        balance: row.balance,
        date_checked: row.date_checked,
      }));
      res.status(200).json(dataEntries);
    } else if (req.method === 'POST') {
      // Create new data entry
      const { card_number, balance } = req.body;
      
      if (!card_number || balance === undefined) {
        return res.status(400).json({ error: 'card_number and balance are required' });
      }

      const result = await pool.query(
        'INSERT INTO data_entries (input_data, balance) VALUES ($1, $2) RETURNING id, input_data, balance, date_checked',
        [card_number, balance]
      );

      const savedEntry = result.rows[0];
      const dataEntry = {
        _id: savedEntry.id,
        input_data: savedEntry.input_data,
        balance: savedEntry.balance,
        date_checked: savedEntry.date_checked,
      };

      res.status(201).json(dataEntry);
    } else if (req.method === 'DELETE') {
      // Delete all data entries
      await pool.query('DELETE FROM data_entries');
      res.status(200).json({ message: 'All data entries deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
