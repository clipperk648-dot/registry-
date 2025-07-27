import mongoose from 'mongoose';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      status: 'Server is running',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
