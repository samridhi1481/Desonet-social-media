const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Starting DeSoNet deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Get the contract factory
  const DeSoNet = await ethers.getContractFactory("DeSoNet");
  console.log("📄 Deploying DeSoNet contract...");

  // Deploy the contract
  const desoNet = await DeSoNet.deploy();
  
  // Wait for deployment to complete
  await desoNet.waitForDeployment();
  
  // Get the contract address
  const contractAddress = await desoNet.getAddress();
  
  console.log("✅ DeSoNet deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("🔗 Transaction hash:", desoNet.deploymentTransaction().hash);
  
  // Save the contract address to a file for frontend use
  const contractInfo = {
    address: contractAddress,
    deployedAt: new Date().toISOString(),
    network: "localhost"
  };
  fs.writeFileSync('deployment-info.json', JSON.stringify(contractInfo, null, 2));
  console.log("💾 Deployment info saved to deployment-info.json");
}

main()
  .then(() => {
    console.log("🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });