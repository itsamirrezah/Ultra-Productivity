export default function ({ id, parentId, title, timeTracked, lastTrackedAt }) {
  return {
    id: id ? id : null,
    title: title ? title : null,
    parentId: parentId ? parentId : null,
    timeTracked: timeTracked ? timeTracked : 0,
    lastTrackedAt: lastTrackedAt ? lastTrackedAt : new Date().getTime(),
  };
}
