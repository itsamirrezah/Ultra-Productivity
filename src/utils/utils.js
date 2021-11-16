export function removeItem(obj, key) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...remain } = obj;
  return remain;
}

export function reorder(list, start, end) {
  const mutableList = Array.from(list);
  const [reorder] = mutableList.splice(start, 1);
  mutableList.splice(end, 0, reorder);
  return mutableList;
}
