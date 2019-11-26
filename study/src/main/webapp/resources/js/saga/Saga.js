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
import * as createActionReducer from "../reducers/createActionReducer";
import { axiosStudy, axiosAuth, axiosResource } from "../api/AxiosApi";

export function* studyWatch() {
	yield takeLatest(createActionReducer.clientServerRequest, studyAction);
}

export function* resourceWatch() {
	yield takeLatest(createActionReducer.requestApiUsername, resourceAction);
}

// study ( client ) _ 현재 프로젝트 서버 호출
function* studyAction(requestData, dispatch) {
	
	try{
		
		const response = yield call([axiosStudy, axiosStudy.post], "/client/cookie/token", requestData.payload);
		const cookieToken = yield put(createActionReducer.clinetServerReceived(response.data));
		
		axiosResource.defaults.headers.common["Authorization"] = cookieToken.payload;
		
		yield put(createActionReducer.requestApiUsername());
		
	} catch(error) {
		
		yield put(createActionReducer.appError(error));
		
	}
	
}

function* resourceAction() {
	
	try{
		
		const data = yield call([axiosResource, axiosResource.post], "/authenticated/username");
		yield put(createActionReducer.receivedApiSuccess(data));
		
	} catch(error) {
		
		yield put(createActionReducer.appError(error));
		
	}
	
}