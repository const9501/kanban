import { IProject, ProjectActionTypes } from "../../types/types";

interface IAddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT;
  payload: IProject;
}

interface IRemoveProjectAction {
  type: ProjectActionTypes.REMOVE_PROJECT;
  payload: string;
}

type ProjectActionType = IAddProjectAction | IRemoveProjectAction;

const initialState: IProject[] = [];

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
