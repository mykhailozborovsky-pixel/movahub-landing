// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Парсимо JSON
app.use(express.json());

// Віддаємо статику з кореня (index.html, favicon.svg тощо)
app.use(express.static(__dirname, { extensions: ['html'] }));

// Проста валідація емейлу
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// API: зберегти email у збиранку
app.post('/api/subscribe', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim();
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
    const line = `${new Date().toISOString()}\t${email}\t${ip}\n`;
    const filePath = path.join(__dirname, 'gathered_emails.txt');

    fs.appendFile(filePath, line, (err) => {
      if (err) {
        console.error('Write error:', err);
        return res.status(500).json({ ok: false, error: 'Write failed' });
      }
      return res.json({ ok: true });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Фолбек щоб віддати index.html для кореня
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MovaHub running on http://localhost:${PORT}`);
});
