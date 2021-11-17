//imports
import { useState, useEffect } from "react";
//model
import ActiveTask from "../models/ActiveTask";
//data
import { useDispatch } from "./tasks-context";
//actions
import { setTaskTracked } from "../store/actions";

//global states
let activeTask = ActiveTask({});
let liveObservers = {};
let observers = {};
let isTrackStarted = false;
let interval = null;

function unsetActiveTask() {
  activeTask = ActiveTask({});
  localStorage.removeItem("ACTIVE_TASK");
  renderObservers(activeTask);
}

function setActiveTask(task) {
  activeTask = ActiveTask(task);
  localStorage.setItem("ACTIVE_TASK", JSON.stringify(activeTask));
  renderObservers(activeTask);
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
    isTrackStarted = false;
  }

  function cleanup(active) {
    // eslint-disable-next-line no-unused-vars
    const { lastTrackedAt, ...task } = active;
    unsetVariables();
    unsetActiveTask();
    unsubscribe(active.id, active.parentId);
    dispatch(setTaskTracked({ ...task }));
  }

  function play(task) {
    if (activeTask.id) {
      cleanup(activeTask, task.parentId);
    }
    subscribe(task.id, task.parentId);
    const { timeTracked: _, ...rest } = task;
    setActiveTask(rest);
  }

  function pause() {
    cleanup(activeTask);
  }

  function startTracking() {
    isTrackStarted = true;
    interval = setInterval(() => {
      const now = new Date().getTime();
      setActiveTask({
        ...activeTask,
        timeTracked: now - activeTask.lastTrackedAt + activeTask.timeTracked,
        lastTrackedAt: now,
      });
    }, 2000);
    return () => clearInterval(interval);
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
    observers = { ...observers, [task ? task.id : "default"]: newObserver };
    if (
      shouldObserve ||
      task.id === activeTask.id ||
      task.subTaskIds.includes(activeTask.id)
    )
      liveObservers = {
        ...liveObservers,
        [task ? task.id : "default"]: newObserver,
      };
    return () => {
      // eslint-disable-next-line no-unused-vars
      const { [task ? task.id : "default"]: _, ...remain } = liveObservers;
      liveObservers = remain;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newObserver]);

  return { activeTask, play, pause, dispatch };
}
