import got from "got";
import { ethers } from "ethers";

//function that parses a string and looks for the signature between the square brackets
function parseSignature(message) {
  const sigStart = message.indexOf("[");
  if (sigStart === -1) {
    return null;
  }
  const sigEnd = message.indexOf("]", sigStart);
  if (sigEnd === -1) {
    return null;
  }
  return message.substring(sigStart + 1, sigEnd);
}

//function that recovers the public key from a signature
async function recoverPublicKey(signature) {
  const messageHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("This is a message")
  );
  const recoveredAddress = ethers.utils.recoverAddress(messageHash, signature);
  return recoveredAddress;
}

//function that compares two public keys and returns true if they are the same
function comparePublicKeys(recoveredPublicKey, senderPublicKey) {
  return recoveredPublicKey === senderPublicKey;
}

export default async function verifySignature(req, res) {
  //This is the address of FarcasterAuth
  const farcasterAddress = "0x156d39254FAb024802da070F4D51CACa1ed48A17";
  const farcasterUsername = "farcasterauth";
  const notificationsApi = `https://api.farcaster.xyz/indexer/notifications/${farcasterAddress}?per_page=10`;

  const senderUsername = req.body.username;
  const senderPublicKey = req.body.publicKey;

  let checks = 0;
  let verified = false;

  // check mentions and verify signature every 5 seconds
  checkAndVerifyMentions();
  const interval = setInterval(() => {
    checkAndVerifyMentions();
  }, 5 * 1000);

  // Check for mentions
  async function checkAndVerifyMentions() {
    console.log("Checking for mentions...");
    if (checks >= 4) {
      console.log("-_-");
      try {
        clearInterval(interval);
        res.status(200).send({ verified: verified });
      } catch (error) {
        clearInterval(interval);
        res.status(error.status || 500).end(error.message);
      }
    }

    const apiRes = await got(notificationsApi);
    const notifs = JSON.parse(apiRes.body);

    //Only check the mentions from given username
    const mentions = notifs.filter(
      (notif) =>
        notif.type === "mention" &&
        notif.data.castText.includes(`@${farcasterUsername}`) &&
        notif.user.username === senderUsername
    );

    // Authentication message hasn't been sent yet, so keep looking
    if (mentions.length === 0) {
      checks++;
      return;
    }

    // Iterate over all mentions and store the one with the highest timestamp
    let latest = mentions[0];
    mentions.forEach((mention) => {
      if (mention.timestamp > latest.timestamp) latest = mention;
    });

    //Verify signature
    const signature = parseSignature(latest.data.castText);
    const recoveredPublicKey = await recoverPublicKey(signature);

    if (comparePublicKeys(senderPublicKey, recoveredPublicKey)) verified = true;

    try {
      clearInterval(interval);
      res.status(200).send({ verified: verified });
    } catch (error) {
      clearInterval(interval);
      res.status(error.status || 500).end(error.message);
    }
  }
}
