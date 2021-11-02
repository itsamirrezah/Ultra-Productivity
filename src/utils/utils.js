export function removeItem(obj, key) {
  const { [key]: _, ...remain } = obj;
  return remain;
}
