import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./router/Router";

// js에서 super는 부모 클래스 생성자를 가르킨다.
// 여기선 Component가 되겠다.
class App extends Component {
	
	// 쿠키 가져오기
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	}
	
	// constructor, super에 props를 넣는 이유는 명확하게 props를 사용하기 위해서
	// props >> ...args가 props와 context까지 편하게 해결할 수 있음.
	constructor(props){
		// this.state 사용 불가능
		super(props)
		// this.state 사용 가능
		
		const { cookies } = props;
		
		this.state = {
			name: cookies.get("name")
		}
		
	}
	
	render() {
		return (
			<Router />
		);
	}
}

// export default App;
// = module.export = App의 역할

export default connect()(App);