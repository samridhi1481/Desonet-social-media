import { useState } from 'react';
import BlockchainConnector from './components/BlockchainConnector';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'You (0xf39f...2266)',
      content: '🚀 Welcome to DeSoNet! First decentralized social media platform on blockchain!',
      time: '2 minutes ago',
      likes: 3,
      comments: 1,
      txHash: '0x1234...abcd'
    },
    {
      id: 2,
      author: 'CryptoEnthusiast',
      content: '💫 Just joined this amazing network! No central control, true freedom of speech!',
      time: '15 minutes ago', 
      likes: 8,
      comments: 2,
      txHash: '0x5678...efgh'
    }
  ]);
  
  const [newPost, setNewPost] = useState('');

  const createPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You (0xf39f...2266)',
        content: newPost,
        time: 'Just now', 
        likes: 0,
        comments: 0,
        txHash: `0x${Math.random().toString(16).slice(2, 10)}...`
      };
      setPosts([post, ...posts]);
      setNewPost('');
      alert('✅ Post created successfully!');
    }
  };

  const likePost = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = (id: number) => {
    const comment = prompt('Enter your comment:');
    if (comment) {
      setPosts(posts.map(post => 
        post.id === id ? { ...post, comments: post.comments + 1 } : post
      ));
      alert('💬 Comment added!');
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>DeSoNet</h1>
        <p style={{ margin: '5px 0', fontSize: '1.1rem' }}>Decentralized Social Media</p>
        
        {/* Blockchain Connector */}
        <BlockchainConnector />
      </div>

      {/* Create Post Section */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '25px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Create New Post</h3>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening on the blockchain? Share your thoughts..."
          style={{ 
            width: '100%', 
            height: '100px', 
            padding: '15px', 
            border: '2px solid #e1e5e9',
            borderRadius: '10px',
            fontSize: '16px',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>
            {280 - newPost.length} characters remaining
          </span>
          <button
            onClick={createPost}
            disabled={!newPost.trim()}
            style={{
              background: !newPost.trim() ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '25px',
              cursor: !newPost.trim() ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            🚀 Create Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>Recent Posts</h3>
        {posts.map(post => (
          <div key={post.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e1e5e9',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            {/* Author Info */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ fontWeight: 'bold', color: '#667eea', fontSize: '16px' }}>
                {post.author}
              </div>
              <div style={{ color: '#888', fontSize: '14px' }}>
                {post.time}
              </div>
            </div>
            
            {/* Post Content */}
            <div style={{ 
              margin: '15px 0', 
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333'
            }}>
              {post.content}
            </div>

            {/* Transaction Hash (Mock) */}
            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              backgroundColor: '#f3f4f6',
              padding: '5px 10px',
              borderRadius: '4px',
              marginBottom: '10px',
              fontFamily: 'monospace'
            }}>
              TX: {post.txHash}
            </div>
            
            {/* Post Actions */}
            <div style={{ 
              display: 'flex', 
              gap: '25px',
              color: '#666',
              fontSize: '14px',
              borderTop: '1px solid #f0f0f0',
              paddingTop: '15px'
            }}>
              <button 
                onClick={() => likePost(post.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
              >
                ❤️ Like ({post.likes})
              </button>
              <button 
                onClick={() => addComment(post.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
              >
                💬 Comment ({post.comments})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;