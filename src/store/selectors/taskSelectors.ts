import {RootState} from "../reducers/rootReducer";
import {ITask} from "../reducers/taskReducer";

export const selectQueueTasks = (state: RootState, id: string = ''): ITask[] => {
  return state.tasks.filter(task => task.projectId === id && task.status === 'queue').sort((a, b) => a.index - b.index)
}

export const selectDevelopmentTasks = (state: RootState, id: string = ''): ITask[] => {
  return state.tasks.filter(task => task.projectId === id && task.status === 'development').sort((a, b) => a.index - b.index)
}

export const selectDoneTasks = (state: RootState, id: string = ''): ITask[] => {
  return state.tasks.filter(task => task.projectId === id && task.status === 'done').sort((a, b) => a.index - b.index)
}

export const selectSingleTasks = (state: RootState, id: string = ''): ITask | null => {
  return state.tasks.find(task => task.id === id) || null
}