import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/reducers/rootReducer";

export const useAppDispatch = () => useDispatch<AppDispatch>();
