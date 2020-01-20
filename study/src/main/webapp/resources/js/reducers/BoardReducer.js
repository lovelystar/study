import { createAction, handleActions } from "redux-actions";

const initState = {
	payload: null,
	loading: false,
	boardContents: null,
};

export const regContents = createAction("REG_CONTENTS", (textObj) => (textObj)); // 콘텐츠 업로드
export const regContentsSucceed = createAction("REG_CONTENTS_SUCCEED", (payload) => (payload)); // 콘텐츠 업로드 성공

export const getBoard = createAction("BOARD_LIST", (curPage) => (curPage)); // 글 목록
export const getBoardSuccess = createAction("BOARD_LIST_SUCCESS", (payload) => (payload));

export const appError = createAction("APP_ERROR"); // 에러

export const BoardReducer = handleActions({
	
	[regContents]: (state, action) => {
		return {...state, loading: false, textObj: action.payload};
	},
	[regContentsSucceed]: (state, action) => {
		return {...state, loading: false};
	},
	
	[getBoard]: (state, action) => {
		return {...state, loading: true};
	},
	// boardsaga에서 put으로 값을 넘겨줌. action.payload로 받을 수 있고,
	// payload라는 변수는 initState에 있지만 result는 없다
	// 그러나 둘 다 받을 수 있고
	// component에서 this.props.state.BoardReducer.result(payload)로 받을 수 있음.
	[getBoardSuccess]: (state, action) => {
		// console.log("board action.payload = " + action.payload); // << [object Object]
		// console.log("board action.payload.data = " + action.payload.data); // [object Object] 안의 [object Object]들
		return {...state, loading: false, result: action.payload.data, payload: action.payload.data};
	},

	[appError]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: null, error: action.payload.error};
	},


	
}, initState);

export default BoardReducer;