export interface DuckData {
  id: number; // token ID
  proof: string[]; // merkle proof
  webp: string; // base64 image data
  owner: string; // account or ""
  salePrice: number; // sale price in ETH or 0
  isCustom: boolean; // defaults to false
  restTimestamp: number;
  image: string;
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
  Accounting
}