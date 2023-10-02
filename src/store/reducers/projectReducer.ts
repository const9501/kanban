export interface IProject {
  // crypto.randomUUID();
  id: string;
  title: string;
  description: string;
}

export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
}

interface IAddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT;
  payload: IProject;
}

interface IRemoveProjectAction {
  type: ProjectActionTypes.REMOVE_PROJECT;
  payload: string;
}

type ProjectActionType = IAddProjectAction | IRemoveProjectAction;

const initialState: IProject[] = [
  {
    id: "1",
    title: "Канбан доска",
    description:
      "Сделать тестовое задание на позицию реакт джун -  канбан доску",
  },
  {
    id: "2",
    title: "Диплом",
    description: 'Написать дисертацию магистра на тему "хзхз"',
  },
  {
    id: "3",
    title: "TODO List react + typescript + redux",
    description: "",
  },
];

export const projectReducer = (
  state = initialState,
  action: ProjectActionType,
): IProject[] => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return [...state, action.payload];
    case ProjectActionTypes.REMOVE_PROJECT:
      return state.filter((proj) => proj.id !== action.payload);
    default:
      return state;
  }
};
