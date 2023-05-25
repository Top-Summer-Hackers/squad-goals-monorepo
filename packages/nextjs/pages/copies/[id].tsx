import React from "react";
import { useRouter } from "next/router";

// import { ChallengeCard } from "~~/components/squad-goals/app";

const ChallengeCopyDetail = () => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);

  return (
    <div className="relative max-w-[1980px] mx-auto w-[80%]">
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
              <div>stake: 0.05 ETH</div>
              <div>duration: 30 days</div>
            </div>
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

export default ChallengeCopyDetail;
