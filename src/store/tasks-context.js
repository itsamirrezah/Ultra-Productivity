//imports
import { createContext, useReducer, useContext } from "react";
import { useEffect } from "react";
//data
import appData from "../data/app-data";
import navigationData from "../data/nav-data";

//contexts
const defaultTasks = {};
const TasksContext = createContext();
const DispatchContext = createContext();
// reducer
import reducer from "./task-reducer";

function initializer() {
  const db = localStorage.getItem("STORAGE");
  if (!db && process.env.NODE_ENV === "development") {
    const { projects, tags, tasks } = appData();
    return { projects, tags, tasks };
  }
  return JSON.parse(db);
}

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultTasks, initializer);

  useEffect(() => {
    localStorage.setItem("STORAGE", JSON.stringify(state));
  }, [state]);

  const navigation = navigationData({ ...state });

  return (
    <DispatchContext.Provider value={dispatch}>
      <TasksContext.Provider value={{ ...state, navigation }}>
        {children}
      </TasksContext.Provider>
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
