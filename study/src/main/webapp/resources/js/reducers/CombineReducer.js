import { combineReducers } from "redux";
import createActionReducer from "./CreateActionReducer";
import algorithmReducer from "./AlgorithmReducer";
import BoardReducer from "./BoardReducer";

export const comReducer = combineReducers({
	createActionReducer,
	algorithmReducer,
	BoardReducer,
});

export default comReducer;