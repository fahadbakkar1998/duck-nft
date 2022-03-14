export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getFloat = (val: any) => {
  let floatVal = parseFloat(val);
  floatVal = !floatVal ? 0 : floatVal;
  return floatVal;
};

export const getUFloat = (val: any) => {
  let floatVal = parseFloat(val);
  floatVal = !floatVal ? 0 : floatVal;
  if (floatVal < 0) floatVal = 0;
  return floatVal;
};

export const getInt = (val: any) => {
  let intVal = parseInt(val);
  intVal = !intVal ? 0 : intVal;
  return intVal;
};

export const getUInt = (val: any) => {
  let intVal = parseInt(val);
  intVal = !intVal ? 0 : intVal;
  if (intVal < 0) intVal = 0;
  return intVal;
};
