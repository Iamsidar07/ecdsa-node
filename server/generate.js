const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

function getExampleKeys(amount) {
  let i = 0;
  while (i < amount) {
    const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
    console.log("privateKey: ", privateKey);

    const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
    console.log("publicKey: ", publicKey);
    i++;
  }
}

getExampleKeys(3);
