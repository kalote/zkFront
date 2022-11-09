import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/like/
// BODY twittId id of the twitt, ethAddr addr of the user liking the twitt
// check if user already liked the twitt, then increment or decrement the like counter
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  const { twittId, ethAddr } = req.body;

  if (twittId === undefined) {
    return res.status(401);
  }

  try {
    const hasLiked = await prisma.holders_twitts.findFirst({
      where: {
        holder_id: ethAddr,
        twitt_id: twittId,
      },
    });

    // no object in DB
    // or object exist but not for like
    // upsert relation + increment
    if (!hasLiked || hasLiked?.like === 0) {
      await prisma.holders_twitts.upsert({
        create: {
          holder_id: ethAddr,
          twitt_id: twittId,
          like: 1,
        },
        update: {
          like: 1,
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
          like: { increment: 1 },
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
          like: 0,
        },
      });
      result = await prisma.twitt.update({
        where: {
          id: parseInt(twittId as string),
        },
        data: {
          like: { increment: -1 },
        },
      });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
