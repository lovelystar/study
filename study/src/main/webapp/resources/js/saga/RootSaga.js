import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch } from "./Saga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch()
		
	]);
	
};

export default rootSaga;