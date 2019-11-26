// Redux를 다룰 때 주의할 점은 Reducer가 반드시 순수함수여야 한다는 것이다.
// 순수함수란 부수 효과가 없는 함수.
// 즉, 어떤 함수에 동일한 인자를 주었을 때 "항상" 같은 값을 리턴하는 함수인 것이다.
// + 외부의 상태를 변경하지 않는 함수

// 순수함수가 지켜야 할 것들은 아래와 같다.
// 1. 외부 네트워크 혹은 DB에 접근 x
// 2. return 값은 오로지 parameter에만 의존
// 3. 인수 변경은 x
// 4. 같은 인수로 실행된 함수는 항상 같은 결과를 return
// 5. 순수하지 않은 API 호출 금지. ( DATE, Math 등 )

// 순수함수 예시
// bad : 
// let c = 20;
// const add = (x, y) => { c = y; x+y; } ( 값을 세팅하면 변수값이 달라지기 때문에 )

// good :
// const c = 20;
// const add = (x, y) => { c = y; x+y; } ( 값을 세팅해도 변수 값이 변하지 않기 때문에 )

import { combineReducers } from "redux";

// 리듀서의 초기상태 값 설정
const initState = {
	key: "value",
	error: "err",
	num: 0,
	tf: true
}

// Reducer함수 정의
// Reducer는 state와 action을 파라미터로 받고 초기화시킨 상태값을 받는다.
// 즉, state가 undefined일 때 ( 처음 스토어가 만들어질 때 ) state의 기본값을 초기화시킨 값으로 받는다.
// action.type에 따라 구분하고, 새로운 상태를 만들어 반환한다. ( store에 넘겨준다. )
// 기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야 하고
// 절대로 state값을 직접 수정하면 안된다.
const reducer = (state = initState, action) => {
	
	// 액션 타입에 따라 동기와 비동기로 구분
	// 비동기 액션은 saga에서 확인
	
//	switch(action.type){
//		case actionTypes.REQUEST_API_USERNAME:
//			return {...state, tf: true, num: 1};
//		case actionTypes.RECEIVED_API_USERNAME:
//			return {...state, tf: true, num: 1, key: action.payload.username};
//		default:
//			return state;
//	}
	
	// 예시
	// actionTypes가 INC, DEC, ERR인 것들은 동기이므로 바로 처리해서 상태값을 업데이트하여 반환했고
	// actionTypes가 RECEIVED_API_USERNAME인 것은 saga로 넘어가서 처리
	// saga에서 항상 대기하고 있다가
	// receivedApiUserNAme이 들어와서 실행시키고, 상태값을 반환
//	switch(action.type){
//		case actionTypes.INC:
//			return {
//				...state, error: "++", loading: true
//			};
//		case actionTypes.DEC:
//			return{
//				...state, error: "--", loading: true
//			};
//		case actionTypes.ERR:
//			return {
//				...state, error: "err", loading: false
//			};
//		case actionTypes.RECEIVED_API_USERNAME:
//			return {
//				...state, username: action.payload.username, loading: false, error: null
//			}
//		default:
//			return state;
//	}
	
	return state;
	
}

export default reducer;