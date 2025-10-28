// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DeSoNet {
    struct Post {
        uint256 id;
        address author;
        string contentHash;
        uint256 timestamp;
        uint256 likes;
        uint256 flags;
    }

    uint256 public postCount;
    mapping(uint256 => Post) public posts;
    
    event PostCreated(uint256 id, address author, string contentHash, uint256 timestamp);

    function createPost(string memory _contentHash) external {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _contentHash, block.timestamp, 0, 0);
        emit PostCreated(postCount, msg.sender, _contentHash, block.timestamp);
    }

    function likePost(uint256 _postId) external {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        posts[_postId].likes++;
    }
}