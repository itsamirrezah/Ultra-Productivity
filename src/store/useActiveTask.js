//imports
import { useState, useEffect } from "react";
//model
import ActiveTask from "../models/ActiveTask";
//data
import { useDispatch } from "./tasks-context";
//actions
import { setTaskTracked } from "../store/actions";

const localActiveTask = localStorage.getItem("ACTIVE_TASK");

//global states
let activeTask = localActiveTask ? JSON.parse(localActiveTask) : ActiveTask({});
let liveObservers = {};
let observers = {};
let interval = null;

if (activeTask.id) startTracking();

window.addEventListener("beforeunload", () => {
  if (activeTask?.id) {
    localStorage.setItem("ACTIVE_TASK", JSON.stringify(activeTask));
  }
});

function unsetActiveTask() {
  activeTask = ActiveTask({});
  localStorage.removeItem("ACTIVE_TASK");
  renderObservers(activeTask);
}

function setActiveTask(task) {
  activeTask = ActiveTask(task);
  renderObservers(activeTask);
}

function startTracking() {
  interval = setInterval(() => {
    const now = new Date().getTime();
    setActiveTask({
      ...activeTask,
      timeTracked: now - activeTask.lastTrackedAt + activeTask.timeTracked,
      lastTrackedAt: now,
    });
  }, 1000);
}

//re-render observers
function renderObservers(state) {
  Object.keys(liveObservers).forEach((id) => liveObservers[id](state));
}

export default function useActiveTask({ shouldObserve = false, task = null }) {
  const newObserver = useState()[1];

  const dispatch = useDispatch();

  function subscribe(id, parentId) {
    const parent = parentId ? { [parentId]: observers[parentId] } : {};
    liveObservers = {
      ...liveObservers,
      [id]: observers[id],
      ...parent,
    };
  }

  function unsubscribe(id, parentId) {
    // eslint-disable-next-line no-unused-vars
    const { [id]: task, [parentId]: parent, ...remain } = liveObservers;
    liveObservers = remain;
  }

  function unsetVariables() {
    clearInterval(interval);
    interval = null;
  }

  function play(task) {
    if (activeTask.id) {
      pause();
    }
    subscribe(task.id, task.parentId);
    // eslint-disable-next-line no-unused-vars
    const { timeTracked: _, ...rest } = task;
    setActiveTask(rest);
    startTracking();
  }

  function pause() {
    // eslint-disable-next-line no-unused-vars
    const { lastTrackedAt, ...task } = activeTask;
    unsetVariables();
    unsubscribe(activeTask.id, activeTask.parentId);
    unsetActiveTask();
    dispatch(setTaskTracked({ ...task }));
  }

  //subscription
  useEffect(() => {
    observers = { ...observers, [task ? task.id : "default"]: newObserver };

    if (shouldObserve) subscribe("default");
    else if (task.id === activeTask.id) {
      subscribe(task.id, task.parentId);
    }

    //unsubscribe
    return () => {
      const [id, parentId] = task
        ? [task.id, task?.parentId]
        : ["default", null];
      unsubscribe(id, parentId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newObserver]);

  const { parentId, title, id } = task || {};
  useEffect(() => {
    if (activeTask && activeTask.id === id)
      setActiveTask({ ...activeTask, parentId, title });
  }, [parentId, title, id]);

  return { activeTask, play, pause, dispatch };
}
