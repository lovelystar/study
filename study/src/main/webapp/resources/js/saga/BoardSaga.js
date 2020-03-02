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
	yield takeLatest(BoardReducer.reply, replyAction); // 댓글 등록
	yield takeLatest(BoardReducer.getReply, getReplyAction); // 댓글 목록 가져오기
	yield takeLatest(BoardReducer.comments, commentsAction); // 덧글 등록
	yield takeLatest(BoardReducer.modRC, modifyRCAction); // 댓글, 덧글 수정
	yield takeLatest(BoardReducer.delRC, deleteRCAction); // 댓글, 덧글 삭제
	yield takeLatest(BoardReducer.delBoard, deleteBoardAction); // 게시물 삭제
	yield takeLatest(BoardReducer.modBoard, modifyBoardAction); // 게시물 수정
	yield takeLatest(BoardReducer.rcLike, rcLikeAction); // 댓글 좋아요
	yield takeLatest(BoardReducer.report, reportAction); // 신고
}

// 콘텐츠 업로드
function* regContentsAction(textObj) {
	
	try{
		
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
		yield put(BoardReducer.appError(error));
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
		yield put(BoardReducer.appError(error));
	}
}

// 댓글 등록
function* replyAction(param) {
	try {
		
		let data = new FormData();
		const params = param.payload;

		for(let key in params){
			data.append(key, params[key]);
		}

		// const result = yield call([axiosStudy, axiosStudy.post], "/boardlike", data); // study는 content-type이 정해져 있기 때문에 axiosFormData 사용
		const result = yield call([axiosFormData, axiosFormData.post], "/regreply", data); // 파일 넘기기 위해서 사용 ( 파일 없을 수도 있을 수도 있기 때문 )
		yield put(BoardReducer.replySuccess(result));

	} catch(error) {
		yield put(BoardReducer.appError(error));
	}
}

// 댓글 목록 가져오기
function* getReplyAction(param) {
	
	try{

		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/getreply", data);

		yield put(BoardReducer.getReplySuccess(result));

	} catch(error) {

	}

}

// 덧글 등록
function* commentsAction(param) {
	
	try {

		let data = new FormData();
		const params = param.payload;

		for(let key in params){
			data.append(key, params[key]);
		}
		
		const result = yield call([axiosFormData, axiosFormData.post], "/regcomments", data);
		yield put(BoardReducer.commentsSuccess(result));

	} catch(error) {

	}

}

// 댓글, 덧글 수정
function* modifyRCAction(param) {

	try {

		let data = new FormData();
		const params = param.payload;

		for(let key in params){
			data.append(key, params[key]);
		}
		
		const result = yield call([axiosFormData, axiosFormData.post], "/modifyrc", data);
		yield put(BoardReducer.modRCSuccess(result));

	} catch(error) {

	}

}

// 댓글, 덧글 삭제
function* deleteRCAction(param) {

	try {

		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/deleterc", data);
		yield put(BoardReducer.delRCSuccess(result));

	} catch(error) {

	}

}

// 게시물 삭제
function* deleteBoardAction(param) {

	try {

		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/deleteboard", data);

		location.href="/study/board";
		
	} catch(error) {

	}

}

// 게시물 수정
function* modifyBoardAction(param) {

	try{
		
		let fd = new FormData();
		const modParam = param.payload;
		
		for(let key in modParam){
			
			if(key == "upldList"){
				modParam[key].map((data) => {
					for(let key in data){
						fd.append(key, data[key]);
					}
				});
			} else if(key == "delList") {
				modParam[key].map((data) => {
					for(let key in data){
						fd.append(key, data[key]); // rCode만 들어가있음
					}
				});
			} else {
				fd.append(key, modParam[key]);
			}
			
		}

		const fdResult = yield call([axiosFormData, axiosFormData.post], "/modcontents", fd);
		yield put(BoardReducer.modBoardSuccess(fdResult));

	} catch(error) {
		
		yield put(BoardReducer.appError(error));
		
	}
}

// 댓글 좋아요
function* rcLikeAction(param) {
	try {
		
		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/rclike", data);
		yield put(BoardReducer.rcLikeResult(result));

	} catch(error) {
		yield put(BoardReducer.appError(error));
	}
}

// 신고
function* reportAction(param) {
	try {
		
		const data = param.payload;
		const result = yield call([axiosStudy, axiosStudy.post], "/report", data);
		yield put(BoardReducer.reportResult(result));
		
	} catch(error) {
		yield put(BoardReducer.appError(error));
	}
}