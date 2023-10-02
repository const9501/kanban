export interface IProject {
  id: string;
  title: string;
  description: string;
}

export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
}

export interface ISubTask {
  id: string;
  task: string;
  completed: boolean;
}

export interface IFile {
  id: string;
  name: string;
  url: string;
}

export interface IComment {
  id: string;
  text: string;
  isReply: string;
}

export interface ITask {
  id: string;
  index: number;
  projectId: string;
  number: number;
  title: string;
  description: string;
  creationDate: number;
  startDev: number;
  workingTime: number;
  endDate: number;
  priority: "low" | "normal" | "high";
  files: IFile[];
  status: "queue" | "development" | "done";
  subTasks: ISubTask[];
  comments: IComment[];
}

export enum TaskActionTypes {
  ADD_TASK = "ADD_TASK",
  EDIT_TASK = "EDIT_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  REMOVE_ALL_PROJ_TASKS = "REMOVE_ALL_PROJ_TASKS",
}
