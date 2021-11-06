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
} from "./actions";
//model
import Task from "../model/Task";
import { removeItem } from "../utils/utils";
import Project from "../model/Project";
import Tag from "../model/Tag";

export default function reducer(state, action) {
  const projects = state.projects;
  const tags = state.tags;
  const tasks = state.tasks;

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

  if (action.type === TASK_TRACKED) {
    const { id, timeTracked } = action.payload;

    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: {
          ...tasks[id],
          timeTracked: timeTracked,
        },
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
        [tId]: { ...tags[tId], taskIds: [...tags[tId].taskIds, task.id] },
      };
    });

    return {
      ...state,
      tasks: { ...tasks, [id]: { ...tasks[id], tagIds: tagIds } },
      tags: updatedTags,
    };
  }

  if (action.type === TASK_ADD_DAY) {
    const { id } = action.payload;
    return {
      ...state,
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], tagIds: [...tasks[id].tagIds, "today"] },
      },
      tags: {
        ...tags,
        today: { ...tags.today, taskIds: [...tags.today.taskIds, id] },
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
        },
      },
      tags: {
        ...tags,
        today: {
          ...tags.today,
          taskIds: tags.today.taskIds.filter((tId) => tId !== id),
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
      projects: { ...projects, [id]: { ...projects[id], title, color } },
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
      tags: { ...tags, [id]: { ...tags[id], title, color } },
    };
  }
  return state;
}
