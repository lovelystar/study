// App 컴포넌트를 불러와서 root에 렌더링하는 부분
// webpack에서 bundle된 파일
// react 라이브러리 + 기타 js 파일들이 하나로 합쳐짐

// import React from "react";
// = require("react"); 의 역할

// 이해한 흐름도
// action - dispatch - reducer - ( saga ) - state 변경 - getState - subscribe - render

// redux : 하위, 상위 컴포넌트에 데이터를 props로 넘겨주는게 관리하기 힘들어서 선택
// redux의 3가지 원칙
// 1. Single Source of Truth
// : 하나의 진실의 근원
// : state를 저장할 때 한 개의 store만을 사용.
// 2. State is read-only
// : state를 변경할 수 있는 유일한 방법은 action 뿐이다.
// : action을 dispatch해야만 state를 변경할 수 있다.
// 3. Change are made with Pure Functions
// : action을 dispatch하여 state를 변경하고, state를 업데이트 하는 것이 Reducer이다.
// : 즉, action-어떤 변화가 있는지 정의 + Reducer-action으로 state 변경

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import storeConfig from "./store/Store";
import { rootSaga } from "./saga/RootSaga";

// 아래 부트스트랩 설정을 해줘야 실제로 적용된다.
// component들만 추가해서는 적용 안됨.
import "bootstrap/dist/css/bootstrap.css";

// swiper css추가
import "swiper/css/swiper.css";
// import "swiper/css/swiper.min.css";
// import "swiper/swiper.scss";

// createAction redux-action 생성시 라이브러리를 사용하는 방법도 있다.
// store는 redux에서 가장 핵심적인 인스턴스이며
// 이 안에 현재 상태를 내장하고 있다.
// 상태가 업데이트 될 때마다 구독중인 함수들이 다시 실행되게 해준다.
const store = storeConfig();
store.runSaga(rootSaga);

const render = () => {
	
	ReactDOM.render(
		<CookiesProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</CookiesProvider>,
		document.getElementById("root")
	);
	
}

// 스토어에 구독하고, 뭔가 변화가 있으면 render 실행
store.subscribe(render);

// 렌더링
render();