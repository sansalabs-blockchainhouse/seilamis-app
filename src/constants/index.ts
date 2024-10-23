export const RAFFLE_POLYGON_CONTRACT_ADDRESS = '0x87108071318F50BF97841Ca1b38493b96F4305c8'
export const RAFFLE_POLYGON_ABI = [
    { "inputs": [], "name": "AccessControlBadConfirmation", "type": "error" },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "bytes32", "name": "neededRole", "type": "bytes32" }
        ],
        "name": "AccessControlUnauthorizedAccount",
        "type": "error"
    },
    { "inputs": [], "name": "InvalidInitialization", "type": "error" },
    { "inputs": [], "name": "NotInitializing", "type": "error" },
    { "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "raffleId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ticketCount",
                "type": "uint256"
            }
        ],
        "name": "TicketPurchased",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "StakingContract",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_nftContract", "type": "address" },
            { "internalType": "uint256", "name": "_nftId", "type": "uint256" },
            {
                "internalType": "uint256[]",
                "name": "_ticketPrice",
                "type": "uint256[]"
            },
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "string", "name": "_image", "type": "string" },
            { "internalType": "uint256", "name": "_startDate", "type": "uint256" },
            { "internalType": "uint256", "name": "_endDate", "type": "uint256" },
            {
                "internalType": "enum BansheesRaffle.RaffleType",
                "name": "_raffleType",
                "type": "uint8"
            },
            {
                "internalType": "enum BansheesRaffle.NFTType",
                "name": "_nftType",
                "type": "uint8"
            }
        ],
        "name": "createRaffle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_raffleId", "type": "uint256" },
            { "internalType": "uint256", "name": "_ticketCount", "type": "uint256" }
        ],
        "name": "enterRaffle",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_raffleId", "type": "uint256" },
            { "internalType": "uint256", "name": "_ticketCount", "type": "uint256" }
        ],
        "name": "enterRaffleErc20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_raffleId", "type": "uint256" },
            { "internalType": "uint256", "name": "_ticketCount", "type": "uint256" }
        ],
        "name": "enterRaffleFreeTickets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "erc20Token",
        "outputs": [
            { "internalType": "contract IERC20", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "freeTickets",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "funds",
        "outputs": [
            { "internalType": "address payable", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllRaffles",
        "outputs": [
            {
                "components": [
                    { "internalType": "address", "name": "creator", "type": "address" },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    { "internalType": "uint256", "name": "nftId", "type": "uint256" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "image", "type": "string" },
                    {
                        "internalType": "uint256[]",
                        "name": "ticketPrice",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketsBought",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum BansheesRaffle.RaffleState",
                        "name": "raffleState",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum BansheesRaffle.RaffleType",
                        "name": "raffleType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum BansheesRaffle.NFTType",
                        "name": "nftType",
                        "type": "uint8"
                    },
                    { "internalType": "uint256", "name": "startDate", "type": "uint256" },
                    { "internalType": "uint256", "name": "endDate", "type": "uint256" },
                    { "internalType": "address", "name": "winner", "type": "address" }
                ],
                "internalType": "struct BansheesRaffle.Raffle[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "index", "type": "uint256" }
        ],
        "name": "getRafflesInfo",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            {
                "internalType": "enum BansheesRaffle.RaffleState",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" }
        ],
        "name": "getRoleAdmin",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "raffleId", "type": "uint256" }
        ],
        "name": "getTicketLength",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "raffleId", "type": "uint256" }
        ],
        "name": "getTickets",
        "outputs": [
            { "internalType": "address[]", "name": "", "type": "address[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "hasRole",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_erc20Token", "type": "address" },
            { "internalType": "address payable", "name": "_funds", "type": "address" }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
            { "internalType": "bytes", "name": "", "type": "bytes" }
        ],
        "name": "onERC1155BatchReceived",
        "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "address", "name": "", "type": "address" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "bytes", "name": "", "type": "bytes" }
        ],
        "name": "onERC1155Received",
        "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "raffles",
        "outputs": [
            { "internalType": "address", "name": "creator", "type": "address" },
            { "internalType": "address", "name": "nftContract", "type": "address" },
            { "internalType": "uint256", "name": "nftId", "type": "uint256" },
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "image", "type": "string" },
            { "internalType": "uint256", "name": "ticketsBought", "type": "uint256" },
            {
                "internalType": "enum BansheesRaffle.RaffleState",
                "name": "raffleState",
                "type": "uint8"
            },
            {
                "internalType": "enum BansheesRaffle.RaffleType",
                "name": "raffleType",
                "type": "uint8"
            },
            {
                "internalType": "enum BansheesRaffle.NFTType",
                "name": "nftType",
                "type": "uint8"
            },
            { "internalType": "uint256", "name": "startDate", "type": "uint256" },
            { "internalType": "uint256", "name": "endDate", "type": "uint256" },
            { "internalType": "address", "name": "winner", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            {
                "internalType": "address",
                "name": "callerConfirmation",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_raffleId", "type": "uint256" }
        ],
        "name": "returnNFTAndDeleteRaffle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_winner", "type": "address" },
            { "internalType": "uint256", "name": "index", "type": "uint256" }
        ],
        "name": "sendRafflePrize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "wallet", "type": "address" },
            { "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "setFreeTickets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_funds", "type": "address" }
        ],
        "name": "setFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "index", "type": "uint256" },
            {
                "internalType": "enum BansheesRaffle.RaffleState",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "setRaffleStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
        ],
        "name": "supportsInterface",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "name": "tickets",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawalAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]