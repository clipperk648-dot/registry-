import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

let initialized = false;

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

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (!initialized) {
      await initializeDatabase();
      initialized = true;
    }

    if (event.httpMethod === 'GET') {
      const result = await pool.query(
        'SELECT id, input_data, balance, date_checked FROM data_entries ORDER BY date_checked DESC'
      );
      const dataEntries = result.rows.map(row => ({
        _id: row.id,
        input_data: row.input_data,
        balance: row.balance,
        date_checked: row.date_checked,
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(dataEntries),
      };
    } else if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { card_number, balance } = body;

      if (!card_number || balance === undefined) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'card_number and balance are required' }),
        };
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

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(dataEntry),
      };
    } else if (event.httpMethod === 'DELETE') {
      await pool.query('DELETE FROM data_entries');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'All data entries deleted successfully' }),
      };
    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
