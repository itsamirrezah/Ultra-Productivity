import { useState, useEffect } from "react";
import ActiveTask from "../model/ActiveTask";
import { setTaskTracked } from "../store/actions";
//load active task from dummy
import appData from "../data/app-data";
import { useDispatch } from "./tasks-context";
const { activeTask: dummyActiveTask } = appData();
localStorage.clear();
localStorage.setItem("ACTIVE_TASK", JSON.stringify(dummyActiveTask));

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

  function subscribe(id) {
    liveObservers = { ...liveObservers, [id]: observers[id] };
  }

  function unsubscribe(id) {
    const { [id]: _, ...remain } = liveObservers;
    liveObservers = remain;
  }

  function unsetVariables() {
    clearInterval(interval);
    interval = null;
    isTrackStarted = false;
  }

  function cleanup(active) {
    unsetVariables();
    unsetActiveTask();
    unsubscribe(active.id);
    dispatch(setTaskTracked({ ...active }));
  }

  function play(task) {
    if (activeTask.id) {
      cleanup(activeTask);
    }
    subscribe(task.id);
    setActiveTask(task);
  }

  function pause() {
    cleanup(activeTask);
  }

  function startTracking() {
    isTrackStarted = true;
    interval = setInterval(() => {
      setActiveTask({
        ...activeTask,
        timeTracked: activeTask.timeTracked + 2000,
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
    if (shouldObserve || task.id === activeTask.id)
      liveObservers = {
        ...liveObservers,
        [task ? task.id : "default"]: newObserver,
      };
    return () => {
      const { [task ? task.id : "default"]: _, ...remain } = liveObservers;
      liveObservers = remain;
    };
  }, []);

  return { activeTask, play, pause, dispatch };
}
