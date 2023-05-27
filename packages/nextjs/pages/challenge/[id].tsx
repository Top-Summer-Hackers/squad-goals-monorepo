import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChallengeImplementation } from "../../constants/abi.json";
import { RewardNFT, SquadGoals } from "../../constants/abi.json";
import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { toast } from "react-hot-toast";
import * as wagmi from "wagmi";
import { Loading, PopUp, PreviewChallengeCard } from "~~/components/squad-goals";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ChallengeDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: signer } = wagmi.useSigner();
  const provider = wagmi.useProvider();
  const { address } = wagmi.useAccount();

  const [challengeDetail, setChallengeDetail] = useState<{
    stakeAmount: string;
    deadline: string;
    maxAmountOfStakers: string;
    onVoting: string;
    stakerCount: string;
    votedCount: string;
  }>({
    stakeAmount: "0",
    deadline: "0",
    maxAmountOfStakers: "0",
    onVoting: "false",
    stakerCount: "0",
    votedCount: "0",
  });
  const [copyChallenges, setCopyChallenges] = useState<
    {
      addr: string;
      stakeAmount: string;
      maxAmountOfStakers: string;
      stakerCount: string;
      isCompleted: string;
    }[]
  >([]);
  const [isGeneratingCopiesContractLoading, setIsGeneratingCopiesContractLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isJoinChallengeLoading, setIsJoinChallengeLoading] = useState(false);
  const [challengeMetadata, setChallengeMetadata] = useState<{ name: string; description: string; image: string }>({
    description: "",
    image: "",
    name: "",
  });
  const [copiesChallengeMetadata, setCopiesChallengeMetadata] = useState<
    { name: string; description: string; image: string }[]
  >([]);

  // get the challenge address and nft address
  const {
    data: challenge,
    isSuccess: readChallengeDataSuccess,
    isLoading: readChallengeDataLoading,
  } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getChallenge",
    args: [id as unknown as BigNumber],
    onSuccess: async challengesData => {
      const contract = new ethers.Contract((challengesData as any)[1], RewardNFT, signer || provider);
      const tokenURI = await contract?.tokenURI(1);
      const metadataURL = "https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "");
      console.log(metadataURL);
      await fetch(metadataURL)
        .then(response => response.json())
        .then(data =>
          setChallengeMetadata({
            ...data,
            image: "https://ipfs.io/ipfs/" + data.image.replace("ipfs://", ""),
          }),
        );
    },
  });

  // get the challenge copies
  const {
    data: challengeCopies,
    isLoading: challengeCopiesLoading,
    status: challengeCopiesStatus,
  } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getCopiesOfChallenge",
    args: [id as unknown as BigNumber],
  });

  const { writeAsync: createCopy, isLoading: createCopyLoading } = useScaffoldContractWrite({
    contractName: "SquadGoals",
    functionName: "createChallengeCopy",
    args: [id as unknown as BigNumber],
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    // The callback function to execute when the transaction is confirmed.

    onSuccess: async (data: any) => {
      const { transactionHash } = await data.wait();
      console.log(transactionHash);
    },
  });

  const { data: deployedSquadGoalContract } = useDeployedContractInfo("SquadGoals");

  // create a proxy contract instance
  const challengeProxyContract = wagmi.useContract({
    address: (challenge && challenge[0]) || "",
    abi: ChallengeImplementation,
    signerOrProvider: signer || provider,
  });

  // fetch the stake amount of this challenge
  async function getChallengeDetail() {
    if (readChallengeDataSuccess) {
      const stakeAmount = await challengeProxyContract?.stakeAmount();
      let stakeAmountStr;
      if (stakeAmount) {
        stakeAmountStr = ethers.utils.formatEther(stakeAmount);
      }
      const deadline = String(await challengeProxyContract?.deadline()).toString();
      const maxAmountOfStakers = String(await challengeProxyContract?.maxAmountOfStakers()).toString();
      const onVoting = String(await challengeProxyContract?.onVoting()).toString();
      const stakerCount = String(await challengeProxyContract?.stakerCount()).toString();
      const votedCount = String(await challengeProxyContract?.votedCount()).toString();
      // const stakers = String(await challengeProxyContract?.getStakers()).split(",");

      setChallengeDetail({
        stakeAmount: stakeAmountStr ?? "",
        deadline,
        maxAmountOfStakers,
        onVoting,
        stakerCount,
        votedCount,
      });
    }
  }

  // generate the contract of copied challenges
  async function generateContract() {
    setIsGeneratingCopiesContractLoading(true);
    const contracts: {
      addr: string;
      stakeAmount: string;
      maxAmountOfStakers: string;
      stakerCount: string;
      isCompleted: string;
    }[] = [];
    const copiesTokenURIs: { name: string; description: string; image: string }[] = [];
    challengeCopies?.map(async challengeAddr => {
      const contract = new ethers.Contract(challengeAddr, ChallengeImplementation, signer || provider);
      const stakeAmount = await contract?.stakeAmount();
      let stakeAmountStr;
      if (stakeAmount) {
        stakeAmountStr = ethers.utils.formatEther(stakeAmount);
      }
      // const deadline = String(await challengeProxyContract?.deadline()).toString();
      const maxAmountOfStakers = String(await contract?.maxAmountOfStakers()).toString();
      const stakerCount = String(await contract?.stakerCount()).toString();
      const isCompleted = String(await contract?.completed()).toString();

      const squadGoalContract = new ethers.Contract(
        deployedSquadGoalContract?.address || "",
        SquadGoals,
        signer || provider,
      );
      const nftAddress = await squadGoalContract?.challengeCopyNFT(challengeAddr);
      const rewardNftContract = new ethers.Contract(nftAddress, RewardNFT, signer || provider);
      const tokenURI = await rewardNftContract?.tokenURI(1);
      const metadataURL = "https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "");

      await fetch(metadataURL)
        .then(response => response.json())
        .then(data =>
          copiesTokenURIs.push({
            ...data,
            image: "https://ipfs.io/ipfs/" + data.image.replace("ipfs://", ""),
          }),
        );
      contracts.push({
        addr: challengeAddr,
        stakeAmount: stakeAmountStr ?? "",
        maxAmountOfStakers,
        stakerCount,
        isCompleted,
      });
    });
    setCopiesChallengeMetadata(copiesTokenURIs);
    setCopyChallenges(contracts);
    setIsGeneratingCopiesContractLoading(false);
  }

  useEffect(() => {
    getChallengeDetail();
  }, [challenge, readChallengeDataSuccess]);

  useEffect(() => {
    generateContract();
  }, [challengeCopiesStatus]);

  // create a copy of this challenge
  function handleCreateCopy() {
    createCopy();
  }

  // join a challenge
  async function handleJoinChallenge(name: string) {
    if (address != undefined) {
      setIsJoinChallengeLoading(true);
      try {
        const result = await challengeProxyContract?.join(name, {
          value: ethers.utils.parseEther(challengeDetail.stakeAmount).toString(),
          gasLimit: 1000000,
        });
        const { transactionHash } = result.wait();
        console.log(transactionHash);
        toast.success("Transaction success!");
      } catch (error) {
        console.log(error);
        toast.error("Transaction failed!");
      }
      setIsJoinChallengeLoading(false);
      setIsOpen(false);
    } else {
      toast.error("Please connect your wallet!");
    }
  }

  return (
    <div className="relative max-w-[1980px] mx-auto w-[80%]">
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} joinChallenge={handleJoinChallenge} />
      {readChallengeDataLoading ? (
        <div className="flex-center mt-5">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="z-[-100] w-screen h-screen fixed left-0 right-0">
            <img src="/bgvector.png" alt="" className="w-full h-full" />
          </div>
          <div className="w-full">
            {/* challenge detail title*/}
            <h3 className="text-3xl">{challengeMetadata.name}</h3>
            {/* description + duration + stake */}
            <div className="mt-5 flex flex-col lg:flex-row items-center gap-5">
              <div className="w-64">
                <img
                  src={challengeMetadata.image != "" ? challengeMetadata.image : "/app/goal.png"}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between gap-2 lg:gap-10">
                <p className="text-lg text-center lg:text-left">{challengeMetadata.description}</p>
                <div className="mx-auto text-center lg:text-left lg:mx-0">
                  <div>stake: {challengeDetail.stakeAmount} ETH</div>
                  <div>
                    duration: {moment.unix(Number(challengeDetail.deadline)).diff(moment(), "days")} days remaining
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setIsOpen(true)}
                    className="w-fit rounded-full bg-[#FFB1AC] px-4 py-1 cursor-pointer app-box-shadow"
                  >
                    {isJoinChallengeLoading ? "Loading..." : "Join"}
                  </div>
                  <div
                    onClick={handleCreateCopy}
                    className="w-fit rounded-full bg-[#FFB1AC] px-4 py-1 cursor-pointer app-box-shadow"
                  >
                    {createCopyLoading ? "Loading..." : "Create a copy"}
                  </div>
                </div>
              </div>
            </div>
            {isGeneratingCopiesContractLoading ? (
              <div className="flex-center mt-20">
                <Loading />
              </div>
            ) : (
              <div>
                {/* squad participants */}
                <div className="mt-10 w-full">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>squad participants: </th>
                        <th>completed challenge yes / no</th>
                        <th>yes / no</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>0x7b86F576669f8d20a8244dABEFc65b31d7dEB3f2</th>
                        <th>3 / 3</th>
                        <th className="flex-center gap-5 border-none mt-1">
                          <div className="flex items-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-black bg-gray-100 border-gray-300"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              checked
                              id="default-radio-2"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                            />
                          </div>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  {/* verify button */}
                  <div className="mt-5 flex justify-end">
                    <button className="bg-[#FFB1AC] rounded-full px-3 py-0.5 app-box-shadow">Verify</button>
                  </div>
                </div>

                {/* Open Challenges */}
                <div className="mt-5">
                  <div className="text-lg">Open Challenges</div>
                  {challengeCopiesLoading ? (
                    <Loading />
                  ) : (
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {copyChallenges.map((challenge, index) =>
                        challenge.isCompleted == "false" ? (
                          <PreviewChallengeCard
                            metadata={copiesChallengeMetadata[index]}
                            key={challenge.addr + index}
                            addr={challenge.addr}
                            maxAmountOfStakers={challenge.maxAmountOfStakers}
                            stakeAmount={challenge.stakeAmount}
                            stakerCount={challenge.stakerCount}
                          />
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
                {/* Completed Challenges */}
                <div className="my-5">
                  <div className="text-lg">Completed Challenges</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {copyChallenges.map((challenge, index) =>
                      challenge.isCompleted == "true" ? (
                        <PreviewChallengeCard
                          metadata={copiesChallengeMetadata[index]}
                          key={challenge.addr}
                          addr={challenge.addr}
                          maxAmountOfStakers={challenge.maxAmountOfStakers}
                          stakeAmount={challenge.stakeAmount}
                          stakerCount={challenge.stakerCount}
                        />
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
