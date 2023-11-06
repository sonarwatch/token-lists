const { getMint } = require("@solana/spl-token");
const { PublicKey } = require("@solana/web3.js");
const sleep = require("../sleep");

const tokenPID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const token2022PID = new PublicKey(
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
);

module.exports = async function getSolanaMint(connection, mint) {
  const pubkey = new PublicKey(mint);
  const mintResponse = await getMint(
    connection,
    pubkey,
    undefined,
    tokenPID
  ).catch((e) => null);
  if (mintResponse !== null) return mintResponse;
  const mint2022Response = await getMint(
    connection,
    pubkey,
    undefined,
    token2022PID
  ).catch((e) => null);
  if (mint2022Response !== null) return mint2022Response;
  return null;
};
