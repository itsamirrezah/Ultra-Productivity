export default function ({ id, title, timeTracked }) {
  return {
    id: id ? id : null,
    title: title ? title : null,
    timeTracked: timeTracked ? timeTracked : 0,
  };
}
