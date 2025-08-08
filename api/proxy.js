export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const backendResponse = await fetch(
      'http://composeemailbackend-env.eba-try5qipy.eu-north-1.elasticbeanstalk.com/api/email/generate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const textData = await backendResponse.text();

    try {
      const data = JSON.parse(textData);
      res.status(200).json(data);
    } catch {
      res.status(200).send(textData);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
