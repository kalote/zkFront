import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/twitt
// create a new twitt
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentAccount, content } = req.body;

  const result = await prisma.twitt.create({
    data: {
      content: content,
      authorAddr: currentAccount,
    },
  });
  res.json(result);
}
