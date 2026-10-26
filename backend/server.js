import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import contactRoute from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Basic abuse protection on the contact form — 5 messages per 15 minutes per IP.
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/contact', contactLimiter, contactRoute);

app.listen(PORT, () => {
  console.log(`Chris King Pro backend listening on http://localhost:${PORT}`);
});
