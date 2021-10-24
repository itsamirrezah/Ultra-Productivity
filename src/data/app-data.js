//models
import Project from "../model/Project";
import Tag from "../model/Tag";
import Task from "../model/Task";

let projects = {};
let tags = {};
let tasks = {};
const colors = { 0: "red", 1: "yellow", 2: "blue" };

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
  for (let i = 0; i < 5; i++) {
    const t = Tag({
      title: `tag-${i + 1}`,
      color: colors[(i + 1) % 3],
    });
    tags = { ...tags, [t.id]: t };
  }
}

function generateTasks() {
  for (let i = 0; i < 30; i++) {
    const t = Task({
      title: `task-${i + 1}`,
    });
    tasks = { ...tasks, [t.id]: t };
  }
}

function generateRelation() {
  const projectList = Object.keys(projects);
  const tagList = Object.keys(tags);
  const taskList = Object.keys(tasks);

  taskList.forEach((taskId) => {
    let task = { ...tasks[taskId] };
    //randomly choose => have a projectId or not
    if (!Math.floor(Math.random() * 3)) {
      const projectIdx = Math.floor(Math.random() * projectList.length);
      let project = projects[projectList[projectIdx]];
      project = {
        ...project,
        projectId: project.id,
        taskIds: [...project.taskIds, task.id],
      };
      task = { ...task, projectId: project.id };
      project.taskIds.push(task.id);
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
    if (!Math.floor(Math.random() * 2)) {
      for (let i = 0; i < 5; i++) {
        let randomTask =
          tasks[taskList[Math.floor(Math.random() * taskList.length)]];
        if (
          (randomTask.projectId && randomTask.projectId !== task.projectId) ||
          randomTask.parentId ||
          randomTask.subTaskIds.length > 0
        )
          continue;
        randomTask = {
          ...randomTask,
          projectId: task.projectId,
          parentId: task.id,
        };
        task = { ...task, subTaskIds: [...task.subTaskIds, randomTask.id] };
      }
    }

    tasks = { ...tasks, [task.id]: task };
  });
}

export default function () {
  if (!Object.keys(projects)) generateProjects();
  if (!Object.keys(tags)) generateTags();
  if (!Object.keys(tasks)) {
    generateTasks();
    generateRelation();
  }

  return { tasks, projects, tags };
}
