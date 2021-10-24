import { useLocation } from "react-router-dom";
import appData from "../../data/app-data";

function Tasks() {
  const data = appData();

  const [_, filter, id] = useLocation().pathname.split("/");

  const tasks = data[filter][id].taskIds;
  console.log(tasks);
  return <></>;
}

export default Tasks;
