import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch, logoutWatch } from "./Saga";
import { basicArrWatch, basicObjWatch, objectArrWatch, formDataWatch } from "./AlgorithmSaga";
import { regContentsWatch, boardListWatch } from "./BoardSaga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch(),
		logoutWatch(),
		
		regContentsWatch(),
		boardListWatch(),

		basicArrWatch(),
		basicObjWatch(),
		objectArrWatch(),
		formDataWatch(),

	]);
	
};

export default rootSaga;