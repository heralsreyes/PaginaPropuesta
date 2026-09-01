/**
 * Utility function to immutably replace an item at a specific index in an array.
 * @param arr Target source array
 * @param idx Index to replace
 * @param value New value to place at index
 * @returns New copy of the array with the replaced item
 */
export function replaceAt<T>(arr: T[], idx: number, value: T): T[] {
  if (idx < 0 || idx >= arr.length) return [...arr];
  const copy = [...arr];
  copy[idx] = value;
  return copy;
}
