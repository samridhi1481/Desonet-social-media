import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const BlockchainConnector = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        alert(`✅ Connected to: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
      } catch (error) {
        console.error('Connection failed:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          🔗 Connect Blockchain Wallet
        </button>
      ) : (
        <div style={{
          backgroundColor: '#D1FAE5',
          color: '#065F46',
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'inline-block',
          fontWeight: 'bold'
        }}>
          ✅ Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
        </div>
      )}
    </div>
  );
};

export default BlockchainConnector;