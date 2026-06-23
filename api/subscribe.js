// Serverless function (runs on Vercel) that adds an email to MailerLite.
// The API key is read from a private Vercel Environment Variable (MAILERLITE_API_KEY)
// and is NEVER exposed in the website's public code.

// MailerLite group that free-book subscribers are added to ("Website Sign Ups").
const GROUP_ID = '182653680464430778';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'method_not_allowed' });
    }

    const apiKey = (process.env.MAILERLITE_API_KEY || '').trim();
    if (!apiKey) {
      return res.status(500).json({ error: 'not_configured' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'invalid_email' });
    }

    // Guard against a hung outbound request so the function always responds.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    let r;
    try {
      r = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, groups: [GROUP_ID] }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const detail = await r.text();

    // 200/201 = success (also when the subscriber already exists).
    if (r.ok) {
      return res.status(200).json({ ok: true });
    }

    return res.status(502).json({
      error: 'subscribe_failed',
      upstream_status: r.status,
      upstream_detail: detail.slice(0, 400),
    });
  } catch (err) {
    return res.status(500).json({
      error: 'exception',
      name: String((err && err.name) || ''),
      message: String((err && err.message) || err),
    });
  }
}
