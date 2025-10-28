import React, { useState, useEffect } from 'react';

const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "contentHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "PostCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_contentHash",
        "type": "string"
      }
    ],
    "name": "createPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_postId",
        "type": "uint256"
      }
    ],
    "name": "likePost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "postCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "posts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "contentHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "likes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "flags",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnector = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log('✅ Connected to currently selected account:', accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    setLoading(true);

    try {
      console.log('🔄 Connecting wallet...');
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      console.log('✅ Accounts received:', accounts);
      
      if (accounts && accounts.length > 0) {
        const connectedAccount = accounts[0];
        setAccount(connectedAccount);
        console.log('✅ Successfully connected to:', connectedAccount);
      }
      
    } catch (error: any) {
      console.error('❌ Connection error:', error);
      
      if (error.code === 4001) {
        alert('Connection rejected by user');
      } else {
        alert('Connection failed. Check console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    console.log('🔌 Wallet disconnected');
  };

  const createTestPost = async () => {
    if (window.ethereum && account) {
      setPostLoading(true);
      
      try {
        console.log('📝 Creating test post on local network...');
        
        const { ethers } = await import('ethers');
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        const contentHash = `QmTestPost_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        console.log('Sending transaction to local network...');
        
        // FIXED: Added gasLimit to bypass security
        const transaction = await contract.createPost(contentHash, {
          gasLimit: 50000
        });
        
        console.log('Transaction hash:', transaction.hash);
        
        const receipt = await transaction.wait();
        console.log('✅ Transaction confirmed:', receipt);
        
        alert('🎉 Post created successfully on local blockchain!');
        
      } catch (error: any) {
        console.error('❌ Error creating post:', error);
        
        if (error.code === 4001) {
          alert('❌ Transaction was rejected by user');
        } else if (error.message?.includes('insufficient funds')) {
          alert('❌ Not enough ETH for gas fees');
        } else if (error.message?.includes('user rejected')) {
          alert('❌ You rejected the transaction');
        } else {
          alert(`❌ Error: ${error.message || 'Failed to create post'}`);
        }
      } finally {
        setPostLoading(false);
      }
    } else {
      alert('Please connect your wallet first');
    }
  };

  if (account) {
    return (
      <div style={{ textAlign: 'center' as const }}>
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          color: '#155724',
          padding: '12px 16px',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
        
        <div style={{ gap: '8px', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={createTestPost}
            disabled={postLoading}
            style={{
              backgroundColor: postLoading ? '#6b7280' : '#6f42c1',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: postLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {postLoading ? 'Creating Post...' : 'Create Test Post'}
          </button>
          <button 
            onClick={disconnectWallet}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Disconnect
          </button>
        </div>
        
        <div style={{ 
          marginTop: '10px', 
          color: '#28a745', 
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          🚀 Connected to Local Hardhat Network
        </div>
        
        {postLoading && (
          <div style={{ 
            marginTop: '10px', 
            color: '#6f42c1', 
            fontSize: '12px'
          }}>
            ⏳ Transaction in progress... Check MetaMask
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' as const }}>
      <button 
        onClick={connectWallet}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#6b7280' : '#3b82f6',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnector;