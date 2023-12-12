import './App.css'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Login from './components/Login';
import Connected from './components/Connected';


function App() {
  const [ provider, setProvider] = useState(null);
  const [ account, setAccount ] = useState(null);
  const [ isConnected, setIsConnected ] = useState(false);

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  });

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);
        setAccount(address)
      } 
      catch (error) {
        console.error(error)
      }
    } else {
      console.error("MetaMask is not detected in the browser.")
    }
  }

  return (
    <div className="app">
      {isConnected ? (<Connected account = {account} />) : (<Login connectToMetaMask = { connectToMetaMask } />)}
    </div>
  )
}

export default App;