import { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import RegisterCarForm from './model/RegisterCarForm';


function App() {
  // setup metamask 
  const web3 = new Web3(window.ethereum);
  
  const [account, setAccount] = useState();

  // create contract instance
  const abi = require('./abis/Rent.json');
  const contract = new web3.eth.Contract(abi,'0x5FbDB2315678afecb367f032d93F642f64180aa3');
  
  async function loadAccounts() {
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadCar() {
    contract.methods.getCar("vag7267").call()
    .then(console.log);
  }

  async function loadDriver() {
    const accounts = await web3.eth.getAccounts();
    contract.methods.getDriver(accounts[0]).call()
    .then(console.log);
  }

  return (
    <div className="App">
      <header className='App-header'>
        <p> Active Metamask account: {account} </p>
        <button onClick={loadAccounts}> Load accounts </button>
        <RegisterCarForm activeAccount={account} contract={contract}/>
        <button onClick={loadCar}> check car </button>
        <button onClick={loadDriver}> check driver </button>
      </header>
    </div>
  );
}

export default App;
