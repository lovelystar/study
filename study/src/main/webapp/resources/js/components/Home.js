// react 라이프 사이클

// React를 사용하면 각 component 단위로 UI를 보이게하고, 변경하고, 삭제할 수 있다.
// 따라서 각각의 Component들은 생성 - 업데이트 - 제거 단계를 차례로 겪는 Life Cycle 을 가지고 있다.

// 1. 생성 ( Mounting )
// Component가 새롭게 생성되는 시점.
// Component가 실행되고 결과물로 나온 Element가 가상 DOM에 삽입되고 실제 DOM을 업데이트 하기까지의 과정

// - constructor

// - componentWillMount ( deprecated ) : "UNSAFE_" 붙이면 사용은 가능
// : React 엘리멘트를 실제 DOM 노드에 추가하기 직전
// : DOM이 생성되지 않아서 조작할 수 없고, render가 호출되기 이전이므로 setState를 하더라도 render가 호출되지 않음

// - render
// : 컴포넌트 렌더링

// - componentDidMount
// : 컴포넌트가 만들어지고 render가 호출된 이후
// : Ajax나 타이머를 생성하는 코드를 작성하는 부분

// 2. 업데이트
// props 또는 state의 변경으로 해당 컴포넌트가 re-render되는 경우

// 2-1) Props Change
// - componentWillReceiveProps ( deprecated ) : "UNSAFE_" 붙이면 사용은 가능
// : 컴포넌트 생성 후 첫 렌더링을 마친 후 호출되는 메소드
// : props를 받아서 state를 변경해야 하는 경우 유용
// : setState하더라도 렌더링 x

// - shouldComponentUpdate
// : 컴포넌트 업데이트 직전에 호출
// : props 또는 state가 변경됐을 때 재랜더링 여부를 return true/false로 결정

// - componentWillUpdate ( deprecated ) : "UNSAFE_" 붙이면 사용은 가능
// : shouldComponentUpdate가 불린 이후에 컴포넌트 업데이트 직전에서 호출되는 메소드
// : 새로운 props 또는 state가 반영되기 직전 새로운 값들을 받는다.
// : 이 메서드 안에서 this.setState()를 사용하면 무한 루프가 일어나게 되므로 사용하면 안된다.

// - render

// - componentDidUpdate
// : 컴포넌트 업데이트 직후 호출되는 메소드

// 2-2) State Change
// - shouldComponentUpdate
// - componentWillUpdate ( deprecated ) : "UNSAFE_" 붙이면 사용은 가능
// - render
// - componentDidUpdate

// 3. 제거 ( Unmounting )
// - componentWillUnmount
// : 컴포넌트가 소멸된 시점 ( DOM 삭제 후 )에 실행되는 메소드
// : 컴포넌트 내부에서 타이머나 비동기 API사용하고 있을 때 이를 제거할 때 유용


// 추가된 Life Cycle
// : getDerivedStateFromProps - componentWillReceiveProps 대체 메소드
// : getSnapshotBeforeUpdate - componentWillUpdate 대체 메소드
// : componentDidCatch - 컴포넌트 에러 핸들링 API 추가

// deprecated된 이유
// : Many of these issues are exacerbated by a subset of the component lifecycles
// : React 커뮤니티에서 가장 혼란을 가져오는 Life Cycle

// 이전코드
// componentWillReceiveProps(nextProps) { 
// 	if(this.props.name !== nextProps.name){ this.setState({ name : nextProps.name }); }
// }

// 개선된 코드
// static getDerivedStateFromProps(nextProps, prevState){
//	if(prevState.name !== nextProps.name){ 
//		return { name: nextProps.name };
//	}
// 	return null;
// }

import React, { Component } from "react";
import { connect, userStore } from "react-redux";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { axiosStudy, axiosAuth, axiosResource } from "../api/AxiosApi";
import * as createActionReducer from "../reducers/CreateActionReducer";
import Header from "./Header";
import Loading from "./Loading";

class Home extends Component {
	
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	
	// 생성자 메소드로 컴포넌트 생성될 때 한번만 실행된다.
	// state값 설정
	constructor(props){
		// 여기선 this 사용 불가능
		super(props);
		// 여기선 this 사용 가능
		
		const { cookies } = this.props;
		this.state = {
			csrf: cookies.get("XSRF-TOKEN"),
			username: document.getElementById("username").value,
			key: "value",
			error: "err",
			num: 0,
			tf: true
		}
		
		this.logoutBtn = this.logoutBtn.bind(this);

	}
	
	// 컴포넌트가 만들어지고 render가 호출된 이후
	// ajax 코드 작성
	componentDidMount(){
		console.log("componentDidMount");
		this.getStudyCookieToken();
	}
	
	shouldComponentUpdate(){
		console.log("shouldComponentUpdate");
		return true;
	}
	
	componentDidUpdate(){
		console.log("componentDidUpdate");
	}
	
	componentWillUnmount(){
		console.log("componentWillUnmount");
	}
	
