//actions
import {
  TASK_DONE,
  TASK_ADD,
  SUBTASK_ADD,
  TASK_REMOVE,
  SUBTASK_REMOVE,
  TASK_TRACKED,
  PROJECT_ADD,
  TAG_ADD,
  PROJECT_EDIT,
  TAG_EDIT,
  TASK_ADD_TAG,
  TASK_ADD_DAY,
  TASK_REMOVE_DAY,
  TASK_SET_TITLE,
  REORDER_TASKS,
  REORDER_SUBTASKS,
} from "./actions";
import { removeItem, reorder } from "../utils/utils";
//model
import Task from "../models/Task";
import Project from "../models/Project";
import Tag from "../models/Tag";

export default function reducer(state, action) {
  const projects = state.projects;
  const tags = state.tags;
  const tasks = state.tasks;

  if (action.type === TASK_SET_TITLE) {
    const { id, title } = action.payload;
    return {
      ...state,
      tasks: { ...tasks, [id]: { ...tasks[id], title } },
    };
  }

  if (action.type === TASK_DONE) {
    const { id, isDone } = action.payload;
    const parentId = tasks[id].parentId;
    const parent = parentId
      ? {
          [parentId]: {
            ...tasks[parentId],
            updatedAt: new Date().getTime(),
          },
        }
      : {};

    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], isDone, updatedAt: new Date().getTime() },
        ...parent,
      },
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
            updatedAt: new Date().getTime(),
          },
        }
      : projects;

    const updatedTags = tagId
      ? {
          ...tags,
          [tagId]: {
            ...tags[tagId],
            taskIds: [...tags[tagId].taskIds, task.id],
            updatedAt: new Date().getTime(),
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
    const parent = tasks[parentId];
    const subtask = Task({ parentId, projectId: parent.projectId });

    return {
      ...state,
      tasks: {
        ...tasks,
        [parentId]: {
          ...tasks[parentId],
          subTaskIds: [...tasks[parentId].subTaskIds, subtask.id],
          updatedAt: new Date().getTime(),
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
            updatedAt: new Date().getTime(),
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
          updatedAt: new Date().getTime(),
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
          updatedAt: new Date().getTime(),
        },
      },
    };
  }

  if (action.type === TASK_TRACKED) {
    const { id, parentId, timeTracked } = action.payload;

    const parent = parentId
      ? {
          [parentId]: {
            ...tasks[parentId],
            timeTracked: tasks[parentId].timeTracked + timeTracked,
          },
        }
      : {};

    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: {
          ...tasks[id],
          timeTracked: tasks[id].timeTracked + timeTracked,
          updatedAt: new Date().getTime(),
        },
        ...parent,
      },
    };
  }

  if (action.type === TASK_ADD_TAG) {
    const { id, tagIds } = action.payload;
    const task = tasks[id];

    let updatedTags = tags;

    // remove old taskId from each tag
    task.tagIds.forEach((tId) => {
      updatedTags = {
        ...updatedTags,
        [tId]: {
          ...tags[tId],
          taskIds: tags[tId].taskIds.filter((taskId) => taskId !== task.id),
        },
      };
    });
    //add updated taskId to each tag
    tagIds.forEach((tId) => {
      updatedTags = {
        ...updatedTags,
        [tId]: {
          ...tags[tId],
          taskIds: [...updatedTags[tId].taskIds, task.id],
        },
      };
    });

    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], tagIds: tagIds, updatedAt: new Date().getTime() },
      },
      tags: updatedTags,
    };
  }

  if (action.type === TASK_ADD_DAY) {
    const { id } = action.payload;
    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: {
          ...tasks[id],
          tagIds: [...tasks[id].tagIds, "today"],
          updatedAt: new Date().getTime(),
        },
      },
      tags: {
        ...tags,
        today: {
          ...tags.today,
          taskIds: [...tags.today.taskIds, id],
          updatedAt: new Date().getTime(),
        },
      },
    };
  }

  if (action.type === TASK_REMOVE_DAY) {
    const { id } = action.payload;

    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: {
          ...tasks[id],
          tagIds: tasks[id].tagIds.filter((tId) => tId !== "today"),
          updatedAt: new Date().getTime(),
        },
      },
      tags: {
        ...tags,
        today: {
          ...tags.today,
          taskIds: tags.today.taskIds.filter((tId) => tId !== id),
          updatedAt: new Date().getTime(),
        },
      },
    };
  }

  if (action.type === PROJECT_ADD) {
    const { title, color } = action.payload;
    const newProject = Project({ title, color });
    return { ...state, projects: { ...projects, [newProject.id]: newProject } };
  }

  if (action.type === PROJECT_EDIT) {
    const { id, title, color } = action.payload;
    return {
      ...state,
      projects: {
        ...projects,
        [id]: {
          ...projects[id],
          title,
          color,
          updatedAt: new Date().getTime(),
        },
      },
    };
  }

  if (action.type === TAG_ADD) {
    const { title, color } = action.payload;
    const newTag = Tag({ title, color });
    return { ...state, tags: { ...tags, [newTag.id]: newTag } };
  }

  if (action.type === TAG_EDIT) {
    const { id, title, color } = action.payload;
    return {
      ...state,
      tags: {
        ...tags,
        [id]: { ...tags[id], title, color, updatedAt: new Date().getTime() },
      },
    };
  }

  if (action.type === REORDER_TASKS) {
    const { id, start, end } = action.payload;

    if (projects[id]) {
      const item = projects[id];
      const { source } = reorder(item.taskIds, null, start, end);
      return {
        ...state,
        projects: {
          ...projects,
          [id]: { ...item, taskIds: source },
        },
      };
    } else if (tags[id]) {
      const item = tags[id];
      const { source } = reorder(item.taskIds, null, start, end);
      return {
        ...state,
        tags: {
          ...tags,
          [id]: { ...item, taskIds: source },
        },
      };
    }
  }

  if (action.type === REORDER_SUBTASKS) {
    const { sourceId, destinationId, start, end } = action.payload;

    const { source, destination } =
      sourceId === destinationId
        ? reorder(tasks[sourceId].subTaskIds, null, start, end)
        : reorder(
            tasks[sourceId].subTaskIds,
            tasks[destinationId].subTaskIds,
            start,
            end
          );

    const subtaskId = tasks[sourceId].subTaskIds[start];

    return {
      ...state,
      tasks: {
        ...tasks,
        [sourceId]: {
          ...tasks[sourceId],
          timeTracked:
            tasks[sourceId].timeTracked - tasks[subtaskId].timeTracked,
          subTaskIds: source,
          updatedAt: new Date().getTime(),
        },
        [destinationId]: {
          ...tasks[destinationId],
          timeTracked:
            tasks[destinationId].timeTracked + tasks[subtaskId].timeTracked,
          subTaskIds: destination,
          updatedAt: new Date().getTime(),
        },
        [subtaskId]: {
          ...tasks[subtaskId],
          parentId: destinationId,
          updatedAt: new Date().getTime(),
        },
      },
    };
  }
  return state;
}
