import { verifyUser } from "@zachterrell57/farcaster-auth";

export default async function verifySignature(req, res) {
  const username = req.body.username;
  const address = req.body.address;
  const verified = await verifyUser(username, address);
  res.status(200).send({
    verified: verified,
  });
}
