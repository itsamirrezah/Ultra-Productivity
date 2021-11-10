//utils
import { removeItem } from "../utils/utils";
//models
import Project from "../model/Project";
import Tag from "../model/Tag";
import Task from "../model/Task";
import ActiveTask from "../model/ActiveTask";

let projects = {};
let tags = {};
let tasks = {};
let activeTask = {};

export const colors = {
  0: "red",
  1: "yellow",
  2: "blue",
  3: "pink",
  4: "cyan",
};

function generateProjects() {
  for (let i = 0; i < 5; i++) {
    const p = Project({
      title: `project-${i + 1}`,
      color: colors[(i + 1) % 3],
    });
    projects = { ...projects, [p.id]: p };
  }
}

function generateTags() {
  tags = {
    ...tags,
    ["today"]: Tag({ id: "today", title: "Today", color: "green", type: -1 }),
  };
  for (let i = 0; i < 5; i++) {
    const t = Tag({
      title: `tag-${i + 1}`,
      color: colors[(i + 1) % 3],
    });
    tags = { ...tags, [t.id]: t };
  }
}

function generateTasks() {
  for (let i = 0; i < 100; i++) {
    const t = Task({
      title: `task-${i + 1}`,
      isDone: !Math.floor(Math.random() * 2),
    });
    tasks = { ...tasks, [t.id]: t };
  }
}

// todo: potential bug
function generateRelation() {
  const projectList = Object.keys(projects);
  const tagList = Object.keys(tags);
  const taskList = Object.keys(tasks);

  taskList.forEach((taskId) => {
    let task = { ...tasks[taskId] };

    if (task.projectId || task.parentId) {
      return;
    }
    //randomly choose => have a projectId or not
    if (!Math.floor(Math.random() * 3)) {
      const projectIdx = Math.floor(Math.random() * projectList.length);
      let project = projects[projectList[projectIdx]];
      project = {
        ...project,
        taskIds: [...project.taskIds, task.id],
      };
      task = { ...task, projectId: project.id };
      projects = { ...projects, [project.id]: project };
    }
    //randomly choose => have a tagId or not
    if (!Math.floor(Math.random() * 2)) {
      for (let i = 0; i < Math.floor(Math.random() * tagList.length); i++) {
        let tag = tags[tagList[i]];
        task = { ...task, tagIds: [...task.tagIds, tag.id] };
        tag = { ...tag, taskIds: [...tag.taskIds, task.id] };
        tags = { ...tags, [tag.id]: tag };
      }
    }

    //randomly choose => have subtasks or not
    if (!Math.floor(Math.random() * 3)) {
      for (let i = 0; i < 5; i++) {
        let randomTask =
          tasks[taskList[Math.floor(Math.random() * taskList.length)]];

        if (
          randomTask.id === task.id ||
          randomTask.projectId ||
          randomTask.parentId ||
          randomTask.subTaskIds.length > 0 ||
          randomTask.tagIds.length > 0
        )
          continue;

        randomTask = {
          ...randomTask,
          projectId: task.projectId,
          parentId: task.id,
        };
        tasks = { ...tasks, [randomTask.id]: randomTask };
        task = { ...task, subTaskIds: [...task.subTaskIds, randomTask.id] };
      }
    }
    tasks = { ...tasks, [task.id]: task };
  });

  let temp = { ...tasks };
  Object.keys(tasks).forEach((taskId) => {
    const task = tasks[taskId];
    if (task.parentId) return;

    if (!task.projectId && task.tagIds.length === 0) {
      temp = removeItem(temp, task.id);
      task.subTaskIds.forEach((subId) => {
        temp = removeItem(temp, subId);
      });
    }
  });
  tasks = temp;
}

function generateActiveTask() {
  const taskList = Object.keys(tasks);
  const randomIdx = Math.floor(Math.random() * taskList.length);
  const randomTask = tasks[taskList[randomIdx]];
  activeTask = ActiveTask({ ...randomTask });
}

export default function () {
  if (!Object.keys(projects).length) generateProjects();
  if (!Object.keys(tags).length) generateTags();
  if (!Object.keys(tasks).length) {
    generateTasks();
    generateRelation();
  }
  generateActiveTask();

  return { tasks, projects, tags, activeTask };
}
