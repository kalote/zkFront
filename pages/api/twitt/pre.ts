import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import crypto from "crypto";

// POST /api/twitt
// create a new twitt
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentAccount, content } = req.body;
  var random = crypto.randomBytes(20).toString('hex');
  const hash = crypto.createHash('sha256').update(currentAccount+content+random).digest('hex');
  const tokenId = BigInt("0x" + hash);
  res.send(JSON.stringify(
  {
    currentAccount: currentAccount,
    content: content,
    random: random,
    hash: hash,
    tokenId: tokenId
  }, 
  (key, value) => typeof value === 'bigint' ? value.toString() : value // return everything else unchanged
));
}
