import React, { useEffect } from 'react';
import WalletConnector from './WalletConnector';

function App() {
  useEffect(() => {
    // Clear storage only - no ethereum code
    console.log('Clearing cache...');
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ebf4ff 0%, #f5f3ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center' as const }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          DeSoNet - Decentralized Social Media
        </h1>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '2rem',
          fontSize: '1.125rem'
        }}>
          Welcome to your decentralized social platform!
        </p>
        <WalletConnector />
      </div>
    </div>
  );
}

export default App;