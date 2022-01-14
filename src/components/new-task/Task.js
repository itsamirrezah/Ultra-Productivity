import { Droppable } from "react-beautiful-dnd";
import TaskItem from "../tasks/TaskItem";
import Subtasks from "./Subtasks";

export default function Task({ task, type, handleDrag }) {
  const props = taskOrSubtask[type];
  return (
    <>
      <TaskItem task={task} props={props} handleDrag={handleDrag} />
      {type === "task" && (
        <Droppable droppableId={task.id} type="subtask">
          {(provided) => (
            <Subtasks
              subtasks={task.subtasks}
              droppableProps={provided.droppableProps}
              innerRef={provided.innerRef}
              droppablePlaceHolder={provided.placeholder}
            />
          )}
        </Droppable>
      )}
    </>
  );
}

const taskOrSubtask = {
  task: {
    py: "2",
  },
  subtask: {
    bgColor: "whiteAlpha.200",
  },
};
