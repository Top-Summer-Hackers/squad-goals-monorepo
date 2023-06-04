import { ethers } from "hardhat";

async function main() {
  const blockNumber = await ethers.provider.getBlockNumber();
  const timestamp = (await ethers.provider.getBlock(blockNumber)).timestamp;
  const nDays = 1; // TODO CHANGE THIS VALUE
  await ethers.provider.send("evm_mine", [timestamp + nDays * 24 * 60 * 60]);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
