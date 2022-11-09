import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const re = new RegExp(/^0x[a-fA-F0-9]{40}$/g);

// POST /api/holder
// create a new holder
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { addr } = req.body;

  if (!re.test(addr)) {
    res.status(401).send({ message: "wrong address" });
  }
  const result = await prisma.holder.create({
    data: {
      addr,
    },
  });
  res.json(result);
}
