import * as secp from "ethereum-cryptography/secp256k1";
import { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

const GenerateSignature = ({ privateKey }) => {
  const msg = "Hello";
  const [signature, setSignature] = useState({});

  const getSignature = () => {
    console.log(privateKey);
    const msgHash = keccak256(utf8ToBytes(msg));
    const sign = secp.secp256k1.sign(msgHash, privateKey);
    setSignature({
      r: sign.r.toString(),
      s: sign.s.toString(),
      recovery: sign.recovery,
    });
  };
  return (
    <div className="container wallet">
      <h1>Generate Signature</h1>
      <div onClick={getSignature} className="button">
        get signature
      </div>
      <div className="balance">
        <code>{JSON.stringify(signature)}</code>
      </div>
    </div>
  );
};

export default GenerateSignature;
