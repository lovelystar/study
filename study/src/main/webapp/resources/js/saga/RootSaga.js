import { all } from "redux-saga/effects";
import { studyWatch, resourceWatch, logoutWatch } from "./Saga";
import { basicArrWatch, basicObjWatch, objectArrWatch, formDataWatch } from "./AlgorithmSaga";
import { boardWatch } from "./BoardSaga";

export function* rootSaga() {
	
	yield all([
		
		studyWatch(),
		resourceWatch(),
		logoutWatch(),
		
		// 게시판 관련
		boardWatch(),

		// data 관련
		basicArrWatch(),
		basicObjWatch(),
		objectArrWatch(),
		formDataWatch(),

	]);
	
};

export default rootSaga;