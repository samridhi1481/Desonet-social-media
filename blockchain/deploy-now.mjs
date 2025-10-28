import hre from "hardhat";

async function main() {
  console.log("🚀 Deploying DeSoNet contract...");
  const DeSoNet = await hre.ethers.getContractFactory("DeSoNet");
  const desoNet = await DeSoNet.deploy();
  await desoNet.waitForDeployment();
  const address = await desoNet.getAddress();
  console.log("✅ CONTRACT DEPLOYED SUCCESSFULLY!");
  console.log("📍 Contract Address:", address);
  console.log("🔗 Copy this address to your frontend!");
}

main().catch(console.error);