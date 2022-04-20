// import "./test/combine";

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getUFloat = (val: any) => {
  val = val.toString();
  let newVal = parseFloat(val);
  (!newVal || newVal < 0) && (newVal = 0);
  return newVal;
};

export const getFloat = (val: any) => {
  val = val.toString();
  let newVal = parseFloat(val);
  !newVal && (newVal = 0);
  return newVal;
};

export const getInt = (val: any) => {
  val = val.toString();
  let newVal = parseInt(val);
  !newVal && (newVal = 0);
  return newVal;
};

export const getUInt = (val: any) => {
  val = val.toString();
  let newVal = parseInt(val);
  !newVal && (newVal = 0);
  return newVal;
};
