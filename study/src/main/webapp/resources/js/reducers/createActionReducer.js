import { createAction, handleActions } from "redux-actions";

const initState = {
	requestData: null,
	payload: null,
	loading: false,
	message: null,
	error: null
};

const CLIENT_SERVER_REQUEST = "CLIENT_SERVER_REQUEST";
const CLIENT_SERVER_RECEIVED = "CLIENT_SERVER_RECEIVED";
const CALL_CLIENT_FAILURE = "CALL_CLIENT_FAILURE";
const REQUEST_API_USERNAME = "REQUEST_API_USERNAME";
const RECEIVED_API_SUCCEED_USERNAME = "RECEIVED_API_SUCCEED_USERNAME";
const LOGOUT = "LOGOUT";
const LOGOUT_SUCCEED = "LOGOUT_SUCCEED";
const CALL_API_FAILURE = "CALL_API_FAILURE";
const APP_ERROR = "APP_ERROR";

// createAction의 두 번째 인자는 payloadCreator로써 payload를 어떻게 정할 지 설정
export const clientServerRequest = createAction(CLIENT_SERVER_REQUEST, (requestData) => (requestData));
export const clinetServerReceived = createAction(CLIENT_SERVER_RECEIVED, (payload) => (payload));
export const clientFailure = createAction(CALL_CLIENT_FAILURE);
export const requestApiUsername = createAction(REQUEST_API_USERNAME);
export const receivedApiSuccess = createAction(RECEIVED_API_SUCCEED_USERNAME, (username) => (username));
export const logout = createAction(LOGOUT);
export const logoutSucceed = createAction(LOGOUT_SUCCEED);
export const apiFailure = createAction(CALL_API_FAILURE);
export const appError = createAction(APP_ERROR);

export const createActionReducer = handleActions({
	
	[CLIENT_SERVER_REQUEST]: (state, action) => {
		return {...state, loading: true, requestData: action.payload, message: null, error: null};
	},
	[CLIENT_SERVER_RECEIVED]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, payload: action.payload, message: null, error: null};
	},
	[CALL_CLIENT_FAILURE]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: action.payload.message, error: null};
	},
	[REQUEST_API_USERNAME]: (state, action) => {
		return {...state, loading: true, requestData: null, message: null, error: null};
	},
	[RECEIVED_API_SUCCEED_USERNAME]: (state, action) => {
		return {...state, loading: false, username: action.payload.data.username, message: null, error: null};
	},
	[LOGOUT]: (state, action) => {
		return {...state, loading: true, message: null, error: null};
	},
	[LOGOUT_SUCCEED]: (state, action) => {
		return {...state, loading: false, message: null, error: null};
	},
	[CALL_API_FAILURE]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: action.payload.message, error: null};
	},
	[APP_ERROR]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: null, error: action.payload.error};
	},
	
}, initState);

export default createActionReducer;