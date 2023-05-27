import React from "react";

interface PreviewChallengeCardProps {
  addr: string;
  maxAmountOfStakers: string;
  stakeAmount: string;
  stakerCount: string;
  metadata: {
    name: string;
    description: string;
    image: string;
  };
}

const PreviewChallengeCard = ({
  metadata,
  maxAmountOfStakers,
  stakeAmount,
  stakerCount,
}: PreviewChallengeCardProps) => {
  return (
    <div className="relative app-box-shadow bg-[#BBD4FA] rounded-2xl py-3 px-2">
      <div className="grid grid-cols-5 gap-3">
        {/* challenge image */}
        <div className="col-span-2 flex flex-col justify-center items-center">
          <img
            src={metadata.image != undefined ? metadata.image : "/app/goal.png"}
            alt=""
            className="w-[90%] rounded-lg"
          />
        </div>
        {/* descriptions */}
        <div className="col-span-3">
          {/* duration  */}
          <div className="font-bold">{metadata.name}</div>
          {/* description */}
          <div className="text-xs font-medium">{metadata.description}</div>
          {/* stake amount + joining number */}
          <div className="mt-2 grid grid-cols-1 text-sm">
            <div className="font-semibold truncate pr-2">stake: {stakeAmount != undefined ? stakeAmount : 0} ETH</div>
            <div>
              {stakerCount != undefined ? stakerCount : 0}/{maxAmountOfStakers != undefined ? maxAmountOfStakers : 0}{" "}
              spots filled
            </div>
          </div>
          {/* join and detail */}
          {/* <div className="mt-1 flex items-center gap-3 text-sm">
            <div className="rounded-full bg-[#D1D1D1] px-3 py-0.5 cursor-pointer app-box-shadow">View Details</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PreviewChallengeCard;
