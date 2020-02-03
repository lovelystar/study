// 어떤 동작은 promise payload를 리턴하고
// 어떤 동작은 plain object를 리턴하는데
// 어떤 동작은 dispatch로 다른 동작을 호출하고
// 이러한 일관성 없는 동작들은 비효율 적이다.

// 쉽게 말해서 saga란 어떠한 동작의 listener이다.
// 즉, 항상 듣고있다가 맞으면 실행하기 때문에 이벤트 리스너라고 생각하면 된다.

// 비동기 같이 단순하지 않은 작업들은 saga에 만들어둔다.
// 누군가 발생시킨 action이 saga와 연결된 액션타입과 맞으면 실행.

// 정리하자면 아래와 같다.
// 액션에는 "단순 리듀서와만 통신하는 액션" 과 "비동기 작업 ( 단순하지 않은 작업 )" 이 있다.
// 이 중 비동기 작업( API통신 )은 Saga에 작성한다.
// Saga에 액션타입명과 작성한 제너레이터 함수를 연결하게 되는데
// 이러면 액션을 계속 리스닝 하다가 일치하는 액션타입명이 발생할 때 해당 함수를 실행한다.

// 이 때 fetching 비동기 액션이 있다면, 내부적으로 다시 단순히 Reducer에 받아온 data를 넣어주는
// 단순히 Reducer와만 통신하는 액션이 함수 안에 있을 것이다.

import "regenerator-runtime/runtime";
import { delay, call, put, all, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as BoardReducer from "../reducers/BoardReducer";
import { axiosStudy, axiosAuth, axiosResource, axiosFormData } from "../api/AxiosApi";

export function* boardWatch() {
	yield takeLatest(BoardReducer.getBoard, getBoardAction); // 콘텐츠 업로드
	yield takeLatest(BoardReducer.getBoardInfo, getBoardInfoAction); // 글 목록
	yield takeLatest(BoardReducer.regContents, regContentsAction); // 글 상세
	yield takeLatest(BoardReducer.like, likeAction); // 좋아요
}

// 콘텐츠 업로드
function* regContentsAction(textObj) {
	
	try{
		
		/*
		const testForm = new FormData();
		const fileParam = contentsArray.payload;
		
		// 동적 FormData일 때
		const formDataArr = new Array;

		console.log("fileParam = " + fileParam);
		console.log("fileParam length = " + fileParam.length);

		const testForm = new FormData();
		contentsArray.payload.map((params, i) => {

			testForm.append("randomNames", params.randomName);
			testForm.append("files", params.file);

		});

		const fdResult = yield call([axiosFormData, axiosFormData.post], "/regcontents", testForm);
		*/

		let param = new FormData();
		const regParam = textObj.payload;
		
		for(let key in regParam){
			
			if(key == "fileList"){
				regParam[key].map((data) => {
					for(let key in data){
						// 파일 정보
						param.append(key, data[key]);
					}
					// param.append("randomNames", data.randomName);
					// param.append("files", data.file);
				})
			} else {
				// 텍스트 정보
				param.append(key, regParam[key]);
			}

		}
		
		for(let key of param) {
			console.log("param = " + key);
		}
		
		const fdResult = yield call([axiosFormData, axiosFormData.post], "/regcontents", param);
		const resultCode = fdResult.data.resultCode;

		if(resultCode == 1) {
			location.reload(true);
		}
		
	} catch(error) {
		
		yield put(BoardReducer.appError(error));
		
	}
}

// 글 목록
function* getBoardAction(curPage) {

    try{
		
		const param = new Object();
		param.page = curPage.payload;
		
		const result = yield call([axiosStudy, axiosStudy.post], "/boardlist", param);
		yield put(BoardReducer.getBoardSuccess(result));
		
	} catch(error) {
		
		yield put(BoardReducer.appError(error));
		
	}
}

// 글 상세
function* getBoardInfoAction(boardIdx) {
	
	try {
		
		const param = new Object();
		param.idx = boardIdx.payload;
		param.boardType = "board";

		const result = yield call([axiosStudy, axiosStudy.post], "/boardinfo", param);
		yield put(BoardReducer.getBoardInfoSuccess(result));
		
	} catch(error) {

	}

}

// 좋아요
function* likeAction(param) {
	try {
		
		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/boardlike", data);
		yield put(BoardReducer.likeResult(result));
		
		document.getElementById("board_likes").innerHTML = result.data.resultInteger;

	} catch(error) {

	}
}