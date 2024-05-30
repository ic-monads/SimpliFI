import prisma from '@/app/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  id: string;
  title: string;
  date: Date;
}

// POST /api/evidence
// Required fields in body: title
// Optional fields in body: content
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method == "POST") {
    const { title, date } = req.body;

    const result = await prisma.evidence.create({
      data: {
        title: title,
        date: date,
      },
    });
    res.status(200).json(result);
  }
}