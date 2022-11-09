import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const re = new RegExp(/^0x[a-fA-F0-9]{40}$/g);

// POST /api/twitt
// create a new twitt
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentAccount, content } = req.body;

  if (!re.test(currentAccount)) {
    res.status(401).send({ message: "wrong address" });
  }
  const result = await prisma.twitt.create({
    data: {
      content: content,
      authorAddr: currentAccount,
    },
  });
  res.json(result);
}
