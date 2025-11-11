import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set. Please configure it in your deployment platform.');
}

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

let DataEntry;
try {
  DataEntry = mongoose.model('DataEntry');
} catch {
  DataEntry = mongoose.model('DataEntry', dataEntrySchema);
}

// Helper function to connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  return mongoose.connect(MONGODB_URI);
};

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
    await connectToDatabase();

    if (req.method === 'GET') {
      // Get all data entries
      const dataEntries = await DataEntry.find().sort({ date_checked: -1 });
      res.status(200).json(dataEntries);
    } else if (req.method === 'POST') {
      // Create new data entry
      const { card_number, balance } = req.body;
      const dataEntry = new DataEntry({
        input_data: card_number,
        balance,
      });
      const savedDataEntry = await dataEntry.save();
      res.status(201).json(savedDataEntry);
    } else if (req.method === 'DELETE') {
      // Delete all data entries
      await DataEntry.deleteMany({});
      res.status(200).json({ message: 'All data entries deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
