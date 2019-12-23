import "regenerator-runtime/runtime";
import { delay, call, put, all, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as algorithmReducer from "../reducers/AlgorithmReducer";
import { axiosStudy, axiosFormData } from "../api/AxiosApi";

// 기본 배열 형태 넘기고 받기
export function* basicArrWatch() {
	yield takeLatest(algorithmReducer.basicArrExec, basicArrAction);
}

// 기본 Object, Map 형태 넘기고 받기
export function* basicObjWatch() {
	yield takeLatest(algorithmReducer.basicObjExec, basicObjAction);
}

// Object Array 형태 넘기고 받기
export function* objectArrWatch() {
	yield takeLatest(algorithmReducer.objectArrExec, objectArrAction);
}

// FormData 형태 넘기고 받기
export function* formDataWatch() {
	yield takeLatest(algorithmReducer.formDataExec, formDataAction);
}

// 기본 배열 형태 넘기고 받기
function* basicArrAction(requestData) {

	try{

		// console.log("requestData = " + requestData.payload); // first, second, third, ...
		const basicArrRequestData = requestData.payload;

        basicArrRequestData.forEach((items) => {
            console.log("items = " + items);
        });
		
        // for in은 key값이 있을때 돌리세요 없으면 key값은 index처럼 올라갑니다.
        // for of는 key값이 없을 때 key에 몰아서 들어가 있습니다. (ex. FormData)
        for(let key in basicArrRequestData){
            console.log("in basicArrRequestData key = " + key + ", values = " + basicArrRequestData[key]);
        }

        for(let key of basicArrRequestData){
            console.log("of basicArrRequestData key = " + key + ", values = " + basicArrRequestData[key]);
		}

		const basicArrResult = yield call([axiosStudy, axiosStudy.post], "/arrlist", basicArrRequestData);
		console.log("basicArrResult = " + basicArrResult);
		
	} catch(error) {
		
		yield put(algorithmReducer.appError(error));
		
	}
	
}

// 기본 Object, Map 형태 넘기고 받기
function* basicObjAction(requestData) {

	try{

		// console.log("requestData = " + requestData.payload); // [Object object]
		const basicObjRequestData = requestData.payload;
		
        const basicObjResult = yield call([axiosStudy, axiosStudy.post], "/objdata", basicObjRequestData);
		console.log("basicObjResult = " + basicObjResult);
		
	} catch(error) {
		
		yield put(algorithmReducer.appError(error));
		
	}
	
}

// Object Array 형태 넘기고 받기
function* objectArrAction(requestData) {
	
	try{

		const objectArrRequestData = requestData.payload;
        // console.log("objectArray = " + objectArrRequestData); // [Object object], [Object object], [Object object], ...
        
        // map함수를 이용해서 objectArray 요소들 확인
        objectArrRequestData.map((objectList, i) => {
            console.log("map 함수 objectList.name = " + objectList.name);
            console.log("map 함수 objectList.age = " + objectList.age);
            console.log("map 함수 objectList.career = " + objectList.career);
            console.log("map 함수 objectList.number = " + objectList.number);
            console.log("map 함수 objectList.email = " + objectList.email);
        });

        for(let obj of objectArrRequestData){
            for(let objKey in obj){
                console.log("2중 for 문으로 해체 objKey = " + objKey + ", values = " + obj[objKey]);
            }
		}
		
		const objectArrayResult = yield call([axiosStudy, axiosStudy.post], "/objarr", objectArrRequestData);
		console.log("objectArrayResult = " + objectArrayResult);

	} catch(error) {
		
		yield put(algorithmReducer.appError(error));
		
	}

}

// FormData 형태 넘기고 받기
function* formDataAction() {
	
	try{

		console.log("formDataAction");

		// formData
        const formData = new FormData();
		
		formData.append("singleName", "singleNameValue");
		formData.append("singleName", "singleNameValue2");
		formData.append("singleName", "singleNameValue3");
		formData.append("singleName", "singleNameValue4");
		formData.append("singleName", "singleNameValue5");

        formData.append("singleAge", "singleAgeValue");
        formData.append("singleCareer", "singleCareerValue");
        formData.append("singleNumber", "singleNumberValue");
		formData.append("singleEmail", "singleEmailValue");
		
		const fdResult = yield call([axiosFormData, axiosFormData.post], "/formData", formData);

	} catch(error) {
		
		yield put(algorithmReducer.appError(error));
		
	}

}