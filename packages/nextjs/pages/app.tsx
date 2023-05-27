import React, { useState } from "react";
import { RewardNFT } from "../constants/abi.json";
import { ethers } from "ethers";
import * as wagmi from "wagmi";
import Loading from "~~/components/squad-goals/Loading";
import { ChallengeCard, Search } from "~~/components/squad-goals/app";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const App = () => {
  const { data: signer } = wagmi.useSigner();
  const provider = wagmi.useProvider();

  const [originalMetadata, setOriginalMetadata] = useState<{ name: string; description: string; image: string }[]>([]);
  const [copiesMetadata, setCopiesMetadata] = useState<{ name: string; description: string; image: string }[]>([]);

  const { data: challengesCopies, isLoading: isAllChallengesCopiesLoading } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getChallengeCopies",
    onSuccess: async challengesData => {
      const copiesTokenURIs: { name: string; description: string; image: string }[] = [];
      for (const challenge of challengesData as any) {
        const contract = new ethers.Contract(challenge.NFT, RewardNFT, signer || provider);
        const tokenURI = await contract?.tokenURI(1);
        const metadataURL = "https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "");
        console.log(metadataURL);
        await fetch(metadataURL)
          .then(response => response.json())
          .then(data =>
            copiesTokenURIs.push({
              ...data,
              image: "https://ipfs.io/ipfs/" + data.image.replace("ipfs://", ""),
            }),
          )
          .catch(err => console.log(err));
      }
      setCopiesMetadata(copiesTokenURIs);
    },
  });
  const { data: challenges, isLoading: isAllChallengesLoading } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "getChallenges",
    onSuccess: async challengesData => {
      const originalTokenURIs: { name: string; description: string; image: string }[] = [];
      for (const challenge of challengesData as any) {
        const contract = new ethers.Contract(challenge.NFT, RewardNFT, signer || provider);
        const tokenURI = await contract?.tokenURI(1);
        const metadataURL = "https://ipfs.io/ipfs/" + tokenURI.replace("ipfs://", "");
        console.log(metadataURL);
        await fetch(metadataURL)
          .then(response => response.json())
          .then(data =>
            originalTokenURIs.push({
              ...data,
              image: "https://ipfs.io/ipfs/" + data.image.replace("ipfs://", ""),
            }),
          )
          .catch(err => console.log(err));
      }
      setOriginalMetadata(originalTokenURIs);
    },
  });
  const { /*data: challengeCount,*/ isLoading: isChallengeCountLoading } = useScaffoldContractRead({
    contractName: "SquadGoals",
    functionName: "challengeCount",
  });

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
            {/* <div className="w-[80%]">
              <SelectCategory />
            </div> */}
          </div>
          {isAllChallengesLoading || isChallengeCountLoading || isAllChallengesCopiesLoading ? (
            <div className="flex-center mx-auto mt-10">
              <Loading />
            </div>
          ) : (
            <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
              {challenges?.map((challenge, index) => {
                // original
                if (challenge?.completed == false) {
                  return (
                    <ChallengeCard
                      metadata={originalMetadata[index]}
                      challengeId={index + 1}
                      isOriginal={true}
                      challenge={challenge}
                      key={index}
                    />
                  );
                } else {
                  return null;
                }
              })}

              {challengesCopies?.map((challenge, index) => {
                // cloned
                if (challenge?.completed == false) {
                  return (
                    <ChallengeCard
                      metadata={copiesMetadata[index]}
                      challengeId={index + 1}
                      isOriginal={false}
                      challenge={challenge}
                      key={index}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          )}
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
