const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        ChallengeImplementation: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              name: "AlreadyVoted",
              type: "error",
            },
            {
              inputs: [],
              name: "ContractAlreadyInitialized",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              name: "DeadlineHasPassed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              name: "HasJoined",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectAmountOfEthSent",
              type: "error",
            },
            {
              inputs: [],
              name: "IncorrectAmountOfVotes",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidVote",
              type: "error",
            },
            {
              inputs: [],
              name: "MaxAmountOfStakersReached",
              type: "error",
            },
            {
              inputs: [],
              name: "NoInCoolDownPeriod",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughStakers",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFailed",
              type: "error",
            },
            {
              inputs: [],
              name: "completed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "deadline",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "executePayouts",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_stakerAddr",
                  type: "address",
                },
              ],
              name: "getStaker",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "stakerAddr",
                      type: "address",
                    },
                    {
                      internalType: "bytes32",
                      name: "stakerName",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "upVotes",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "downVotes",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct IChallenge.Staker",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getStakers",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "stakerAddr",
                      type: "address",
                    },
                    {
                      internalType: "bytes32",
                      name: "stakerName",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint256",
                      name: "upVotes",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "downVotes",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct IChallenge.Staker[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "hasVoted",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "hasVotedFor",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxAmountOfStakers",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_duration",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_rewardNFTAddr",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_creator",
                  type: "address",
                },
              ],
              name: "initialize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_name",
                  type: "bytes32",
                },
              ],
              name: "join",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "maxAmountOfStakers",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "onVoting",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stakeAmount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stakerCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "stakerAddr",
                      type: "address",
                    },
                    {
                      internalType: "bool",
                      name: "isUpvote",
                      type: "bool",
                    },
                  ],
                  internalType: "struct ChallengeImplementation.Vote[]",
                  name: "_votes",
                  type: "tuple[]",
                },
              ],
              name: "submitVote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "votedCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        SquadGoals: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_treasury",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_challengeImplementation",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "ChallengeDoesntExist",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "TransferFailed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "challenge",
                  type: "address",
                },
              ],
              name: "ChallengeCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "challengeCopyNFT",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "challengeCopys",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "challengeCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "challengeImplementation",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "challengeInitData",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "challengeNFT",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "challenges",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "copiesOfChallengeId",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "copyCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_stakeAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxAmountOfStakers",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_duration",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_symbol",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_uri",
                  type: "string",
                },
              ],
              name: "createChallenge",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_challengeId",
                  type: "uint256",
                },
              ],
              name: "createChallengeCopy",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getAllChallenges",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "challenge",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "NFT",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxAmountOfStakers",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakerCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "stakerAddr",
                          type: "address",
                        },
                        {
                          internalType: "bytes32",
                          name: "stakerName",
                          type: "bytes32",
                        },
                        {
                          internalType: "uint256",
                          name: "upVotes",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "downVotes",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct IChallenge.Staker[]",
                      name: "stakers",
                      type: "tuple[]",
                    },
                    {
                      internalType: "uint256",
                      name: "votedCount",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "onVoting",
                      type: "bool",
                    },
                  ],
                  internalType: "struct SquadGoals.ChallengeReturnData[]",
                  name: "openChallenges",
                  type: "tuple[]",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "challenge",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "NFT",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxAmountOfStakers",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakerCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "stakerAddr",
                          type: "address",
                        },
                        {
                          internalType: "bytes32",
                          name: "stakerName",
                          type: "bytes32",
                        },
                        {
                          internalType: "uint256",
                          name: "upVotes",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "downVotes",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct IChallenge.Staker[]",
                      name: "stakers",
                      type: "tuple[]",
                    },
                    {
                      internalType: "uint256",
                      name: "votedCount",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "onVoting",
                      type: "bool",
                    },
                  ],
                  internalType: "struct SquadGoals.ChallengeReturnData[]",
                  name: "openChallengeCopies",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_challengeId",
                  type: "uint256",
                },
              ],
              name: "getChallenge",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getChallengeCopies",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "challenge",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "NFT",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxAmountOfStakers",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakerCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "stakerAddr",
                          type: "address",
                        },
                        {
                          internalType: "bytes32",
                          name: "stakerName",
                          type: "bytes32",
                        },
                        {
                          internalType: "uint256",
                          name: "upVotes",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "downVotes",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct IChallenge.Staker[]",
                      name: "stakers",
                      type: "tuple[]",
                    },
                    {
                      internalType: "uint256",
                      name: "votedCount",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "onVoting",
                      type: "bool",
                    },
                  ],
                  internalType: "struct SquadGoals.ChallengeReturnData[]",
                  name: "openChallenges",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_challengeId",
                  type: "uint256",
                },
              ],
              name: "getChallengeCopy",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getChallenges",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "challenge",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "NFT",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "stakeAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxAmountOfStakers",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "stakerCount",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "stakerAddr",
                          type: "address",
                        },
                        {
                          internalType: "bytes32",
                          name: "stakerName",
                          type: "bytes32",
                        },
                        {
                          internalType: "uint256",
                          name: "upVotes",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "downVotes",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct IChallenge.Staker[]",
                      name: "stakers",
                      type: "tuple[]",
                    },
                    {
                      internalType: "uint256",
                      name: "votedCount",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "completed",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "onVoting",
                      type: "bool",
                    },
                  ],
                  internalType: "struct SquadGoals.ChallengeReturnData[]",
                  name: "openChallenges",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_challengeId",
                  type: "uint256",
                },
              ],
              name: "getCopiesOfChallenge",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
              ],
              name: "getUserClaimedNFTs",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "NFT",
                      type: "address",
                    },
                    {
                      internalType: "uint256[]",
                      name: "tokenIds",
                      type: "uint256[]",
                    },
                  ],
                  internalType: "struct SquadGoals.UserClaimedNFT[]",
                  name: "claimedNFTs",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "treasury",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
