import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/twitt
// create a new twitt
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentAccount, content, hash, tokenId } = req.body;

  const result = await prisma.twitt.create({
    data: {
      content: content,
      authorAddr: currentAccount,
      hash: hash,
      tokenId: tokenId
    },
  });
  res.json(result);
}
