import { createAction, handleActions } from "redux-actions";

const initState = {
    resultCode: null,
    resultMessage: null,
};

export const basicArrExec = createAction("BASIC_ARRAY_EXECUTE", (arrData) => (arrData)); // 기본 배열 형태 넘기고 받기
export const basicObjExec = createAction("BASIC_OBJECT_EXECUTE", (objData) => (objData)); // 기본 Object, Map 형태 넘기고 받기
export const objectArrExec = createAction("OBJECT_ARRAY_EXECUTE", (objArrData) => (objArrData)); // Object Array 형태 넘기고 받기
export const formDataExec = createAction("FORMDATA_EXECUTE"); // FormData 형태 넘기고 받기
export const appError = createAction("APP_ERROR"); // 에러

export const algorithmReducer = handleActions({
	
	[basicArrExec]: (state, action) => {
		return {...state, resultCode: null, reusltMessage: null};
	},
	[basicObjExec]: (state, action) => {
		return {...state, resultCode: null, reusltMessage: null};
	},
	[objectArrExec]: (state, action) => {
		return {...state, resultCode: null, reusltMessage: null};
	},
	[formDataExec]: (state, action) => {
		return {...state, resultCode: null, reusltMessage: null};
	},
	[appError]: (state, action) => {
		return {...state, resultCode: null, reusltMessage: null};
	},
	
}, initState);

export default algorithmReducer;