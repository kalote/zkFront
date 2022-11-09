import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  isHolder: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { ethAddress } = req.query;
  if (ethAddress === undefined) {
    return res.status(401);
  }
  const isHolder = await prisma.holder.count({
    where: {
      addr: ethAddress as string,
    },
  });

  res.status(200).json({ isHolder: isHolder === 1 ? true : false });
};

export default handler;
