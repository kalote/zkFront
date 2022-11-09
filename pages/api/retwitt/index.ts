import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/retwitt/
// BODY twittId id of the twitt, ethAddr addr of the user retwitting the twitt
// check if user already retwitted the twitt, then increment or decrement the retwitt counter
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  const { twittId, ethAddr } = req.body;

  if (twittId === undefined) {
    return res.status(401);
  }

  const hasRetwitted = await prisma.holders_twitts.findFirst({
    where: {
      holder_id: ethAddr,
      twitt_id: twittId,
    },
  });

  // no object in DB
  // or object exist but not for retwitt
  // upsert relation + increment
  if (!hasRetwitted || hasRetwitted.retwitt === 0) {
    await prisma.holders_twitts.upsert({
      create: {
        holder_id: ethAddr,
        twitt_id: twittId,
        retwitt: 1,
      },
      update: {
        retwitt: 1,
      },
      where: {
        holder_id_twitt_id: {
          holder_id: ethAddr,
          twitt_id: twittId,
        },
      },
    });

    result = await prisma.twitt.update({
      where: {
        id: parseInt(twittId as string),
      },
      data: {
        retwitt: { increment: 1 },
      },
    });
    // object exists in DB
  } else {
    await prisma.holders_twitts.update({
      where: {
        holder_id_twitt_id: {
          holder_id: ethAddr,
          twitt_id: twittId,
        },
      },
      data: {
        retwitt: 0,
      },
    });
    result = await prisma.twitt.update({
      where: {
        id: parseInt(twittId as string),
      },
      data: {
        retwitt: { increment: -1 },
      },
    });
  }

  res.json(result);
}
