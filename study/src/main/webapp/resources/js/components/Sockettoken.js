import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";

class Sockettoken extends Component {
	
	constructor(props){
		super(props);
		this.state = {

		}
		

	}
	
	componentDidMount(){

	}
	
	render() {
		
		return (
				
			<div>
                
				<Header />

                <Footer />
				
			</div>
			
		);
		
	}
	
}

const mapStateToProps = (state, props) => {
	
	return ({

	});
	
}

const mapDispatchToProps = dispatch => {
	
	return {

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Sockettoken));