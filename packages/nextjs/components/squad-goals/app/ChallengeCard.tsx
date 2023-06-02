import React from "react";
import Link from "next/link";
import { BigNumber, ethers } from "ethers";

interface ChallengeCardProps {
  metadata?: {
    name: string;
    description: string;
    image: string;
  };
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

const ChallengeCard = ({ metadata, challenge, isOriginal, challengeId }: ChallengeCardProps) => {
  console.log(challenge);
  return (
    <div className="relative app-box-shadow bg-[#BBD4FA] rounded-2xl py-3 px-2">
      <div className="grid grid-cols-5 gap-3">
        {/* challenge image */}
        <div className="rounded-lg overflow-hidden col-span-2 flex flex-col justify-center items-center">
          <img
            src={metadata != undefined ? metadata.image : "/app/goal.png"}
            alt=""
            className="rounded-lg w-[90%] object-cover h-[80%]"
          />
        </div>
        {/* descriptions */}
        <div className="col-span-3">
          {/* duration  */}
          <div className="font-bold">{metadata != undefined ? metadata.name : "Loading..."}</div>
          {/* description */}
          <div className="text-xs font-medium">{metadata != undefined ? metadata.description : "Loading..."}</div>
          {/* stake amount + joining number */}
          <div className="mt-2 grid grid-cols-1 text-sm">
            <div className="font-semibold truncate pr-2">
              stake:{" "}
              {challenge != undefined
                ? Number(
                    ethers.utils.formatEther(challenge?.stakeAmount != null ? challenge?.stakeAmount : "0"),
                  ).toFixed(3)
                : 0}{" "}
              ETH
            </div>
            <div>
              {challenge != undefined ? challenge?.stakerCount?.toString() : 0}/
              {challenge != undefined ? challenge?.maxAmountOfStakers?.toString() : 0} spots filled
            </div>
          </div>
          {/* join and detail */}
          <div className="mt-3 flex items-center gap-3 text-sm">
            <Link href={isOriginal ? `/challenge/${challengeId}` : `/copies/${challengeId}`}>
              <div className="rounded-full bg-[#D1D1D1] px-3 py-0.5 cursor-pointer app-box-shadow">details</div>
            </Link>
          </div>
        </div>
        {/* tags */}
        <div className="px-3">
          {parseInt(challenge?.deadline?.toString()) <= Math.floor(Date.now() / 1000) ? (
            challenge?.onVoting == true ? (
              <span className="bg-green-100 text-pink-800 text-xs font-medium mr-1 px-1 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                voting
              </span>
            ) : (
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-1 px-1 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                Overdue
              </span>
            )
          ) : null}
          {isOriginal ? (
            <span className="bg-green-100 text-green-800 font-medium mr-1 px-1 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-xs">
              original
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
