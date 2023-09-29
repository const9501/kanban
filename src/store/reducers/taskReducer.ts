
export interface ISubTask {
  id: string
  task: string
  completed: boolean
}

export interface IFile {
  id: string
  name: string
  url: string
}

export interface IComment {
  id: string
  text: string
  isReply: string
}

export interface ITask {
  // crypto.randomUUID();
  id: string
  index: number
  projectId: string
  number: number
  title: string
  description: string
  creationDate: number
  startDev: number
  workingTime: number
  endDate: number
  priority: 'low' | 'normal' | 'high'
  files: IFile[]
  status: 'queue' | 'development' | 'done'
  subTasks: ISubTask[]
  comments: IComment[]
}

export enum TaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK',
  REMOVE_TASK = 'REMOVE_TASK'
}

interface IAddTaskAction {
  type: TaskActionTypes.ADD_TASK
  payload: ITask
}
interface IEditTaskAction {
  type: TaskActionTypes.EDIT_TASK
  payload: ITask
}
interface IRemoveTaskAction {
  type: TaskActionTypes.REMOVE_TASK
  payload: number
}

type TaskActionType = IAddTaskAction | IEditTaskAction | IRemoveTaskAction

const initialState: ITask[] = [
  {
    id: '1',
    index: 1,
    projectId: '1',
    number: 1,
    title: 'Сделать стр проектов',
    description: 'Сделать страницу проектов на которй можно будет добавлять, удалять и редактировать проекты. По нажатию на карточку проекта происходит переход на детальную страницу проекта, на которой будут все задачи по проекту',
    creationDate: 1695619976900,
    startDev: 0,
    workingTime: 0,
    endDate: 1695791907376 - 1000 * 60 * 60 * 30,
    priority:  'normal',
    files: [],
    status: 'done',
    subTasks: [],
    comments: []
  },
  {
    id: '2',
    index: 2,
    projectId: '1',
    number: 2,
    title: 'Сделать стр задач',
    description: 'Сделать страницу задач. Страница с задачами должна содержать в себе три колонки c возможностью изменения статуса с помощью drag-n-drop',
    creationDate: 1695620115023,
    startDev: 0,
    workingTime: 0,
    endDate: 1695791907376 - 1000 * 60 * 60 * 24,
    priority:  'high',
    files: [],
    status: 'done',
    subTasks: [],
    comments: []
  },
  {
    id: '3',
    index: 3,
    projectId: '1',
    number: 3,
    title: 'Сделать драг дроп',
    description: 'Сделать страницу задач. Страница с задачами должна содержать в себе три колонки c возможностью изменения статуса с помощью drag-n-drop',
    creationDate: 1695620115023,
    startDev: 0,
    workingTime: 0,
    endDate: 0,
    priority:  'normal',
    files: [],
    status: 'development',
    subTasks: [],
    comments: []
  },
  {
    id: '4',
    index: 2,
    projectId: '1',
    number: 4,
    title: 'сделать редакс стор',
    description: 'Сделать страницу задач. Страница с задачами должна содержать в себе три колонки c возможностью изменения статуса с помощью drag-n-drop',
    creationDate: 1695620115023,
    startDev: 0,
    workingTime: 0,
    endDate: 0,
    priority:  'normal',
    files: [],
    status: 'development',
    subTasks: [],
    comments: []
  },
  {
    id: '5',
    index: 1,
    projectId: '1',
    number: 5,
    title: 'Протестировать',
    description: 'Сделать страницу задач. Страница с задачами должна содержать в себе три колонки c возможностью изменения статуса с помощью drag-n-drop',
    creationDate: 1695620115023,
    startDev: 0,
    workingTime: 0,
    endDate: 0,
    priority:  'low',
    files: [],
    status: 'queue',
    subTasks: [],
    comments: []
  },
  {
    id: '6',
    index: 1,
    projectId: '2',
    number: 1,
    title: 'Придумать тему диплома',
    description: 'Придумать тему дисертаци, чтобы Моторин отстал',
    creationDate: 1695620281354,
    startDev: 0,
    workingTime: 0,
    endDate: 0,
    priority:  'normal',
    files: [],
    status: 'queue',
    subTasks: [],
    comments: []
  }
]

export const taskReducer = (state = initialState, action: TaskActionType): ITask[] => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      return [...state, action.payload]
    case TaskActionTypes.EDIT_TASK:
      console.log('dispatch EDIT_TASK >>> ', action.payload);
      return state.map(task => task.id === action.payload.id ? action.payload : task)
    case TaskActionTypes.REMOVE_TASK:
      console.log('dispatch REMOVE_TASK >>> ');
      return state
    default:
      return state
  }
}