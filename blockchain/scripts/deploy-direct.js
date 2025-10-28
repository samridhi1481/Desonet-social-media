import { ethers } from "ethers";
import { readFileSync } from "fs";

async function main() {
  // Connect to local node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8546");
  const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
  
  // Get contract ABI and bytecode
  const artifact = JSON.parse(readFileSync("./artifacts/contracts/DeSoNet.sol/DeSoNet.json", "utf8"));
  
  // Deploy contract
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy();
  
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  
  console.log("✅ DeSoNet deployed to:", address);
}

main().catch(console.error);