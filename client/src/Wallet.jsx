import server from "./server";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setAddress(address);
    setPrivateKey(privateKey);
    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${privateKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <h2>example keys</h2>
      <p className="balance">
        privateKey:
        cd4d922119cf3c6b69fd598a36628118286ddbe620fb7d59f7d4dceb39da05a1 <br />
        publicKey:
        0208492c9a97954d0dcfac9ad3c5060a2b2210186ad6508672d6787c94c5f7955c{" "}
        <br />
        privateKey:
        51aebbfa12b4089d77073142f5a1acbcc591c183d28259f802e11405dbb04b61 <br />
        publicKey:
        03c78adfadf80394273ea208adcda7b94d17d49a4b40eae86f1390ebf01b761653{" "}
        <br />
        privateKey:
        f8c8bc6feb3ecd8d3561e04cbadf6377263a1b3e2f69efcaf45abc9dcb2fe792 <br />
        publicKey:
        02abfa41e5aa6aa2df2bc7cb334e66958336dfa8d1ba9d4160f5d55baf9742fc5f{" "}
        <br />
      </p>
      <label>
        Private key
        <input
          placeholder="Type an private key, for example: 01"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Private Key: {privateKey.slice(0, 20)}...</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
