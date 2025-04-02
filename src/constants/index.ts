export const RAFFLE_POLYGON_CONTRACT_ADDRESS =
  "0xb3F4f5A54AdeD07FF5A85DABf2874dFA830700B1";
export const RAFFLE_POLYGON_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_erc20Token", type: "address" },
      { internalType: "address payable", name: "_funds", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketCount",
        type: "uint256",
      },
    ],
    name: "TicketPurchased",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_nftContract", type: "address" },
      { internalType: "uint256", name: "_nftId", type: "uint256" },
      { internalType: "uint256[]", name: "_ticketPrice", type: "uint256[]" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_image", type: "string" },
      { internalType: "uint256", name: "_startDate", type: "uint256" },
      { internalType: "uint256", name: "_endDate", type: "uint256" },
      {
        internalType: "enum BansheesRaffle.RaffleType",
        name: "_raffleType",
        type: "uint8",
      },
      {
        internalType: "enum BansheesRaffle.NFTType",
        name: "_nftType",
        type: "uint8",
      },
    ],
    name: "createRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "uint256", name: "_ticketCount", type: "uint256" },
    ],
    name: "enterRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "uint256", name: "_ticketCount", type: "uint256" },
    ],
    name: "enterRaffleErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "uint256", name: "_ticketCount", type: "uint256" },
    ],
    name: "enterRaffleFreeTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "freeTickets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "funds",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllRaffles",
    outputs: [
      {
        components: [
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "nftId", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "image", type: "string" },
          { internalType: "uint256[]", name: "ticketPrice", type: "uint256[]" },
          { internalType: "uint256", name: "ticketsBought", type: "uint256" },
          {
            internalType: "enum BansheesRaffle.RaffleState",
            name: "raffleState",
            type: "uint8",
          },
          {
            internalType: "enum BansheesRaffle.RaffleType",
            name: "raffleType",
            type: "uint8",
          },
          {
            internalType: "enum BansheesRaffle.NFTType",
            name: "nftType",
            type: "uint8",
          },
          { internalType: "uint256", name: "startDate", type: "uint256" },
          { internalType: "uint256", name: "endDate", type: "uint256" },
          { internalType: "address", name: "winner", type: "address" },
        ],
        internalType: "struct BansheesRaffle.Raffle[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "getRafflesInfo",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      {
        internalType: "enum BansheesRaffle.RaffleState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "raffleId", type: "uint256" }],
    name: "getTicketLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "raffleId", type: "uint256" }],
    name: "getTickets",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "raffles",
    outputs: [
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "nftId", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "image", type: "string" },
      { internalType: "uint256", name: "ticketsBought", type: "uint256" },
      {
        internalType: "enum BansheesRaffle.RaffleState",
        name: "raffleState",
        type: "uint8",
      },
      {
        internalType: "enum BansheesRaffle.RaffleType",
        name: "raffleType",
        type: "uint8",
      },
      {
        internalType: "enum BansheesRaffle.NFTType",
        name: "nftType",
        type: "uint8",
      },
      { internalType: "uint256", name: "startDate", type: "uint256" },
      { internalType: "uint256", name: "endDate", type: "uint256" },
      { internalType: "address", name: "winner", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "callerConfirmation", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "returnNFTAndDeleteRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_winner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "sendRafflePrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "wallet", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "setFreeTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_funds", type: "address" }],
    name: "setFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "index", type: "uint256" },
      {
        internalType: "enum BansheesRaffle.RaffleState",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "setRaffleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "tickets",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const HITCOIN_POLYGON_CONTRACT_ADDRESS =
  "0x5033C6960001809F5F93db9b4d5F9bCbfF76b524";
export const HITCOIN_POLYGON_ABI = [
  {
    inputs: [
      { internalType: "address", name: "owner_", type: "address" },
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "blackfyAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "excludeFromHoldLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "excludeFromTax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "excludeFromTxLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "lpAddress", type: "address" },
      { internalType: "bool", name: "flag", type: "bool" },
    ],
    name: "includeInSelfPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isBlackfied",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromHoldLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromTax",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromTxLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "lpAddress", type: "address" }],
    name: "isSelfPair",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token_", type: "address" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "recoverTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "fee_", type: "uint16" }],
    name: "setBuyFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "holdLimit_", type: "uint256" }],
    name: "setHoldLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "fee_", type: "uint16" }],
    name: "setSellFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "fee_", type: "uint16" }],
    name: "setTransferFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "wallet_", type: "address" }],
    name: "setTreasuryWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "txLimit_", type: "uint256" }],
    name: "setTxLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewBuyFee",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewHoldLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewSellFee",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewTransferFee",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewTreasuryWallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewTxLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const RAFFLE_BASE_CONTRACT_ADDRESS =
  "0x80ddfa92836289Ba722BE43fe99a6bC26d289569";
export const RAFFLE_BASE_ABI = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_funds",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "AllowedTokenUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "RaffleClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "RaffleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketCount",
        type: "uint256",
      },
    ],
    name: "TicketPurchased",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    name: "allowedTokens",
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
        components: [
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ticketPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "enum BansheesBaseRaffle.RaffleType",
            name: "raffleType",
            type: "uint8",
          },
          {
            internalType: "enum BansheesBaseRaffle.NFTType",
            name: "nftType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        internalType: "struct BansheesBaseRaffle.RaffleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_raffleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketCount",
        type: "uint256",
      },
    ],
    name: "enterRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_raffleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketCount",
        type: "uint256",
      },
    ],
    name: "enterRaffleErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "funds",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllRaffles",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ticketPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ticketsBought",
            type: "uint256",
          },
          {
            internalType: "enum BansheesBaseRaffle.RaffleState",
            name: "raffleState",
            type: "uint8",
          },
          {
            internalType: "enum BansheesBaseRaffle.RaffleType",
            name: "raffleType",
            type: "uint8",
          },
          {
            internalType: "enum BansheesBaseRaffle.NFTType",
            name: "nftType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "endDate",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "winner",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        internalType: "struct BansheesBaseRaffle.Raffle[]",
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
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRafflesInfo",
    outputs: [
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
      {
        internalType: "enum BansheesBaseRaffle.RaffleState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
    ],
    name: "getTicketLength",
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
        name: "raffleId",
        type: "uint256",
      },
    ],
    name: "getTickets",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
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
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "raffles",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ticketPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ticketsBought",
        type: "uint256",
      },
      {
        internalType: "enum BansheesBaseRaffle.RaffleState",
        name: "raffleState",
        type: "uint8",
      },
      {
        internalType: "enum BansheesBaseRaffle.RaffleType",
        name: "raffleType",
        type: "uint8",
      },
      {
        internalType: "enum BansheesBaseRaffle.NFTType",
        name: "nftType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_raffleId",
        type: "uint256",
      },
    ],
    name: "returnNFTAndDeleteRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_winner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "sendRafflePrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_funds",
        type: "address",
      },
    ],
    name: "setFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "enum BansheesBaseRaffle.RaffleState",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "setRaffleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tickets",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "updateAllowedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
