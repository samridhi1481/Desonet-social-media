import React, { useState, useEffect } from 'react';

const SocialFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');

  // Mock data - we'll connect to blockchain later
  const mockPosts = [
    {
      id: 1,
      author: '0xf39f...2266',
      content: 'Welcome to DeSoNet! 🚀 First decentralized social media!',
      timestamp: Date.now(),
      likes: 5,
      comments: 2
    },
    {
      id: 2, 
      author: '0x7099...79C8',
      content: 'Just posted my first message on blockchain! So cool! 💫',
      timestamp: Date.now() - 3600000,
      likes: 12,
      comments: 4
    },
    {
      id: 3,
      author: '0x3c44...93bc', 
      content: 'No central authority, no censorship! This is freedom! ✨',
      timestamp: Date.now() - 7200000,
      likes: 8,
      comments: 1
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You (0xf39f...2266)',
        content: newPost,
        timestamp: Date.now(),
        likes: 0,
        comments: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
      alert('✅ Post created successfully! (On blockchain in next step)');
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#6f42c1', margin: '0' }}>DeSoNet</h1>
        <p style={{ color: '#666', margin: '5px 0' }}>Decentralized Social Media</p>
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724',
          padding: '8px 12px',
          borderRadius: '20px',
          display: 'inline-block',
          fontSize: '14px'
        }}>
          ✅ Connected: 0xf39f...2266
        </div>
      </div>
      
      {/* Create Post */}
      <div style={{ 
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening on blockchain? 🌟"
          style={{
            width: '100%',
            height: '80px',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            marginBottom: '12px',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>
            {newPost.length}/280 characters
          </span>
          <button
            onClick={handleCreatePost}
            disabled={!newPost.trim()}
            style={{
              backgroundColor: newPost.trim() ? '#6f42c1' : '#ccc',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '20px',
              cursor: newPost.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 'bold'
            }}
          >
            Post to Blockchain
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div>
        {posts.map(post => (
          <div key={post.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {/* Author */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <div style={{ fontWeight: 'bold', color: '#6f42c1' }}>
                {post.author}
              </div>
              <div style={{ color: '#666', fontSize: '12px' }}>
                {new Date(post.timestamp).toLocaleTimeString()}
              </div>
            </div>
            
            {/* Content */}
            <div style={{ 
              margin: '12px 0', 
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              {post.content}
            </div>
            
            {/* Actions */}
            <div style={{ 
              display: 'flex', 
              gap: '20px',
              color: '#666',
              fontSize: '14px',
              borderTop: '1px solid #f0f0f0',
              paddingTop: '12px'
            }}>
              <button 
                onClick={() => handleLike(post.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                ❤️ Like ({post.likes})
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                💬 Comment ({post.comments})
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                🔄 Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        color: '#666',
        fontSize: '12px'
      }}>
        Powered by Blockchain • All posts stored on decentralized network
      </div>
    </div>
  );
};

export default SocialFeed;