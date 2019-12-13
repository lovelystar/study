import { createAction, handleActions } from "redux-actions";

const initState = {
	requestData: null,
	payload: null,
	loading: false,
	message: null,
	error: null,
	contentsArray: null,
};

// createAction의 두 번째 인자는 payloadCreator로써 payload를 어떻게 정할 지 설정
export const clientServerRequest = createAction("CLIENT_SERVER_REQUEST", (requestData) => (requestData)); // backend 요청
export const clinetServerReceived = createAction("CLIENT_SERVER_RECEIVED", (payload) => (payload)); // backend 요청 후 되돌려 받는 데이터
export const clientFailure = createAction("CLIENT_FAILURE"); // backend 요청 실패

export const requestResource = createAction("REQUEST_RESOURCE", (reqData) => (reqData)); // resource 서버 요청
//export const receivedResourceSucceed = createAction("RECEIVED_RESOUCE_SUCCEED", (username) => (username)); // resource 서버 요청 후 되돌려 받는 데이터
export const receivedResourceSucceed = createAction("RECEIVED_RESOUCE_SUCCEED", (payload) => (payload)); // resource 서버 요청 후 되돌려 받는 데이터

export const logout = createAction("LOGOUT", (logoutData) => (logoutData)); // 로그아웃 성공
export const logoutSucceed = createAction("LOGOUT_SUCCEED"); // 로그아웃 실패
export const apiFailure = createAction("API_FAILURE"); // api 요청 실패
export const appError = createAction("APP_ERROR"); // 에러

export const regContents = createAction("REG_CONTENTS", (contentsArray) => (contentsArray)); // 콘텐츠 업로드
export const regContentsSucceed = createAction("REG_CONTENTS_SUCCEED"); // 콘텐츠 업로드 성공

export const createActionReducer = handleActions({
	
	[clientServerRequest]: (state, action) => {
		return {...state, loading: true, requestData: action.payload, message: null, error: null};
	},
	[clinetServerReceived]: (state, action) => {
		return {...state, loading: false, cookieToken: action.payload, message: null, error: null};
	},
	[clientFailure]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: action.payload.message, error: null};
	},
	
	[requestResource]: (state, action) => {
		return {...state, loading: true, requestData: action.payload, message: null, error: null};
	},
	[receivedResourceSucceed]: (state, action) => {
		return {...state, loading: false, payload: action.payload.data, message: null, error: null};
	},
	
	[logout]: (state, action) => {
		return {...state, loading: false, message: null, error: null};
	},
	[logoutSucceed]: (state, action) => {
		return {...state, loading: false, message: null, error: null};
	},
	[apiFailure]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: action.payload.message, error: null};
	},
	[appError]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: null, error: action.payload.error};
	},


	[regContents]: (state, action) => {
		return {...state, loading: false, contentsArray: action.payload, message:null, error: null};
	},
	[regContentsSucceed]: (state, action) => {
		return {...state, loading: false, message: null, error: null};
	},

	
}, initState);

export default createActionReducer;