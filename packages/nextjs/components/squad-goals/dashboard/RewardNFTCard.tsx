import React from "react";

const RewardNFTCard = () => {
  return (
    <div className="app-box-shadow bg-[#BBD4FA] rounded-2xl py-3 px-2">
      {/* nft image */}
      <div className="w-[80%] mx-auto">
        <img src="/app/goal.png" alt="" />
      </div>
      {/* challenge title */}
      <div className="mt-2 text-center font-semibold">30 Day Running</div>
    </div>
  );
};

export default RewardNFTCard;