	// async () 이건 >> "async function () {}" 의 축약
	getStudyCookieToken = async () => {
		
		// state에 호출해 둠.
//		const username = document.getElementById("username").value;
		
		// username이 null이 아닐 때
//		if(username != null) {
		
		// state 초기에 세팅
		if(this.state.username != null) {
			
			axiosStudy.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
			axiosAuth.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
			axiosResource.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
			
			const reqData = {
				"username" : this.state.username,
				"userName" : this.state.username
			};
			
			this.props.getCookieToken(reqData);
			
		}
		
	}
	
	logoutBtn = async() => {
		
		// let checkValue = username.value;
		// getStudyCookieToken에서 설정한 username을 여기서 또 쓸 수는 없다 ( const 이므로 )
		// 값을 가져오려면 username.value로 가져올 수 있다.
		
		let checkValue = this.state.username;
		
		axiosStudy.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
		axiosAuth.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
		axiosResource.defaults.headers.common["X-XSRF-TOKEN"] = this.state.csrf;
		
		let strData = checkValue;
		let objData = {
			"username" : checkValue
		};
		
		this.props.studyLogout(objData);
		
	}
	
	render() {
		
		// return 하기 전에 가져온 list, map custom
		// 갑자기 이 reducer는 어디서 나온거야;
		const authority = this.props.state.createActionReducer.payload;
		const resourceAuthorityList = 
			
			authority != null ?
				
				// 해당 정보는 resource 서버의
				// roleHierarchy.xml의 getUserResource에서 가져온다.
				
				// List<Map<String, Object>> 형태를 뽑아내는 방법
				// .map이라는 자바스크립트의 내장함수를 사용
				
				// (list) => (...) 를 풀어쓰면 function 익명(list) (...)
				// 즉, .map을 이용하여 반복시키고 내부내용은 list라는 변수에 담는다.
				
				// 중괄호 || 소괄호    =>  js의 모든 함수는 return이 있어야 한다.
				// {}로 묶으면 function ...() {} >>> return이 명시되어 있다.
				// ()로 묶으면 function ...() () >>> ()안의 값이 return이 된다. ( return 생략 o ) + html tag나 component를 담는다.
				// []로 묶으면 function ...() [] >>> []안의 값이 return이 된다. ( return 생략 o ) + Array나 여러개의 component를 담는다.
					
					authority.map((list, i) => (
					<tr key={list.idxOauthResource}>
						<td>{list.resourceName}</td>
						<td>{list.resourceType}</td>
						<td>{list.resourceId}</td>
						<td>{list.resourcePattern}</td>
						<td>{list.httpMethod}</td>
						<td>{list.authority}</td>
						<td>{list.userName}</td>
						<td>{i + 1}</td>
					</tr>
				)) : null;
				
//				<span>login user : {this.props.username}</span>
				
		return (
				
			<div>
				<Header />
				<span>메인페이지</span>
				<p></p>
				<Loading />
				<div id="divResourceAuthorityForm">
					<table border="1">
						
						<thead>
							<tr>
								<th>resource name</th>
								<th>resource type</th>
								<th>resource url</th>
								<th>resource url pattern</th>
								<th>resource http method</th>
								<th>resource authority</th>
								<th>resource user</th>
								<th>count</th>
							</tr>
						</thead>
						
						<tbody id="tbodyResourceAuthorityForm">
							{resourceAuthorityList}
						</tbody>
						
					</table>
				</div>
				<p></p>
				<button onClick={this.logoutBtn}>logout</button>
			</div>
			
		);
		
	}
	
}

// state - props
// (function) store안의 state값을 props로 연결해준다.
// props가 명시될 경우 이를 통해 함수 내부에서 컴포넌트의 props 값에 접근할 수 있다.
// reducer를 합치게 되면
// 호출할 때 state.합칠 때 key.합칠 때 value
const mapStateToProps = (state, props) => {
	
	return ({
		
		state: state,
		username: state.createActionReducer.username,
		cookies: props.cookies,
		userCookie: state.createActionReducer.payload
		
	});
	
}

// dispatch - props
// 액션 생성자를 만들어서 액션을 생성하고 ( reducer )
// 해당 액션을 dispatch하는 함수를 만든 후, 이를 props로 연결
// 컴포넌트의 특정 함수형 props가 실행 됐을 때, 개발자가 지정한 action을 dispatch 하도록 설정
const mapDispatchToProps = dispatch => {
	
	// 예시 ( onInc, onDec ... )
	// onInc: () => dispatch(action.INC()),
	// onDec: () => dispatch(action.DEC()),
	// onErr: () => {
	//		const error: getRandomColor(); >> https://velopert.com/3346
	//		dispatch(action.Err(error));
	// }

	// onClick을 확인해보면 this.props.logout이 있는데 props뒤에 있는 logout을 이용하여
	// 액션을 dispatch 할 것이라고 만드는 부분이다.
	return {
		getCookieToken: (reqData) => dispatch(createActionReducer.clientServerRequest(reqData)),
//		studyLogout: () => dispatch(createActionReducer.logout())
		studyLogout: (objData) => dispatch(createActionReducer.logout(objData))
	};
	
}

// 컨테이너 컴포넌트를 store에 연결시키는 것이 connect
// HOME 컴포넌트의 Container 컴포넌트
// HOME 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할
export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Home));