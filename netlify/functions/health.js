import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const result = await pool.query('SELECT 1');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'Server is running',
        database: result ? 'connected' : 'disconnected',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'Server is running',
        database: 'disconnected',
        error: error.message,
      }),
    };
  }
};
