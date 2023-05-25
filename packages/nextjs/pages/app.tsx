import React from "react";
import Loading from "~~/components/squad-goals/Loading";
import { ChallengeCard, Search, SelectCategory } from "~~/components/squad-goals/app";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const App = () => {
  const { data: allChallenges, isLoading: isAllChallengesLoading } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getAllChallenges",
  });
  const { data: challengeCount, isLoading: isChallengeCountLoading } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "challengeCount",
  });

  console.log(allChallenges);
  return (
    <div className="max-w-[1980px] mx-auto w-[80%]">
      <div className="w-full">
        {/* background design */}
        <div>
          <svg
            className="fixed z-[-100] bottom-[50%] left-0"
            id="visual"
            viewBox="0 0 900 600"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ display: "block" }}
          >
            <rect x="0" y="0" width="900" height="600" fill="#ffffff"></rect>
            <path
              d="M0 458L25 463C50 468 100 478 150 496.5C200 515 250 542 300 537C350 532 400 495 450 466.2C500 437.3 550 416.7 600 423.7C650 430.7 700 465.3 750 484.7C800 504 850 508 875 510L900 512L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
              fill="#EEEEEE"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
          <div className="z-[-100] fixed bottom-0 left-0 w-full h-[50vh] bg-[#EEEEEE]"></div>
        </div>
        {/* open challenges title */}
        <div>
          {" "}
          <h3 className="text-3xl">Open Challenges</h3>
          {/* search + category */}
          <div className="grid grid-cols-2 mt-5">
            {/* search */}
            <div className="w-[80%]">
              <Search />
            </div>
            {/* category */}
            <div className="w-[80%]">
              <SelectCategory />
            </div>
          </div>
          {isAllChallengesLoading || isChallengeCountLoading ? (
            <div className="flex-center mx-auto mt-10">
              <Loading />
            </div>
          ) : (
            <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
              {allChallenges?.map((challenge, index) => {
                if (index < parseInt(challengeCount?.toString() || "") - 1) {
                  // original
                  return (
                    <ChallengeCard
                      challengeId={index + 1}
                      isOriginal={true}
                      challenge={challenge}
                      key={parseInt(challenge.deadline.toString()) + index}
                    />
                  );
                } else {
                  // cloned
                  return (
                    <ChallengeCard
                      challengeId={index + 1}
                      isOriginal={false}
                      challenge={challenge}
                      key={parseInt(challenge.deadline.toString()) + index}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* start a new challenge title */}
        <div>
          {" "}
          <h3 className="text-3xl">Start a new Challenge</h3>
          {/* search + category */}
          <div className="grid grid-cols-2 mt-5">
            {/* search */}
            <div className="w-[80%]">
              <Search />
            </div>
            {/* category */}
            <div className="w-[80%]">
              <SelectCategory />
            </div>
          </div>
          <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
            {/* <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard /> */}
          </div>
        </div>

        {/* leaderboard */}
        <div className="mb-10">
          {" "}
          <h3 className="text-3xl">Leaderboard</h3>
          <div className="flex flex-col gap-3">
            <div className="bg-[#BBD4FA] rounded-full px-6 py-0.5 w-full flex justify-between items-center app-box-shadow">
              <div className="font-semibold">0x3rwdf4twesf...234rf</div>
              <div>34</div>
            </div>
            <div className="bg-[#BBD4FA] rounded-full px-6 py-0.5 w-full flex justify-between items-center app-box-shadow">
              <div className="font-semibold">0x3rwdf4twesf...234rf</div>
              <div>34</div>
            </div>
            <div className="bg-[#BBD4FA] rounded-full px-6 py-0.5 w-full flex justify-between items-center app-box-shadow">
              <div className="font-semibold">0x3rwdf4twesf...234rf</div>
              <div>34</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
