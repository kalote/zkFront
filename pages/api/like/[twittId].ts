import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/like/[twittId]
// increment the like counter
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { twittId } = req.query;
  if (twittId === undefined) {
    return res.status(401);
  }

  const result = prisma.twitt.update({
    where: {
      id: parseInt(twittId as string),
    },
    data: {
      like: { increment: 1 },
    },
  });

  res.json(result);
}
