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

export const getBoardInfo = createAction("BOARD_INFO", (boardIdx) => (boardIdx)); // 글 상세
export const getBoardInfoSuccess = createAction("BOARD_INFO_SUCCESS", (payload) => (payload));

export const like = createAction("LIKE", (param) => (param)); // 좋아요
export const likeResult = createAction("LIKE_RESULT", (payload) => (payload));

export const reply = createAction("REPLY_REG", (param) => (param)); // 댓글 등록
export const replySuccess = createAction("REPLY_REG_SUCCESS", (payload) => (payload));

export const getReply = createAction("REPLY", (param) => (param)); // 댓글 정보
export const getReplySuccess = createAction("REPLY_SUCCESS");

export const comments = createAction("COMMENTS_REG", (param) => (param)); // 덧글 정보
export const commentsSuccess = createAction("COMMENTS_REG_SUCCESS", (payload) => (payload));

export const modRC = createAction("MODIFY_REPLY_COMMENTS", (param) => (param)); // 댓글, 덧글 수정
export const modRCSuccess = createAction("MODIFY_RC_SUCCESS");

export const delRC = createAction("DELETE_REPLY_COMMENTS", (param) => (param)); // 댓글, 덧글 삭제
export const delRCSuccess = createAction("DELETE_RC_SUCCESS");

export const delBoard = createAction("DELETE_BOARD", (param) => (param)); // 게시물 삭제
export const delBoardSuccess = createAction("DELETE_BOARD_SUCCESS");

export const modBoard = createAction("MODIFY_BOARD", (param) => (param)); // 게시물 수정
export const modBoardSuccess = createAction("MODIFY_BOARD_SUCCESS");

export const rcLike = createAction("REPLY_COMMENT_LIKE", (param) => (param)); // 댓글 좋아요
export const rcLikeResult = createAction("REPLY_COMMENT_LIKE_RESULT", (payload) => (payload));

export const report = createAction("REPORT", (param) => (param));
export const reportResult = createAction("REPORT_RESULT");

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

	[getBoardInfo]: (state, action) => {
		return {...state, loading: true};
	},
	[getBoardInfoSuccess]: (state, action) => {
		return {...state, loading: false, result: action.payload.data, payload: action.payload.data, like: action.payload.data.likedUser};
	},

	[like]: (state, action) => {
		return {...state, loading: false};
	},
	[likeResult]: (state, action) => {
		return {...state, loading: false, likeResult: action.payload.data.resultInteger, like: action.payload.data.likedUser};
	},

	[reply]: (state, action) => {
		return {...state, loading: false};
	},
	[replySuccess]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},

	[appError]: (state, action) => {
		return {...state, loading: false, requestData: action.payload.requestData, message: null, error: action.payload.error};
	},

	[getReply]: (state, action) => {
		return {...state, loading: true};
	},
	[getReplySuccess]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},

	[comments]: (state, action) => {
		return {...state, loading: true};
	},
	[commentsSuccess]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},

	[modRC]: (state, action) => {
		return {...state, loading: true};
	},
	[modRCSuccess]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},
	
	[delRC]: (state, action) => {
		return {...state, loading: true};
	},
	[delRCSuccess]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},
	
	[delBoard]: (state, action) => {
		return {...state, loading: true};
	},
	[delBoardSuccess]: (state, action) => {
		return {...state, loading: false};
	},
	
	[modBoard]: (state, action) => {
		return {...state, loading: true};
	},
	[modBoardSuccess]: (state, action) => {
		return {...state, loading: false, result: action.payload.data, payload: action.payload.data, like: action.payload.data.likedUser};
	},

	[rcLike]: (state, action) => {
		return {...state, loading: false};
	},
	[rcLikeResult]: (state, action) => {
		return {...state, loading: false, reply: action.payload.data};
	},

	[report]: (state, action) => {
		return {...state, loading: false};
	},
	[reportResult]: (state, action) => {
		return {...state, loading: false, report: action.payload.data.resultMessage};
	}

	
}, initState);

export default BoardReducer;