import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChallengeImplementation } from "../../constants/abi.json";
import { BigNumber, ethers } from "ethers";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as wagmi from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// import { ChallengeCard } from "~~/components/squad-goals/app";

const ChallengeDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: signer } = wagmi.useSigner();
  const provider = wagmi.useProvider();

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

  // get the challenge address and nft address
  const { data: challenge, isSuccess: readChallengeDataSuccess } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getCopiesOfChallenge",
    args: [id as unknown as BigNumber],
  });

  // get the challenge copies
  const { data: challengeCopies, isSuccess: readChallengeCopiesSuccess } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getCopiesOfChallenge",
    args: [id as unknown as BigNumber],
  });
  console.log(challengeCopies);
  console.log(readChallengeCopiesSuccess);

  const { writeAsync: createCopy, isLoading: createCopyLoading } = useScaffoldContractWrite({
    contractName: "SquadGoals",
    functionName: "createChallengeCopy",
    args: [id as unknown as BigNumber],
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    // The callback function to execute when the transaction is confirmed.

    onSuccess: async (data: any) => {
      const { transactionHash } = await data.wait();
      console.log(transactionHash);
      setTimeout(() => {
        toast.success("Transaction Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 100);
    },
  });

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
      const stakeAmountStr = ethers.utils.formatEther(stakeAmount);
      const deadline = String(await challengeProxyContract?.deadline()).toString();
      const maxAmountOfStakers = String(await challengeProxyContract?.maxAmountOfStakers()).toString();
      const onVoting = String(await challengeProxyContract?.onVoting()).toString();
      const stakerCount = String(await challengeProxyContract?.stakerCount()).toString();
      const votedCount = String(await challengeProxyContract?.votedCount()).toString();
      setChallengeDetail({
        stakeAmount: stakeAmountStr,
        deadline,
        maxAmountOfStakers,
        onVoting,
        stakerCount,
        votedCount,
      });
    }
  }

  async function generateContract() {
    challengeCopies?.map(challengeAddr => {
      const contract = new ethers.Contract(challengeAddr, ChallengeImplementation, signer || provider);
      console.log(contract);
    });
  }

  console.log(challengeDetail);

  useEffect(() => {
    getChallengeDetail();
    generateContract();
  }, [challenge]);

  // create a copy of this challenge
  function handleCreateCopy() {
    createCopy();
  }

  return (
    <div className="relative max-w-[1980px] mx-auto w-[80%]">
      <ToastContainer />
      <div className="z-[-100] w-screen h-screen fixed left-0 right-0">
        <img src="/bgvector.png" alt="" className="w-full h-full" />
      </div>
      <div className="w-full">
        {/* challenge detail title*/}
        <h3 className="text-3xl">30 Day Running Challenge</h3>
        {/* description + duration + stake */}
        <div className="mt-5 flex flex-col lg:flex-row items-center gap-5">
          <div className="w-64">
            <img src="/app/goal.png" alt="" className="w-full" />
          </div>
          <div className="flex flex-col justify-between gap-2 lg:gap-10">
            <p className="text-lg text-center lg:text-left">Run 4 miles or 45 minutes every other day for 30 days.</p>
            <div className="mx-auto text-center lg:text-left lg:mx-0">
              <div>stake: {challengeDetail.stakeAmount} ETH</div>
              <div>duration: {moment.unix(Number(challengeDetail.deadline)).diff(moment(), "days")} days remaining</div>
            </div>
            <div
              onClick={handleCreateCopy}
              className="w-fit rounded-full bg-[#FFB1AC] px-4 py-1 cursor-pointer app-box-shadow"
            >
              {createCopyLoading ? "Loading..." : "Create a copy"}
            </div>{" "}
          </div>
        </div>
        {/* Open Challenges */}
        <div className="mt-5">
          <div className="text-lg">Open Challenges</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard /> */}
          </div>
        </div>
        {/* Completed Challenges */}
        <div className="my-5">
          <div className="text-lg">Completed Challenges</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
