import { ethers } from "hardhat";

async function main() {
  const blockNumber = await ethers.provider.getBlockNumber();
  const timestamp = (await ethers.provider.getBlock(blockNumber)).timestamp;
  await ethers.provider.send("evm_mine", [timestamp + 1 * 24 * 60 * 60]);
  console.log(timestamp);
  //   await ethers.provider.send("evm_mine", [newTimestampInSeconds]);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
