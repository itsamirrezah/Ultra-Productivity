export default function ({ id, title, timeTracked, lastTrackedAt }) {
  return {
    id: id ? id : null,
    title: title ? title : null,
    timeTracked: timeTracked ? timeTracked : 0,
    lastTrackedAt: lastTrackedAt ? lastTrackedAt : new Date().getTime(),
  };
}
