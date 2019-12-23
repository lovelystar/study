import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch, logoutWatch, regContentsWatch } from "./Saga";
import { basicArrWatch, basicObjWatch, objectArrWatch, formDataWatch } from "./AlgorithmSaga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch(),
		logoutWatch(),
		regContentsWatch(),

		basicArrWatch(),
		basicObjWatch(),
		objectArrWatch(),
		formDataWatch(),

	]);
	
};

export default rootSaga;