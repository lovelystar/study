import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch, logoutWatch } from "./Saga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch(),
		logoutWatch()
		
	]);
	
};

export default rootSaga;