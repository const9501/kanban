import { ITask, TaskActionTypes } from "../../types/types";

interface IAddTaskAction {
  type: TaskActionTypes.ADD_TASK;
  payload: ITask;
}

interface IEditTaskAction {
  type: TaskActionTypes.EDIT_TASK;
  payload: ITask;
}

interface IRemoveTaskAction {
  type: TaskActionTypes.REMOVE_TASK;
  payload: string;
}

interface IRemoveAllProjTasksAction {
  type: TaskActionTypes.REMOVE_ALL_PROJ_TASKS;
  payload: string;
}

type TaskActionType =
  | IAddTaskAction
  | IEditTaskAction
  | IRemoveTaskAction
  | IRemoveAllProjTasksAction;

const initialState: ITask[] = [];

export const taskReducer = (
  state = initialState,
  action: TaskActionType,
): ITask[] => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      return [...state, action.payload];
    case TaskActionTypes.EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    case TaskActionTypes.REMOVE_ALL_PROJ_TASKS:
      return state.filter((task) => task.projectId !== action.payload);
    default:
      return state;
  }
};
