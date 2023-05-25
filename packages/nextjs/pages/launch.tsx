import React, { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Launch = () => {
  const [previewImgURL, setPreviewImgURL] = useState("");
  const [newChallengeDetails, setNewChallengeDetails] = useState({
    name: "",
    description: "",
    duration: 0,
    stake: 0,
    tags: "",
    maxStakers: 0,
  });

  const { writeAsync: createChallenge, isLoading: createChallengeLoading } = useScaffoldContractWrite({
    contractName: "SquadGoals",
    functionName: "createChallenge",
    args: [
      ethers.utils.parseEther(newChallengeDetails.stake.toString()) as unknown as BigNumber,
      newChallengeDetails.maxStakers as unknown as BigNumber,
      newChallengeDetails.duration as unknown as BigNumber,
      newChallengeDetails.name,
      newChallengeDetails.description,
      previewImgURL,
    ],
    onSuccess: async data => {
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

  // handle image change
  function handleImageUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0];
      if (file != null && file != undefined) {
        setPreviewImgURL(URL.createObjectURL(file));
      }
    }
  }

  // handle input field change event
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    setNewChallengeDetails(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  // handle launch button clicked
  function handleLaunch() {
    // error handling
    if (
      newChallengeDetails.name.trim() === "" ||
      newChallengeDetails.description.trim() === "" ||
      newChallengeDetails.duration <= 0 ||
      newChallengeDetails.stake <= 0 ||
      newChallengeDetails.tags.trim() === "" ||
      newChallengeDetails.maxStakers <= 0 ||
      previewImgURL === ""
    ) {
      setTimeout(() => {
        toast.error("Please fill in all the fields!", {
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
    } else {
      createChallenge();
    }
  }

  return (
    <div className="relative max-w-[1980px] mx-auto w-[80%]">
      <ToastContainer />
      <div className="z-[-100] w-full fixed left-0 right-0">
        <img src="/bgvector.png" alt="" className="w-full h-full" />
      </div>
      <div className="w-full">
        {/* Launch Your Own Challenge title */}
        <h3 className="text-3xl">Launch Your Own Challenge</h3>

        {/* form */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* name + description */}
            <div>
              {/* name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="name"
                  className="outline outline-1 rounded-full px-3 py-0.5"
                  placeholder="every challenge must have a name"
                />
              </div>
              {/* description */}
              <div className="mt-5 flex flex-col">
                <label htmlFor="description" className="mb-2">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  rows={8}
                  className="outline outline-1 rounded-xl px-3 py-0.5"
                  placeholder="make sure it is SMART; specific, measurable, achievable, relevant, time bound."
                />
              </div>
            </div>
            {/* duration + stake + tags */}
            <div className="flex flex-col gap-5">
              {/* duration */}
              <div className="flex flex-col">
                <label htmlFor="duration" className="mb-2">
                  Duration
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="duration"
                  className="outline outline-1 rounded-full px-3 py-0.5"
                  placeholder="how long the challenge is open in days"
                />
              </div>
              {/* stake */}
              <div className="flex flex-col">
                <label htmlFor="duration" className="mb-2">
                  ETH Stake
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="stake"
                  className="outline outline-1 rounded-full px-3 py-0.5"
                  placeholder="Required deposit to participate, e.g. 0.05 ETH"
                />
              </div>
              {/* max number of stakers */}
              <div className="flex flex-col">
                <label htmlFor="duration" className="mb-2">
                  Maximum Number of Stakers
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="maxStakers"
                  className="outline outline-1 rounded-full px-3 py-0.5"
                  placeholder="how many stakers can stake in the challenge"
                />
              </div>
              {/* Tags */}
              <div className="flex flex-col">
                <label htmlFor="duration" className="mb-2">
                  Tags
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="tags"
                  className="outline outline-1 rounded-full px-3 py-0.5"
                  placeholder="study, fitness, leetcode, running, weight lifting"
                />
              </div>
            </div>
          </div>
          {/* nft image */}
          <div className="mt-10 ">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file">
                NFT Image
                <div className="border border-black rounded-lg flex flex-col items-center justify-center w-32 h-32 brounded-lg cursor-pointer  overflow-hidden">
                  {" "}
                  {previewImgURL === "" ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img src="/launch/upload.png" alt="" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img src={previewImgURL} alt="" />
                    </div>
                  )}
                </div>
                <input
                  onChange={handleImageUploadChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="pic"
                />
              </label>
            </div>
          </div>
          {/* launch */}
          <div
            onClick={handleLaunch}
            className="text-lg cursor-pointer my-10 w-fit mx-auto bg-[#B5B2B0] px-14 py-1 rounded-xl"
          >
            {createChallengeLoading ? "Loading..." : "launch"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
