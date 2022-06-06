import { v4 as uuid } from "uuid";

export default function ({ id, title, color, type, taskIds }) {
  return {
    id: id ? id : uuid(),
    title: title,
    color: color,
    taskIds: taskIds ? taskIds : [],
    type: !type ? 0 : type,
    _: "Project",
    updatedAt: new Date().getTime(),
  };
}
