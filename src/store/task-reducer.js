//actions
import {
  TASK_DONE,
  TASK_ADD,
  SUBTASK_ADD,
  TASK_REMOVE,
  SUBTASK_REMOVE,
} from "./actions";
//model
import Task from "../model/Task";
import { removeItem } from "../utils/utils";

export default function reducer(state, action) {
  const projects = state.projects;
  const tags = state.tags;
  const tasks = state.tasks;

  console.log(state);
  if (action.type === TASK_DONE) {
    const { id, isDone } = action.payload;
    return {
      ...state,
      tasks: { ...tasks, [id]: { ...tasks[id], isDone } },
    };
  }

  if (action.type === TASK_ADD) {
    const { projectId, tagId } = action.payload;
    const task = Task({ projectId, tagId });

    const updatedProjects = projectId
      ? {
          ...projects,
          [projectId]: {
            ...projects[projectId],
            taskIds: [...projects[projectId].taskIds, task.id],
          },
        }
      : projects;

    const updatedTags = tagId
      ? {
          ...tags,
          [tagId]: {
            ...tags[tagId],
            taskIds: [...tags[tagId].taskIds, task.id],
          },
        }
      : tags;

    return {
      ...state,
      projects: updatedProjects,
      tags: updatedTags,
      tasks: {
        ...tasks,
        [task.id]: task,
      },
    };
  }

  if (action.type === SUBTASK_ADD) {
    const { parentId } = action.payload;
    const subtask = Task({ parentId });

    console.log(parentId);
    console.log(tasks[parentId]);
    return {
      ...state,
      tasks: {
        ...tasks,
        [parentId]: {
          ...tasks[parentId],
          subTaskIds: [...tasks[parentId].subTaskIds, subtask.id],
        },
        [subtask.id]: subtask,
      },
    };
  }

  if (action.type === TASK_REMOVE) {
    const { id } = action.payload;

    const task = state.tasks[id];
    let updatedTasks = removeItem(state.tasks, id);
    task.subTaskIds.forEach((subId) => {
      updatedTasks = removeItem(updatedTasks, subId);
    });

    const updatedProjects = task.projectId
      ? {
          ...state.projects,
          [task.projectId]: {
            ...state.projects[task.projectId],
            taskIds: state.projects[task.projectId].taskIds.filter(
              (id) => id !== task.id
            ),
          },
        }
      : projects;

    let updatedTags = tags;

    task.tagIds.forEach((tagId) => {
      updatedTags = {
        ...updatedTags,
        [tagId]: {
          ...updatedTags[tagId],
          taskIds: updatedTags[tagId].taskIds.filter((id) => id !== task.id),
        },
      };
    });

    return {
      ...state,
      projects: updatedProjects,
      tags: updatedTags,
      tasks: updatedTasks,
    };
  }

  if (action.type === SUBTASK_REMOVE) {
    console.log("what?");
    const { id, parentId } = action.payload;
    let updatedTasks = removeItem(tasks, id);
    return {
      ...state,
      tasks: {
        ...updatedTasks,
        [parentId]: {
          ...updatedTasks[parentId],
          subTaskIds: updatedTasks[parentId].subTaskIds.filter(
            (subId) => subId !== id
          ),
        },
      },
    };
  }

  return state;
}
