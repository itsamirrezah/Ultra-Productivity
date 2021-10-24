//imports
import { v4 as uuid } from "uuid";

export default function ({
  id,
  projectId,
  parentId,
  tagId,
  title,
  isDone,
  subTaskIds,
}) {
  return {
    id: id ? id : uuid(),
    title: title ? title : "",
    isDone: isDone ? isDone : false,
    timeTracked: 0,
    parentId: parentId ? parentId : 0,
    projectId: projectId ? projectId : 0,
    subTaskIds: subTaskIds ? subTaskIds : [],
    tagIds: tagId ? [tagId] : [],
  };
}
