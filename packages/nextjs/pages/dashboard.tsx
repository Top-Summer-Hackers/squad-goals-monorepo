import React, { useEffect, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

// import { ChallengeCard } from "~~/components/squad-goals/app";
// import { RewardNFTCard } from "~~/components/squad-goals/dashboard";

const Dashboard = () => {
  const { isConnected: isWalletConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [isConnected, setIsConnected] = useState(false);

  async function connectWallet() {
    if (!isWalletConnected && openConnectModal) {
      openConnectModal();
    }
  }

  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);

  return (
    <div className="relative max-w-[1980px] mx-auto w-[90%]">
      <div className="z-[-100] w-full fixed left-0 right-0">
        <img src="/bgvector.png" alt="" className="w-full h-full" />
      </div>
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center w-full h-[80vh]">
          <div className="text-3xl">Please connect your wallet</div>
          <div
            onClick={() => connectWallet()}
            className="mt-1 cursor-pointer hover:scale-105 transition bg-white px-5 py-2 rounded-full"
          >
            Connect Wallet
          </div>
        </div>
      ) : (
        <div className="w-[90%] mx-auto mb-10">
          {/* wallet address */}
          <div className="text-center font-bold text-2xl mt-10 truncate">{address}</div>
          {/* account stats */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-3">
            {/* completed challenges */}
            <div>
              <div className="font-semibold text-3xl text-center">34</div>
              <div className="font-semibold text-base text-center">Completed challenges</div>
            </div>
            {/* xDAI Staked */}
            <div>
              <div className="font-semibold text-3xl text-center">14 ETH</div>
              <div className="font-semibold text-base text-center">xDAI Staked</div>
            </div>
            {/* Leaderboard Position */}
            <div>
              <div className="font-semibold text-3xl text-center">340</div>
              <div className="font-semibold text-base text-center">Leaderboard Position</div>
            </div>
            {/* Top % Percent */}
            <div>
              <div className="font-semibold text-3xl text-center">14%</div>
              <div className="font-semibold text-base text-center">Top % Percent</div>
            </div>
            {/* % Percent of challenges won */}
            <div>
              <div className="font-semibold text-3xl text-center">98%</div>
              <div className="font-semibold text-base text-center">% Percent of challenges won</div>
            </div>
            {/* Top Category */}
            <div>
              <div className="font-semibold text-3xl text-center">Coding</div>
              <div className="font-semibold text-base text-center">Top Category</div>
            </div>
            {/* challenges Authored */}
            <div>
              <div className="font-semibold text-3xl text-center">5</div>
              <div className="font-semibold text-base text-center">challenges Authored</div>
            </div>
            {/* Earned from Authored challenges */}
            <div>
              <div className="font-semibold text-3xl text-center">2.3 ETH</div>
              <div className="font-semibold text-base text-center">Earned from Authored challenges</div>
            </div>
            {/* challenges Initiated */}
            <div>
              <div className="font-semibold text-3xl text-center">10</div>
              <div className="font-semibold text-base text-center">challenges Initiated</div>
            </div>
          </div>

          {/* Reward NFTs Collected */}
          <div className="mt-10">
            <div className="font-semibold text-2xl">Reward NFTs Collected:</div>
            {/* NFTs */}
            <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
              {/* <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard />
              <RewardNFTCard /> */}
            </div>
          </div>

          {/* Challenges In Progress */}
          <div className="mt-10">
            <div className="font-semibold text-lg">Challenges In Progress:</div>
            {/* NFTs */}
            <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
              {/* <ChallengeCard />
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

          {/* Completed Challenges */}
          <div className="mt-10">
            <div className="font-semibold text-lg">Completed Challenges:</div>
            {/* NFTs */}
            <div className="px-2 py-3 mb-10 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#999999] scrollbar-track-[#C9C9C9]">
              {/* <ChallengeCard />
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
