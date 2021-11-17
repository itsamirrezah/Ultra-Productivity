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
export const TASK_ADD_TAG = "TASK_ADD_TAG";
export const TASK_ADD_DAY = "TASK_ADD_DAY";
export const TASK_REMOVE_DAY = "TASK_REMOVE_DAY";
export const TASK_SET_TITLE = "TASK_SET_TITLE";
export const REORDER_TASKS = "REORDER_TASKS";
export const REORDER_SUBTASKS = "REORDER_SUBTASKS";

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

export function addTaskTag({ id, tagIds }) {
  return { type: TASK_ADD_TAG, payload: { id, tagIds } };
}

export function addTaskToDay({ id }) {
  return { type: TASK_ADD_DAY, payload: { id } };
}

export function removeTaskFromDay({ id }) {
  return { type: TASK_REMOVE_DAY, payload: { id } };
}

export function setTaskTitle({ id, title }) {
  return { type: TASK_SET_TITLE, payload: { id, title } };
}

export function reorderTasks({ id, start, end }) {
  return { type: REORDER_TASKS, payload: { id, start, end } };
}

export function reorderSubtasks({ sourceId, destinationId, start, end }) {
  return {
    type: REORDER_SUBTASKS,
    payload: { sourceId, destinationId, start, end },
  };
}
