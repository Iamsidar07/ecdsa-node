const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0208492c9a97954d0dcfac9ad3c5060a2b2210186ad6508672d6787c94c5f7955c": 100,
  "03c78adfadf80394273ea208adcda7b94d17d49a4b40eae86f1390ebf01b761653": 50,
  "02abfa41e5aa6aa2df2bc7cb334e66958336dfa8d1ba9d4160f5d55baf9742fc5f": 75,
};

app.get("/balance/:privateKey", (req, res) => {
  const { privateKey } = req.params;
  const address = toHex(secp.secp256k1.getPublicKey(privateKey));
  console.log("publicKey: ", address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, recipient, amount, msg } = req.body;
  const { r, s, recovery } = signature;
  const sig = new secp.secp256k1.Signature(BigInt(r), BigInt(s), recovery);
  const msgHash = keccak256(utf8ToBytes(msg));
  const sender = sig.recoverPublicKey(msgHash).toHex();
  console.log(`Sent ${amount}$ to ${recipient} from ${sender}`);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
