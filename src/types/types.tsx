export interface DuckMetadata {
  name: string,
  description: string,
  attributes: any[],
}

export interface AltMessage {
  message?: string;
  txHash?: string;
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

export type AdminTabs = 'minting' | 'allowances' | 'accounting' | 'burn' | 'motd';

export interface MachineConfig {
  tozziMintStatus: MintStatus;
  tozziMintPrice: string; // current price in ETH
  customMintStatus: MintStatus;
  customMintPrice: string; // current price in ETH
  maxCustomDucks: number; // current cap for custom ducks
}

export interface Motd {
  posted?: string;
  owner?: string;
  message?: string;
}

export interface MachineState {
  owner: string; // account # of current owner
  ownerEns: string | null;
  tozziMints: number; // # tozzi ducks minted
  customMints: number; // # custom ducks minted
  balance: string; // current balance in ETH
  totalSales?: string; // total revenue from selling ducks
  config?: MachineConfig;
  motd: Motd;
}

export interface DuckProfile {
  name?: string;
  description?: string;
  status?: string;
  title?: string;
  owner?: string;
  creator?: string;
}

export interface ActionButtonProps {
  handleOnMining: () => void;
  handleOnSuccess: () => void;
}

export interface LcdNavButtonProps {
  onClick: () => void;
  disabled: boolean;
  flipped?: boolean;
}

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export interface TxMessages {
  signing?: string;
  mining?: string;
  success?: string;
  exception?: string;
}

export interface Allowance {
  account?: string;
  tozziDucks?: string;
  customDucks?: string;
}
