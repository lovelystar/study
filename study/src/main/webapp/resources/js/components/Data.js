import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import * as algorithmReducer from "../reducers/AlgorithmReducer";

import styled from "styled-components";

const DataButton = styled.button`
	border: 2px solid black;
	background: #ffffff;
	padding: 0.5rem;
	border-radius: 3px;
	transition: .2s ease;
	margin: 12px;
    font-size: 1.2rem;
    font-weight: bold;
	&:hover {
		background: black;
		color: white;
	}
`

class Data extends Component {
    
	constructor(props){

		super(props);
		this.state = {
		}
		
    }

    // 기본배열 형태 => a, b, c ...
    basicArrFunc = () => {

        const basicArrayData = new Array();
        basicArrayData.push("first");
        basicArrayData.push("second");
        basicArrayData.push("third");
        basicArrayData.push("fourth");
        basicArrayData.push("fifth");
        basicArrayData.push("sixth");
        basicArrayData.push("seventh");

        // props 뒤에 있는 basicArrayResult는 mapDispatchToProps에 있는 값으로
        this.props.basicArrayResult(basicArrayData);

    }

    // Object와 Map 형태 => [object Object]
    objectAndMapFunc = () => {
        
        const objectData = new Object();
        objectData.first = "number one";
        objectData.second = 2;
        objectData.third = 3;
        objectData.fourth = "number four";
        objectData.fifth = 5;

        // react사용하기 전에 내가 주로 사용하던 방법
        const mapData = {
            "name": "sumin",
            "age": 26,
            "career": 3,
            "number": "010-1234-5678",
        };
        mapData.email = "kr_alice@naver.com";

        for(let key in objectData){
            console.log("objectData for in key = " + key + ", values = " + objectData[key]);
        }

        for(let key in mapData){
            console.log("mapData for in key = " + key + ", values = " + mapData[key]);
        }

        // props 뒤에 있는 basicObjectResult는 mapDispatchToProps에 있는 값으로
        this.props.basicObjectResult(objectData);

    }

    // Object배열 형태 (배열인데 요소들이 Object) => [Object object], [Object object], [Object object], ...
    objectArrayFunc = () => {
        
        // 형태 만드는 방법
        const objectArray = new Array();
        let objectObject = new Object();

        objectObject.name = "hello";
        objectObject.age = 17;
        objectObject.career = 1;
        objectObject.number = "011-1111-1111";
        objectObject.email = "first@gmail.com";
        objectArray.push(objectObject);

        objectObject = new Object();

        objectObject.name = "world";
        objectObject.age = 18;
        objectObject.career = 2;
        objectObject.number = "022-2222-2222";
        objectObject.email = "second@naver.com";
        objectArray.push(objectObject);

        objectObject = new Object();

        objectObject.name = "sumin";
        objectObject.age = 19;
        objectObject.career = 3;
        objectObject.number = "033-3333-3333";
        objectObject.email = "third@gmail.com";
        objectArray.push(objectObject);

        // props 뒤에 있는 objectArrayResult는 mapDispatchToProps에 있는 값으로
        this.props.objectArrayResult(objectArray);

    }

    // FormData 형태 ( 단일 FormData, 다중 FormData )
    formDataFunc = () => {
        
        // props 뒤에 있는 formDataResult는 mapDispatchToProps에 있는 값으로
        this.props.formDataResult();

    }

    
	render() {
        
		return (
				
			<div>

				<Header />
                <h1>Console창에서 데이터를 확인하세요.</h1>

                <div style={{display: "inline-block"}} onClick={this.basicArrFunc.bind(this)}>
                    <DataButton>일반 배열</DataButton>
                </div>
                
                <div style={{display: "inline-block"}} onClick={this.objectAndMapFunc.bind(this)}>
                    <DataButton>Object와 Map</DataButton>
                </div>

                <div style={{display: "inline-block"}} onClick={this.objectArrayFunc.bind(this)}>
                    <DataButton>Object Array</DataButton>
                </div>

                <div style={{display: "inline-block"}} onClick={this.formDataFunc.bind(this)}>
                    <DataButton>FormData</DataButton>
                </div>

			</div>
			
		);
		
	}
	
};

const mapStateToProps = (state, props) => {
	
	return ({
		
		state: state,
		
	});
	
}

// formData의 fd는 단일 formdata 혹은 formdata array가 온다.
const mapDispatchToProps = dispatch => {
	
	return {
        basicArrayResult: (basicArrayData) => dispatch(algorithmReducer.basicArrExec(basicArrayData)),
        basicObjectResult: (objectData) => dispatch(algorithmReducer.basicObjExec(objectData)),
        objectArrayResult: (objectArray) => dispatch(algorithmReducer.objectArrExec(objectArray)),
        formDataResult: () => dispatch(algorithmReducer.formDataExec()),
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Data));