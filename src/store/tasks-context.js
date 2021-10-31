import { createContext, useReducer, useContext } from "react";

//load tasks from dummy
import appData from "../data/app-data";
const { projects, tags, tasks } = appData();
const defaultTasks = { projects, tags, tasks };
// const defaultTasks = {};
const TasksContext = createContext(defaultTasks);

function reducer() {}

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultTasks);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export default function useTasks() {
  const ctx = useContext(TasksContext);
  return ctx;
}
