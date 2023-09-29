import {combineReducers} from "redux";
import {projectReducer} from "./projectReducer";
import {store} from "../index";
import {taskReducer} from "./taskReducer";

export const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch