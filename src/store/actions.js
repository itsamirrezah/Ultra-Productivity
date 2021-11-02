export const TASK_DONE = "TASK_DONE";
export const TASK_ADD = "TASK_ADD";
export const SUBTASK_ADD = "SUBTASK_ADD";
export const TASK_REMOVE = "TASK_REMOVE";
export const SUBTASK_REMOVE = "SUBTASK_REMOVE";

export function setTaskDone({ id, isDone }) {
  return { type: TASK_DONE, payload: { id, isDone } };
}

export function addTask({ projectId, tagId }) {
  return { type: TASK_ADD, payload: { projectId, tagId } };
}

export function addSubtask({ parentId }) {
  return { type: SUBTASK_ADD, payload: { parentId } };
}

export function removeTask({ id }) {
  return { type: TASK_REMOVE, payload: { id } };
}

export function removeSubtask({ id, parentId }) {
  return { type: SUBTASK_REMOVE, payload: { id, parentId } };
}
