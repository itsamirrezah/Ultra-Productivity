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
  timeTracked,
}) {
  return {
    id: id ? id : uuid(),
    title: title ? title : "",
    isDone: isDone ? isDone : false,
    timeTracked: timeTracked ? timeTracked : 0,
    parentId: parentId ? parentId : null,
    projectId: projectId ? projectId : null,
    subTaskIds: subTaskIds ? subTaskIds : [],
    tagIds: tagId ? [tagId] : [],
  };
}
