import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE !== 'false',
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are all required.' });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'That email address looks invalid.' });
  }

  const transporter = getTransporter();
  if (!transporter) {
    // No SMTP credentials configured yet — say so honestly instead of pretending to send.
    return res.status(503).json({
      ok: false,
      error: 'Email is not configured yet on the server. Fill in SMTP_* values in backend/.env (see .env.example).'
    });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || 'kuzojean80@gmail.com',
      replyTo: email,
      subject: `New message from ${name} (portfolio contact form)`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send contact email:', err.message);
    res.status(502).json({ ok: false, error: 'Could not send the message. Please try again shortly.' });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export default router;
