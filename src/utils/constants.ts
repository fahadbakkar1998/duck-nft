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

export const OWNERSHIP_TOKEN_ID = 420;

export const emptyDuckData = {
  owner: '',
  salePrice: 0,
  isCustom: false,
  hatched: 0,
};

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
// export const BURN_WINDOW = 600 * 1000; // 10 mins

export const reactQueryStaleTime = 5 * 60 * 1000; // 5 minutes

export const contractAbi = [
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
            "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
            "name": "tozziDuckMintStatus",
            "type": "uint8"
          },
          {
            "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
            "name": "customDuckMintStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct ITheAmazingTozziDuckMachine.MachineConfig",
        "name": "_machineConfig",
        "type": "tuple"
      },
      {
        "internalType": "string",
        "name": "ownershipTokenURI",
        "type": "string"
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
    "name": "BurnWindowPassed",
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
    "inputs": [],
    "name": "InvalidStatusId",
    "type": "error"
  },
  {
    "inputs": [],
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
        "indexed": true,
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "duckOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "machineOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "webp",
        "type": "string"
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
        "internalType": "bytes32",
        "name": "webpHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum ITheAmazingTozziDuckMachine.DuckType",
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
        "indexed": true,
        "internalType": "uint256",
        "name": "duckId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "status",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "title",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "DuckTitleGranted",
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
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "MOTDSet",
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
        "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
        "name": "tozziDuckMintStatus",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
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
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "artists",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burn",
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
    "name": "duckImageData",
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
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "status",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "description",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "duckTitles",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
        "name": "tozziDuckMintStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
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
    "inputs": [],
    "name": "owner",
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
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "webp",
        "type": "string"
      }
    ],
    "name": "ownerMint",
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
    "inputs": [],
    "name": "probationPeriod",
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
    "name": "renounceOwnership",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      }
    ],
    "name": "setArtistName",
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
        "components": [
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
        "internalType": "struct ITheAmazingTozziDuckMachine.DuckAllowance",
        "name": "allowance",
        "type": "tuple"
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
        "internalType": "address[]",
        "name": "who",
        "type": "address[]"
      },
      {
        "components": [
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
        "internalType": "struct ITheAmazingTozziDuckMachine.DuckAllowance",
        "name": "allowance",
        "type": "tuple"
      }
    ],
    "name": "setDuckAllowances",
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
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "status",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "title",
        "type": "bytes32"
      }
    ],
    "name": "setDuckTitle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "motd",
        "type": "string"
      }
    ],
    "name": "setMOTD",
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
            "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
            "name": "tozziDuckMintStatus",
            "type": "uint8"
          },
          {
            "internalType": "enum ITheAmazingTozziDuckMachine.MintStatus",
            "name": "customDuckMintStatus",
            "type": "uint8"
          }
        ],
        "internalType": "struct ITheAmazingTozziDuckMachine.MachineConfig",
        "name": "_machineConfig",
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
        "internalType": "string",
        "name": "ownershipTokenUri",
        "type": "string"
      }
    ],
    "name": "setOwnershipTokenURI",
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
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
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

export const placeholderDuck = "UklGRrIAAABXRUJQVlA4TKYAAAAvj8FjAA9AkG0bYtj2E2TbhiC2/QTZtiGIbf/8x/8AQGoYyJFkqQAUpKJekBpASd69sOlXFyP6PwH8+///qqcWbrK9o1VrvcCg1QTGAmiNxfJGJkETNGGxWm70w+D9KZhcqlMwqsGdk+1qGQCjGp8ZwF7RwlHjeHvQGmwVaIJm3wSneOIGfXqKmyZZMVrmo8Jg27LlRTcIDN6fYtMY3ye79u//n7MB";

export const openseaUrl = 'https://opensea.io/collection/tozzi-ducks';
export const openseaDuckUrl = 'https://opensea.io/assets/ethereum/0x0cd9c257f7565476f5d374ef27854abdd5916bad/';
