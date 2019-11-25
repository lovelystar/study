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
import { instanceOf } from "prop-types";

class Home extends Component {
	
	// 생성자 메소드로 컴포넌트 생성될 때 한번만 실행된다.
	// state값 설정
	constructor(props){
		// 여기선 this 사용 불가능
		super(props)
		// 여기선 this 사용 가능
		this.state = {
			key: "value",
			error: "err",
			num: 0,
			tf: true
		}
		
	}
	
	componentDidMount(){
		console.log("componentDidMount");
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
	
	render() {
		
		return (
				
				<div>TTTTTTTTTTTTTTTTTTTTTTTTTTTT</div>
				
		)
		
	}
	
}

// state - props
// store안의 state값을 props로 연결해준다.
// reducer를 합치게 되면
// 호출할 때 state.합칠 때 key.합칠 때 value
const mapStateToProps = (state, props) => {
	
	return ({
		
		state: state
		
	});
	
}

// dispatch - props
// 액션 생성자를 만들어서 액션을 생성하고
// 해당 액션을 dispatch하는 함수를 만든 후, 이를 props로 연결
const mapDispatchToProps = dispatch => {
	
	// 예시 ( onInc, onDec ... )
	// onInc: () => dispatch(action.INC()),
	// onDec: () => dispatch(action.DEC()),
	// onErr: () => {
	//		const error: getRandomColor(); >> https://velopert.com/3346
	//		dispatch(action.Err(error));
	// }
	return {
		
	};
	
}

// 컨테이너 컴포넌트를 store에 연결시키는 것이 connect
// HOME 컴포넌트의 Container 컴포넌트
// HOME 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할
export default connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Home);