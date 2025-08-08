// api/proxy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const backendUrl = 'http://composeemailbackend-env.eba-try5qipy.eu-north-1.elasticbeanstalk.com/api/email/generate';

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // forward any other headers if needed
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text(); // or .json() if backend returns JSON
    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed' });
  }
}
