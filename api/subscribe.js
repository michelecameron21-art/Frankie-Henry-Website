// Serverless function (runs on Vercel) that adds an email to MailerLite.
// The API key is read from a private Vercel Environment Variable (MAILERLITE_API_KEY)
// and is NEVER exposed in the website's public code.

// MailerLite group that free-book subscribers are added to ("Website Sign Ups").
// To send book downloaders to their own group later, create a group in MailerLite
// and replace the id below.
const GROUP_ID = '182653680464430778';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'not_configured' });
  }

  // Body may arrive as a parsed object or a raw string depending on the request.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  try {
    const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, groups: [GROUP_ID] }),
    });

    // MailerLite returns 200/201 on success (and for an already-existing subscriber).
    if (r.ok) {
      return res.status(200).json({ ok: true });
    }

    // 422 = validation (e.g. malformed). Anything else = upstream issue.
    const detail = await r.text();
    console.error('MailerLite error', r.status, detail);
    return res.status(502).json({ error: 'subscribe_failed' });
  } catch (err) {
    console.error('subscribe exception', err);
    return res.status(502).json({ error: 'subscribe_failed' });
  }
}
