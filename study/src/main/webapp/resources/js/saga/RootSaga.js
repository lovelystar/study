import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch, logoutWatch, regContentsWatch } from "./Saga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch(),
		logoutWatch(),
		regContentsWatch(),
		
	]);
	
};

export default rootSaga;