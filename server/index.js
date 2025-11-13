import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database
const initializeDatabase = async () => {
  try {
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS data_entries (
        id SERIAL PRIMARY KEY,
        input_data VARCHAR(255) NOT NULL,
        balance DECIMAL(10, 2) NOT NULL,
        date_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database table initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Initialize database on startup
initializeDatabase();

// Health check endpoint
pool.on('connect', () => {
  console.log('Connected to Neon PostgreSQL');
});

pool.on('error', (error) => {
  console.error('Unexpected error on idle client', error);
});

// Routes

// Get all data entries
app.get('/api/gift-cards', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, input_data, balance, date_checked FROM data_entries ORDER BY date_checked DESC'
    );
    const dataEntries = result.rows.map(row => ({
      _id: row.id,
      input_data: row.input_data,
      balance: row.balance,
      date_checked: row.date_checked,
    }));
    res.json(dataEntries);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new data entry
app.post('/api/gift-cards', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error creating data entry:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete all data entries
app.delete('/api/gift-cards', async (req, res) => {
  try {
    await pool.query('DELETE FROM data_entries');
    res.json({ message: 'All data entries deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.json({ 
      status: 'Server is running', 
      database: result ? 'connected' : 'disconnected' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Server is running', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});
