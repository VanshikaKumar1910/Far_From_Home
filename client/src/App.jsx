import { useState, useEffect } from "react";
import abi from "./contracts/contracts/FFH.sol/FFH.json";
import { ethers } from "ethers";
import RegisterAsRefugee from "./components/RegisterAsRefugee";
import VerifyRefugee from "./components/VerifyRefugee";
import RejectRefugee from "./components/RejectRefugee";
import NonVerifiedRefugees from "./components/NonVerifiedRefugees";
import VerifiedRefugees from "./components/VerifiedRefugees";
import ActualBalance from "./components/ActualBalance";
import ContractBalance from "./components/ContractBalance";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [isGovernment, setIsGovernment] = useState(false);

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xfe3f3288e93983572b2E32419cE43e940A71eF74";
      const contractABI = abi.abi;
      try {
        // MetaMask part
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account[0]);

        // Ethers part
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Contract instance part
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);

        // Check if the connected account is the government
        const government = await contract.government();
        setIsGovernment(government.toLowerCase() == account[0]);
        console.log(
          "government",
          government.toLowerCase(),
          account[0],
          isGovernment
        );

        setState({ provider, signer, contract });
      } catch (err) {
        alert(err);
      }
    };
    template();
  }, []);
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" className="logo" />
        <h1>Far From Home</h1>
      </header>
      {/* <h2>App for refugees</h2> */}
      <p>Connected Account: {account}</p>

      <div className="homepage-content">
        <h3>Key Features and Benefits</h3>
        <ul>
          <li>Efficient Refugee Registration Process</li>
          <li>Government Verification System</li>
          <li>Transparent Refugee Tracking</li>
          <li>Secure Fund Management</li>
        </ul>
        <p>
          Welcome to Far From Home, your gateway to streamlined refugee
          assistance. Our platform offers a range of features designed to
          enhance the refugee experience and facilitate government oversight.
        </p>
        <p>
          Through our dapp, refugees can register securely and efficiently,
          allowing for quick and accurate verification by government
          authorities. The transparent tracking system ensures accountability
          and trust, while our secure fund management guarantees financial
          stability.
        </p>
        <p>
          Join us in making a difference. Together, we can build a community
          that supports and empowers refugees on their journey to a better
          future.
        </p>
      </div>

      {state.contract && !isGovernment && (
        <>
          <br />
          <RegisterAsRefugee contract={state.contract} />
          <br />
        </>
      )}

      {state.contract && isGovernment && (
        <>
          <div className="govAccount">
            <VerifyRefugee contract={state.contract} />
            <br />
            <RejectRefugee contract={state.contract} />
            <br />
          </div>
          <NonVerifiedRefugees contract={state.contract} />
          <br />
          <VerifiedRefugees contract={state.contract} />
          <br />
        </>
      )}

      <div className="actualBalance">
        {state.contract && (
          <>
            <br />
            <ActualBalance contract={state.contract} />
            <br />
            <ContractBalance contract={state.contract} />
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
