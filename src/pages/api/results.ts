// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseResults, validateResults } from '../../services/results.service';
import { uploadEventRaceResultsYaml } from '../../services/s3.service';

type Result = {
  success: boolean;
};

type Error = {
  message: string;
  detail?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result | Error>
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed',
        detail: `HTTP method ${req.method} not allowed.`,
      });
    }

    if (req.headers['content-type'] !== 'application/yaml') {
      return res.status(415).json({
        message: 'Unsupported media type',
        detail: `Media type ${req.headers['content-type']} not supported. Supported media types: application/yaml, text/yaml`,
      });
    }

    if (req.headers['api-key'] !== process.env.API_KEY) {
      return res.status(401).json({
        message: 'Unauthorized',
        detail: `Wrong api key`,
      });
    }

    const validationResult = validateResults(req.body);
    if (!validationResult.valid) {
      return res.status(400).json({
        message: 'Results yaml validation failed',
        detail: validationResult.errors,
      });
    }

    const results = parseResults(req.body);

    await uploadEventRaceResultsYaml(
      `${results.date.toISOString()} ${results.name}`,
      req.body
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unhandled exception, POST /api/results route', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
