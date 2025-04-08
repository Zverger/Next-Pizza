export function arrayIncludesAll(arr?: number[], values?: number[]) {
  if (!arr || !values || arr.length !== values.length) return false;
  const [sortedArr, sortedValues] = [
    [...arr].sort((a, b) => a - b),
    [...values].sort((a, b) => a - b),
  ];
  for (let i = 0; i < arr.length; i++) {
    if (sortedArr[i] !== sortedValues[i]) return false;
  }
  return true;
}
