export const aspectRatio = 16 / 9;

export enum MachineMode {
  Shopping,
  Customization,
  Admin,
}

export const defaultLayerIndex = 0;
export const defaultColorIndex = 0;
export const colors = [
  "#000000",
  "#464646",
  "#787878",
  "#b4b4b4",
  "#dcdcdc",
  "#ffffff",
  "#990030",
  "#9c5a3c",
  "#ed1c24",
  "#ffa3b1",
  "#ff7e00",
  "#e5aa7a",
  "#ffc20e",
  "#f5e49c",
  "#fff200",
  "#fff9bd",
  "#a8e61d",
  "#d3f9bc",
  "#22b14c",
  "#9dbb61",
  "#00b7ef",
  "#99d9ea",
  "#4d6df3",
  "#709ad1",
  "#2f3699",
  "#546d8e",
  "#6f3198",
  "#b5a5d5",
];

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const projectAddress = "0x78076156F51277569f61A7F3dCf0C63b597b8D25";

export const machineAddress = "0xb5b9757C9a81f5875bD3C6F5A0Ee0aC01187f0Ed";
