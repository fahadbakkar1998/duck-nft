/* eslint-disable no-promise-executor-return */
// import "./test/combine";

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getFloat = (val: any) => parseFloat(val.toString());

export const getUFloat = (val: any) => parseFloat(val.toString());

export const getInt = (val: any) => parseInt(val.toString());

export const getUInt = (val: any) => parseInt(val.toString());
