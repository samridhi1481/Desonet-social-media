const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");
  const signer = await provider.getSigner();
  
  const factory = new ethers.ContractFactory(
    [
      "function createPost(string memory _contentHash) external",
      "function likePost(uint256 _postId) external",
      "event PostCreated(uint256 id, address author, string contentHash, uint256 timestamp)"
    ],
    await fetch("/artifacts/contracts/DeSoNet.sol/DeSoNet.json").then(r => r.json()).then(a => a.bytecode),
    signer
  );
  
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
}

main();