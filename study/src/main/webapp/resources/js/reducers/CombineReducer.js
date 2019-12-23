import { combineReducers } from "redux";
import createActionReducer from "./CreateActionReducer";
import algorithmReducer from "./AlgorithmReducer";

export const comReducer = combineReducers({
	createActionReducer,
	algorithmReducer,
});

export default comReducer;