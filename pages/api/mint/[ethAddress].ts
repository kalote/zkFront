// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  ERC20_CONTRACT_ABI,
  ERC20_CONTRACT_ADDRESS,
} from "../../../lib/constants";

type Data = {
  success: boolean;
};

// GET /api/mint/[ethAddr]
// mint the initial amount of token to ethAddr
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { ethAddress } = req.query;
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NETWORK_URL
    );
    const wallet = new ethers.Wallet(<string>process.env.CONTRACT_PK);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(
      ERC20_CONTRACT_ADDRESS,
      ERC20_CONTRACT_ABI,
      signer
    );
    const mint = await contract.mint(
      ethAddress,
      ethers.utils.parseEther(<string>process.env.MINT_ON_CREATE_AMOUNT)
    );
    const minted = await mint.wait();

    res.status(200).json({ success: minted.status === 1 ? true : false });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
