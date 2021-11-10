export function removeItem(obj, key) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...remain } = obj;
  return remain;
}
