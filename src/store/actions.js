export const TASK_DONE = "TASK_DONE";
export const TASK_ADD = "TASK_ADD";
export const SUBTASK_ADD = "SUBTASK_ADD";
export const TASK_REMOVE = "TASK_REMOVE";
export const SUBTASK_REMOVE = "SUBTASK_REMOVE";
export const TASK_TRACKED = "TASK_TRACKED";
export const PROJECT_ADD = "PROJECT_ADD";
export const PROJECT_EDIT = "PROJECT_EDIT";
export const TAG_ADD = "TAG_ADD";
export const TAG_EDIT = "TAG_EDIT";

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

export function setTaskTracked({ id, timeTracked }) {
  return { type: TASK_TRACKED, payload: { id, timeTracked } };
}

export function addProject({ title, color }) {
  return { type: PROJECT_ADD, payload: { title, color } };
}

export function editProject({ id, title, color }) {
  return { type: PROJECT_EDIT, payload: { id, title, color } };
}

export function addTag({ title, color }) {
  return { type: TAG_ADD, payload: { title, color } };
}

export function editTag({ id, title, color }) {
  return { type: TAG_EDIT, payload: { id, title, color } };
}
