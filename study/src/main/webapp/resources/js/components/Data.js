import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";

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

        console.log("basicArrFunc");

        // 기본배열
        //const arrayDataResult = yield call([axiosStudy, axiosStudy.post], "/arrlist", arrayData);
        
        const basicArrayData = new Array();
        basicArrayData.push("first");
        basicArrayData.push("second");
        basicArrayData.push("third");
        basicArrayData.push("fourth");
        basicArrayData.push("fifth");
        basicArrayData.push("sixth");
        basicArrayData.push("seventh");

        console.log("basicArrayData = " + basicArrayData);

        basicArrayData.forEach((items) => {
            console.log("items = " + items);
        });

        // for in은 key값이 있을때 돌리세요 없으면 key값은 index처럼 올라갑니다.
        // for of는 key값이 없을 때 key에 몰아서 들어가 있습니다. (ex. FormData)
        for(let key in basicArrayData){
            console.log("in basicArrayData key = " + key + ", values = " + basicArrayData[key]);
        }

        for(let key of basicArrayData){
            console.log("of basicArrayData key = " + key + ", values = " + basicArrayData[key]);
        }

    }

    // Object와 Map 형태 => [object Object]
    objectAndMapFunc = () => {
        
        console.log("objectAndMapFunc");
        console.log("first shape");

        //const objectDataResult = yield call([axiosStudy, axiosStudy.post], "/objdata", objectData);
		//const objectDataResult = yield call([axiosStudy, axiosStudy.post], "/objdata", mapData);

        const objectData = new Object();
        objectData.first = "number one";
        objectData.two = 2;
        objectData.three = 3;
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

        console.log("objectData = " + objectData); // [object Object] 로 나온다.
        console.log("mapData = " + mapData); // [object Object] 로 나온다.

        for(let key in objectData){
            console.log("objectData for in key = " + key + ", values = " + objectData[key]);
        }

        for(let key in mapData){
            console.log("mapData for in key = " + key + ", values = " + mapData[key]);
        }

    }

    // Object배열 형태 (배열인데 요소들이 Object) => [{}, {}, {}, {}, {}...]
    objectArrayFunc = () => {
        
        console.log("objectArrayFunc");
        //const objectArrayResult = yield call([axiosStudy, axiosStudy.post], "/regcontents", objectArray);
        
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

        console.log("objectArray = " + objectArray);
        
        // map함수를 이용해서 objectArray 요소들 확인
        objectArray.map((objectList, i) => {
            console.log("map 함수 objectList.name = " + objectList.name);
            console.log("map 함수 objectList.age = " + objectList.age);
            console.log("map 함수 objectList.career = " + objectList.career);
            console.log("map 함수 objectList.number = " + objectList.number);
            console.log("map 함수 objectList.email = " + objectList.email);
        });

        for(let obj of objectArray){
            for(let objKey in obj){
                console.log("2중 for 문으로 해체 objKey = " + objKey + ", values = " + obj[objKey]);
            }
        }

    }

    // FormData 형태 ( 단일 FormData, 다중 FormData )
    formDataFunc = () => {
        
        console.log("formDataFunc");

        // 단일 formData
        const singleFormData = new FormData();
        singleFormData.append("singleName", "singleNameValue");
        singleFormData.append("singleAge", "singleAgeValue");
        singleFormData.append("singleCareer", "singleCareerValue");
        singleFormData.append("singleNumber", "singleNumberValue");
        singleFormData.append("singleEmail", "singleEmailValue");

        // 다중 formData
        const multipleFormDataArr = new Array();
        multipleFormDataArr[0] = new FormData();
        multipleFormDataArr[1] = new FormData();
        multipleFormDataArr[2] = new FormData();
        
        multipleFormDataArr[0].append("multipleName", "multipleNameValue");
        multipleFormDataArr[0].append("multipleAge", "multipleAgeValue");
        multipleFormDataArr[0].append("multipleCareer", "multipleCareerValue");
        multipleFormDataArr[0].append("multipleNumber", "multipleNumberValue");
        multipleFormDataArr[0].append("multipleEmail", "multipleEmailValue");
        
        multipleFormDataArr[1].append("multipleName", "multipleNameValue");
        multipleFormDataArr[1].append("multipleAge", "multipleAgeValue");
        multipleFormDataArr[1].append("multipleCareer", "multipleCareerValue");
        multipleFormDataArr[1].append("multipleNumber", "multipleNumberValue");
        multipleFormDataArr[1].append("multipleEmail", "multipleEmailValue");
        
        multipleFormDataArr[2].append("multipleName", "multipleNameValue");
        multipleFormDataArr[2].append("multipleAge", "multipleAgeValue");
        multipleFormDataArr[2].append("multipleCareer", "multipleCareerValue");
        multipleFormDataArr[2].append("multipleNumber", "multipleNumberValue");
        multipleFormDataArr[2].append("multipleEmail", "multipleEmailValue");
        
        console.log("singleFormData = " + singleFormData);
        console.log("multipleFormDataArr = " + multipleFormDataArr);

        multipleFormDataArr.map((eachFd, i) => {

            // formdata는 of를 사용하고, key에 key, value가 들어가있다.
            for(let key of eachFd){
                console.log("of eachFd key = " + key + ", values = " + eachFd[key]);
            }
            
        });
        

    }

    
	render() {
        
		return (
				
			<div>

				<Header />
                <h1>Console창에서 데이터를 확인하세요.</h1>

                <div style={{display: "inline-block"}} onClick={this.basicArrFunc}>
                    <DataButton>일반 배열</DataButton>
                </div>
                
                <div style={{display: "inline-block"}} onClick={this.objectAndMapFunc}>
                    <DataButton>Object와 Map</DataButton>
                </div>

                <div style={{display: "inline-block"}} onClick={this.objectArrayFunc}>
                    <DataButton>Object와 Map</DataButton>
                </div>

                <div style={{display: "inline-block"}} onClick={this.formDataFunc}>
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

const mapDispatchToProps = dispatch => {
	
	return {
        
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Data));