import { v4 as uuid } from "uuid";

export default function ({ id, title, color }) {
  return {
    id: id ? id : uuid(),
    title: title,
    color: color,
    taskIds: [],
  };
}
