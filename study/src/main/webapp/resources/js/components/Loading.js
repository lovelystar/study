import React from "react";
import { connect } from "react-redux";

let Loading = ({ loading }) => (
	
	loading ?
		<div style={{ textAlign: 'center' }}>
			<h1>LOADING...</h1>
		</div>
	: null
	
);

const mapStateToProps = (state) => {
	return ({
		loading: state.createActionReducer.loading
	});
};

Loading = connect (mapStateToProps, null)(Loading)

export default Loading;