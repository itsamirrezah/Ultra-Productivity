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
    id: id || uuid(),
    title: title || "",
    isDone: isDone || false,
    timeTracked: timeTracked || 0,
    parentId: parentId || null,
    projectId: projectId || null,
    subTaskIds: subTaskIds || [],
    tagIds: tagId ? [tagId] : [],
    updatedAt: new Date().getTime(),
  };
}
