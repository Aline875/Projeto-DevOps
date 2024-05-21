
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = 'http://backend:5000/api/data';
  if (req.method === 'GET') {
    try {
      const response = await axios.get(apiUrl);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post(apiUrl, req.body);
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error posting data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
