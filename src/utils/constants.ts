/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
export const aspectRatio = 1;
export const minViewLength = 6.582608695652174;

export enum MachineMode {
  Off,
  Shopping,
  Customization,
  Admin,
}

export const numberRegex = /^\d*(?:\d*)?$/;
export const decimalRegex = /^\d*(?:[.,]\d*)?$/;

export const defaultLayerIndex = 0;
export const defaultColorIndex = 0;
export const colors = [
  '#000000',
  '#464646',
  '#787878',
  '#b4b4b4',
  '#dcdcdc',
  '#ffffff',
  '#990030',
  '#9c5a3c',
  '#ed1c24',
  '#ffa3b1',
  '#ff7e00',
  '#e5aa7a',
  '#ffc20e',
  '#f5e49c',
  '#fff200',
  '#fff9bd',
  '#a8e61d',
  '#d3f9bc',
  '#22b14c',
  '#9dbb61',
  '#00b7ef',
  '#99d9ea',
  '#4d6df3',
  '#709ad1',
  '#2f3699',
  '#546d8e',
  '#6f3198',
  '#b5a5d5',
];

export const tozziDuckNum = 200;

export const BURN_WINDOW = 604800 * 1000; // one week in ms
// export const BURN_WINDOW = 86400 * 1000; // one day

export const reactQueryStaleTime = 5 * 60 * 1000; // 5 minutes

export const contractAbi = [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tozziDuckPrice",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "customDuckPrice",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "maxCustomDucks",
            "type": "uint256"
          },
          {
            "internalType": "enum MintStatus",
            "name": "tozziDuckMintStatus",
            "type": "uint8"
          },
          {
            "internalType": "enum MintStatus",
            "name": "customDuckMintStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct MachineConfig",
        "name": "config",
        "type": "tuple"
      },
      {
        "internalType": "string",
        "name": "ownershipTokenURI",
        "type": 'string'
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AmountMustBeNonZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BurnWindowHasPassed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CustomDuckLimitReached",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DuckAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "IncorrectDuckPrice",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientDuckAllowance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientFunds",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidDuckId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidProof",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "enum DuckType",
        "name": "duckType",
        "type": "uint8"
      }
    ],
    "name": "MintingDisabled",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "CustomDuckBurned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "enum DuckType",
        "name": "duckType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "DuckMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "updatedBy",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "stance",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timeout",
                "type": "uint256"
              }
            ],
            "internalType": "struct DuckStance",
            "name": "stance",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "updated",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct DuckProfile",
        "name": "profile",
        "type": "tuple"
      }
    ],
    "name": "DuckProfileUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tozziDuckPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "customDuckPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "maxCustomDucks",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum MintStatus",
        "name": "tozziDuckMintStatus",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum MintStatus",
        "name": "customDuckMintStatus",
        "type": "uint8"
      }
    ],
    "name": "MachineConfigUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BURN_WINDOW",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "OWNERSHIP_TOKEN_ID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "burnRenegadeDuck",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "customDuckHatchedTimes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "duckAllowances",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "tozziDuckAllowance",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "customDuckAllowance",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "duckCreators",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "duckExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "duckIdToWEBP",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "duckProfiles",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "stance",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timeout",
            "type": "uint256"
          }
        ],
        "internalType": "struct DuckStance",
        "name": "stance",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "updated",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "machineConfig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tozziDuckPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "customDuckPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxCustomDucks",
        "type": "uint256"
      },
      {
        "internalType": "enum MintStatus",
        "name": "tozziDuckMintStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum MintStatus",
        "name": "customDuckMintStatus",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "webp",
        "type": "string"
      }
    ],
    "name": "mintCustomDuck",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "webp",
        "type": "string"
      },
      {
        "internalType": "bytes32[]",
        "name": "merkleProof",
        "type": "bytes32[]"
      }
    ],
    "name": "mintTozziDuck",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "tozziDuckAllowance",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "customDuckAllowance",
        "type": "uint128"
      }
    ],
    "name": "setDuckAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_stance",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_stanceTimeout",
        "type": "uint256"
      }
    ],
    "name": "setDuckProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tozziDuckPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "customDuckPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxCustomDucks",
            "type": "uint256"
          },
          {
            "internalType": "enum MintStatus",
            "name": "tozziDuckMintStatus",
            "type": "uint8"
          },
          {
            "internalType": "enum MintStatus",
            "name": "customDuckMintStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct MachineConfig",
        "name": "config",
        "type": "tuple"
      }
    ],
    "name": "setMachineConfig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
