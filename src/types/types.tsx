export interface DuckMetadata {
  name: string,
  description: string,
  attributes: any[],
}

export interface DuckData {
  id: number; // token ID
  proof: string[]; // merkle proof
  webp: string; // base64 image data
  owner: string; // account or ""
  salePrice: number; // sale price in ETH or 0
  isCustom: boolean; // defaults to false
  hatched: number;
  metadata?: DuckMetadata;
  burnable?: boolean;
}

export interface DuckFilters {
  all: boolean;
  available: boolean;
  sold: boolean;
  mine: boolean;
  custom: boolean;
  hideUI: boolean;
}

export enum DuckType {
  Tozzi,
  Custom,
}

export enum MintStatus {
  Enabled,
  Disabled,
  Allowance,
}

export enum AdminTabs {
  Settings,
  Allowances,
  Accounting,
  Burn,
}
export interface MachineConfig {
  tozziMintStatus: MintStatus;
  tozziMintPrice: string; // current price in ETH
  customMintStatus: MintStatus;
  customMintPrice: string; // current price in ETH
  maxCustomDucks: number; // current cap for custom ducks
}

export interface MachineState {
  owner: string; // account # of current owner
  tozziMints: number; // # tozzi ducks minted
  customMints: number; // # custom ducks minted
  balance: string; // current balance in ETH
  totalSales?: string; // total revenue from selling ducks
  config?: MachineConfig;
}

export interface DuckProfile {
  name?: string;
  description?: string;
  status?: string;
  complexity?: string;
  owner?: string;
  creator?: string;
}

export interface ActionButtonProps {
  handleOnMining: () => void;
  handleOnSuccess: () => void;
}
