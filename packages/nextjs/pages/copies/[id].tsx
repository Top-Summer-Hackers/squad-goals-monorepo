import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChallengeImplementation, RewardNFT } from "../../constants/abi.json";
import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { toast } from "react-hot-toast";
import * as wagmi from "wagmi";
import { Loading, PopUp } from "~~/components/squad-goals";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ChallengeCopyDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { address } = wagmi.useAccount();
  const { data: signer } = wagmi.useSigner();
  const provider = wagmi.useProvider();

  // get the challenge copy address and nft address
  const {
    data: challengeCopy,
    isLoading: challengeCopyLoading,
    isSuccess: readChallengeDataSuccess,
  } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getChallengeCopy",
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

  const [challengeMetadata, setChallengeMetadata] = useState<{ name: string; description: string; image: string }>({
    description: "",
    image: "",
    name: "",
  });
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
  const [isJoinChallengeLoading, setIsJoinChallengeLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // create a proxy contract instance
  const challengeProxyContract = wagmi.useContract({
    address: (challengeCopy && challengeCopy[0]) || "",
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

  useEffect(() => {
    getChallengeDetail();
  }, [challengeCopy]);

  return (
    <div className="relative max-w-[1980px] mx-auto w-[80%]">
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} joinChallenge={handleJoinChallenge} />
      {challengeCopyLoading ? (
        <div className="mx-auto mt-10 flex-center">
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
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-between gap-2 lg:gap-10">
                <p className="text-lg text-center lg:text-left">{challengeMetadata.description}</p>
                <div className="mx-auto text-center lg:text-left lg:mx-0">
                  <div>stake: {challengeDetail.stakeAmount} ETH</div>
                  <div>
                    {" "}
                    duration: {moment.unix(Number(challengeDetail.deadline)).diff(moment(), "days")} days remaining
                  </div>
                </div>
                <div
                  onClick={() => setIsOpen(true)}
                  className="w-fit rounded-full bg-[#FFB1AC] px-4 py-1 cursor-pointer app-box-shadow"
                >
                  {isJoinChallengeLoading ? "Loading..." : "Join"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCopyDetail;
