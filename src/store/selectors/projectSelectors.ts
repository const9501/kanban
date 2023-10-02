import { RootState } from "../reducers/rootReducer";
import { IProject } from "../reducers/projectReducer";

export const selectProjects = (state: RootState): IProject[] => state.projects;
