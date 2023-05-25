import React from "react";
import Link from "next/link";

const ChallengeCard = () => {
  return (
    <div className="app-box-shadow bg-[#BBD4FA] rounded-2xl py-3 px-2">
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
            <div className="font-semibold">stake: 0.5 ETH</div>
            <div>2/7 spots filled</div>
          </div>
          {/* join and detail */}
          <div className="mt-1 flex items-center gap-3 text-sm">
            <div className="rounded-full bg-[#FFB1AC] px-3 py-0.5 cursor-pointer app-box-shadow">join</div>
            <Link href={"/challenge/1"}>
              <div className="rounded-full bg-[#D1D1D1] px-3 py-0.5 cursor-pointer app-box-shadow">details</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
