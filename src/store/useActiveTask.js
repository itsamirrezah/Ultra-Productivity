import { useState, useEffect } from "react";
import ActiveTask from "../model/ActiveTask";

//load active task from dummy
import appData from "../data/app-data";
const { activeTask: dummyActiveTask } = appData();
localStorage.clear();
localStorage.setItem("ACTIVE_TASK", JSON.stringify(dummyActiveTask));

//global states
let activeTask = ActiveTask({});
let observers = {};
let isTrackStarted = false;
let interval = null;

function setActiveTask(task) {
  activeTask = ActiveTask(task);
  localStorage.setItem("ACTIVE_TASK", JSON.stringify(activeTask));
  renderObservers(activeTask);
}

//re-render observers
function renderObservers(state) {
  Object.keys(observers).forEach((id) => observers[id](state));
}

export default function useActiveTask({
  dispatchTask = {},
  shouldObserve = false,
  task = null,
}) {
  const newObserver = useState()[1];

  function subscribe(id) {
    observers = { ...observers, [id]: newObserver };
  }

  function unsubscribe(id) {
    const { [id]: _, ...remain } = observers;
    observers = remain;
  }

  function cleanup() {
    unsubscribe(activeTask.id);
    clearInterval(interval);
    isTrackStarted = false;
  }

  function play() {
    if (activeTask.id) {
      cleanup();
    }
    subscribe(task.id);
    setActiveTask(task);
  }

  function pause() {
    cleanup();
    setActiveTask(ActiveTask({}));
  }

  function startTracking() {
    isTrackStarted = true;
    interval = setInterval(() => {
      setActiveTask({
        ...activeTask,
        timeTracked: activeTask.timeTracked + 10000,
      });
    }, 10000);
  }

  useEffect(() => {
    if (!isTrackStarted) {
      const activeTaskDb = localStorage.getItem("ACTIVE_TASK");
      if (activeTaskDb) {
        activeTask = JSON.parse(activeTaskDb);
        startTracking();
      }
    }
  });

  //subscription
  useEffect(() => {
    if (shouldObserve || task.id === activeTask.id)
      observers = {
        ...observers,
        [task ? task.id : "default"]: newObserver,
      };
    return () => {
      const { [task ? task.id : "default"]: _, ...remain } = observers;
      observers = remain;
    };
  }, []);

  return { activeTask, play, pause };
}
