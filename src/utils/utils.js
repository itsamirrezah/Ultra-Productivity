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

export function relativeTime(timeInMiliseconds) {
  const seconds = Math.floor(timeInMiliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours > 0 ? `${hours}h` : ""} ${
    minutes - hours * 60 > 0 ? `${minutes - hours * 60}m` : ""
  } ${hours <= 0 && minutes <= 0 ? `${seconds}s` : ""}`;
}
