const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 