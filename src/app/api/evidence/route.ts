import prisma from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET() {
  const evs = await prisma.evidence.findMany();
  return new Response(JSON.stringify(evs), { status: 200 });
}

export async function POST(req: NextRequest) {
  const { title, date, fileUrl } = await req.json();

  const result = await prisma.evidence.create({
    data: {
      title,
      date,
      fileUrl
    },
  });

  return new Response(JSON.stringify(result), { status: 200});
}