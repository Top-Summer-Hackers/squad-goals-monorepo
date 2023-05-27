import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const dChallengeImplementation = await deploy("ChallengeImplementation", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // const cChallengeImplementation = await hre.ethers.getContract("ChallengeImplementation");

  await deploy("SquadGoals", {
    from: deployer,
    args: [deployer, dChallengeImplementation.address],
    log: true,
    autoMine: true,
  });

  // CREATE SAMPLE CHALLENGE 1

  const cSquadGoals = await hre.ethers.getContract("SquadGoals");
  // 2592000 = 30 days
  let tx = await cSquadGoals.createChallenge(
    hre.ethers.utils.parseEther("0.001"),
    7,
    2592000,
    "Test Challenge 1",
    "TEST1",
    "ipfs://bafyreihstlkwjjb63mt54e5juerm3d5zvcnyimkhxvesqp2aden5ytqyuy/metadata.json",
  );
  await tx.wait();

  // CREATE SAMPLE CHALLENGE 2

  tx = await cSquadGoals.createChallenge(
    hre.ethers.utils.parseEther("0.01"),
    5,
    1592000,
    "Test Challenge 2",
    "TEST2",
    "ipfs://bafyreihstlkwjjb63mt54e5juerm3d5zvcnyimkhxvesqp2aden5ytqyuy/metadata.json",
  );
  await tx.wait();

  // CREATE MOCK FROM CHALLENGE 1
  tx = await cSquadGoals.createChallengeCopy(1);
  await tx.wait();

  // CREATE MOCK FROM CHALLENGE 2
  tx = await cSquadGoals.createChallengeCopy(2);
  await tx.wait();
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
