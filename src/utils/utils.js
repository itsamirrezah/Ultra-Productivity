export function removeItem(obj, key) {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...remain } = obj;
  return remain;
}

export function reorder(source, destination = null, start, end) {
  const mutableSource = Array.from(source);
  const mutableDestination = destination
    ? Array.from(destination)
    : mutableSource;
  const [reorder] = mutableSource.splice(start, 1);
  mutableDestination.splice(end, 0, reorder);
  return { source: mutableSource, destination: mutableDestination };
}
