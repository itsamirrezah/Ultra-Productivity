import { v4 as uuid } from "uuid";

export default function ({ id, title, color, type }) {
  return {
    id: id ? id : uuid(),
    title: title,
    color: !color ? "yellow" : color,
    taskIds: [],
    type: !type ? 0 : type,
    _: "Tag",
    updatedAt: new Date().getTime(),
  };
}
