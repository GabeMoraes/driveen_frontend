import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';


function App() {
  const [account, setAccount] = useState();
  
  async function loadAccounts() {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  useEffect(() => {
    loadAccounts();
  },[]);

  return (
    <div className="App">
      <p>
        {account}
      </p>
    </div>
  );
}

export default App;
