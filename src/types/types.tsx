
export interface DuckData {
  id: number;
  img: string;
  owner?: string;
  proof: string[];
  webp: string;
}

export interface DuckCardProps {
  img: string;
  data: DuckData;
  isCustom?: boolean;
}
