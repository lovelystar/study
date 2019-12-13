import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import { Default, Navigation, DynamicPagination, ProgressPagination, FractionPagination, Scroll } from "../libraries/Swiper";

class Swiper extends Component {
	
	constructor(props){

		super(props);
		this.state = {
		}
		

	}
	
	render() {
		
		return (
				
			<div>

				<Header />
				<span>Swiper 테스트</span>

				<p>Default Swiper</p>
				<Default></Default>

				<p>Arrow( Navigation ) Swiper</p>
				<Navigation></Navigation>

				<p>DynamicPagination Swiper</p>
				<DynamicPagination></DynamicPagination>

				<p>ProgressPagination Swiper</p>
				<ProgressPagination></ProgressPagination>

				<p>FractionPagination Swiper</p>
				<FractionPagination></FractionPagination>

				<p>Scroll Swiper</p>
				<Scroll></Scroll>

			</div>
			
		);
		
	}
	
}

const mapStateToProps = (state, props) => {
	
	return ({
		
		state: state,
		
	});
	
}

const mapDispatchToProps = dispatch => {
	
	return {

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Swiper));