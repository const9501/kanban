import { RootState } from "../reducers/rootReducer";
import { IProject } from "../../types/types";

export const selectProjects = (state: RootState): IProject[] => state.projects;
