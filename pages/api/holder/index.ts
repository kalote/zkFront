import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/holder
// create a new holder
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { addr } = req.body;

  const result = await prisma.holder.create({
    data: {
      addr,
    },
  });
  res.json(result);
}
