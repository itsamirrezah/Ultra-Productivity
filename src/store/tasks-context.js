import { createContext, useReducer, useContext } from "react";

//load tasks from dummy
import appData from "../data/app-data";
const { projects, tags, tasks } = appData();
const defaultTasks = { projects, tags, tasks };
// const defaultTasks = {};
const TasksContext = createContext(defaultTasks);
const DispatchContext = createContext();
// reducer
import reducer from "./task-reducer";

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultTasks);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TasksContext.Provider value={state}>{children}</TasksContext.Provider>
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  const ctx = useContext(DispatchContext);
  return ctx;
}

export default function useTasks() {
  const ctx = useContext(TasksContext);
  return ctx;
}
