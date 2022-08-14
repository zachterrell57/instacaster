// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { page } = req.query;
  const pageNumber = Number(page);

  const data = await fetch('https://searchcaster.xyz/api/search?text=imgur&count=20&page=' + pageNumber)
    .then(res => res.json())

  res.json(data);
}
