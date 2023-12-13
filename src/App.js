import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';


function App() {
  // setup metamask 
  const web3 = new Web3(window.ethereum);
  
  const [account, setAccount] = useState();
  const [company, setCompany] = useState();

  // create contract instance
  const abi = require('./abis/Rent.json');
  const contract = new web3.eth.Contract(abi,'0x5FbDB2315678afecb367f032d93F642f64180aa3');
  
  async function loadAccounts() {
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadCompany() {
    const companyAddress = await contract.methods.getCompany().call();
    setCompany(companyAddress);
  }

  return (
    <div className="App">
      <header className='App-header'>
        <p> Active Metamask account: {account} </p>
        <p> Company: {company} </p>
        <button onClick={loadAccounts}> Load accounts </button>
        <button onClick={loadCompany}> Load company </button>
      </header>
    </div>
  );
}

export default App;
