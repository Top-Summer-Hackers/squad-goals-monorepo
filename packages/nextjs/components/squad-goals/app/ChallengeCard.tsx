import React from "react";
import Link from "next/link";
import { BigNumber, ethers } from "ethers";

interface ChallengeCardProps {
  isOriginal: boolean;
  challengeId: number;
  challenge: {
    challenge: string;
    NFT: string;
    stakeAmount: BigNumber;
    maxAmountOfStakers: BigNumber;
    deadline: BigNumber;
    stakerCount: BigNumber;
    stakers: any;
    votedCount: BigNumber;
    completed: boolean;
    onVoting: boolean;
  };
}

const ChallengeCard = ({ challenge, isOriginal, challengeId }: ChallengeCardProps) => {
  return (
    <div className="relative app-box-shadow bg-[#BBD4FA] rounded-2xl py-3 px-2">
      {isOriginal ? (
        <div className="absolute right-2 bottom-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            original
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-5 gap-3">
        {/* challenge image */}
        <div className="col-span-2 flex flex-col justify-center items-center">
          <img src="/app/goal.png" alt="" className="w-[90%]" />
        </div>
        {/* descriptions */}
        <div className="col-span-3">
          {/* duration  */}
          <div className="font-bold">30 Day Running</div>
          {/* description */}
          <div className="text-xs font-medium">Run at least for 40 minutes or 4 miles every other day for 30 days.</div>
          {/* stake amount + joining number */}
          <div className="mt-2 grid grid-cols-2 text-sm">
            <div className="font-semibold">
              stake: {challenge != undefined ? ethers.utils.formatEther(challenge.stakeAmount || "").toString() : 0} ETH
            </div>
            <div>
              {challenge != undefined ? challenge.stakerCount.toString() : 0}/
              {challenge != undefined ? challenge.maxAmountOfStakers.toString() : 0} spots filled
            </div>
          </div>
          {/* join and detail */}
          <div className="mt-1 flex items-center gap-3 text-sm">
            <div className="rounded-full bg-[#FFB1AC] px-3 py-0.5 cursor-pointer app-box-shadow">join</div>
            <Link href={isOriginal ? `/challenge/${challengeId}` : `/copies/${challengeId}`}>
              <div className="rounded-full bg-[#D1D1D1] px-3 py-0.5 cursor-pointer app-box-shadow">details</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
