export interface StaticDuckData {
  proof: string[]; // merkle proof
  webp: string; // base64 image data
}

export interface DuckData {
  id: number; // token ID
  staticData: StaticDuckData;
  mintTime: number; // timestamp when minted or 0
  owner: string; // account or ""
  salePrice: number; // sale price in ETH or 0
  isCustom: boolean; // defaults to false
}

export interface DuckCardProps {
  img: string;
  data: DuckData;
  isCustom?: boolean;
}
