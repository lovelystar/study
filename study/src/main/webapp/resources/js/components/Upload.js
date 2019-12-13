import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import styled from "styled-components";
import * as createActionReducer from "../reducers/CreateActionReducer";
import Header from "./Header";

import classNames from "classnames/bind";
import scss from "../../scss/main.scss";
const scsscn = classNames.bind(scss);

import { FileDeleteBtn, ContentsRegBtn } from "./Button.js";

const UploadWrap = styled.div`

    cursor: default;
    display: table;
    width: 100%;
    height: 230px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    background: #eeeeee;
    text-align: center;
    &:hover {
        border: 2px solid #59bce0;
        font-weight: bold;
    }
    
`;

let fileFormData = new FormData;
let fileArray = new Array;
let checkArray = new Array;
let contentsArray = new Array;

class Upload extends Component {
    
	constructor(props){

		super(props);
		this.state = {
            uploadList : [],
            checkList : [],
            isAllChecked : false,
		}
		
        this.dragEnter = this.uploadFormEnter.bind(this);
        this.dragOver = this.uploadFormOver.bind(this);
        this.fileDrop = this.uploadFormDrop.bind(this);
        this.uploadDelete = this.uploadDelete.bind(this);

    }
    
	uploadFormEnter = async(e) => {
        
        e.preventDefault();
        e.stopPropagation();

    }

    uploadFormOver = async(e) => {

        e.preventDefault();
        e.stopPropagation();

    }

    uploadFormDrop = async(e) => {

        e.preventDefault();
        e.stopPropagation();

        let files = e.dataTransfer.files;

        for(let i=0; i<files.length; i++){
            
            let fileObject = new Object();
            let randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            
            fileObject.fileName = files[i].name;
            fileObject.fileSize = files[i].size;
            fileObject.file = files[i];
            fileObject.randomName = randomName;

            let sizeKB = files[i].size / 1024;
            let sizeMB = sizeKB / 1024;
            let sizeGB = sizeMB / 1024;
            let sizeUnit;

            sizeUnit = sizeKB > 1024 ? sizeMB.toFixed(2) + " MB" : sizeKB.toFixed(2) + " KB";
            sizeUnit = sizeMB > 1024 ? sizeGB.toFixed(2) : sizeUnit;
            
            fileObject.sizeUnit = sizeUnit;

            fileArray.push(fileObject);
            contentsArray.push(fileObject);
            checkArray.push(false);

        }

        this.setState({
            uploadList : fileArray,
            checkList : checkArray,
        });

        let uploadHeader = document.getElementsByClassName("uploadHeader");
        let uploadDelete = document.getElementsByClassName("uploadDelete");

        uploadHeader[0].style.display = "block";
        uploadDelete[0].style.display = "inline-block";

    }

    checkChange = (e) => {

        let tempArr = this.state.checkList;
        let eValue = e.target.value;
        let upldChkClass = 0;

        const upldClass = document.getElementsByClassName("upld_file");

        if(tempArr[eValue] == false){
            
            tempArr[eValue] = true;

        } else {
            
            tempArr[eValue] = false;

        }

        this.setState({
            checkList: tempArr,
        });

        
        for(let upldKey=0; upldKey<upldClass.length; upldKey++){
            if(upldClass[upldKey].checked == true){
                upldChkClass++;
            }
        }
        
        // 총 체크박스 갯수 = 체크된 갯수 : 전체 선택 버튼
        if(upldChkClass == upldClass.length){
            this.setState({
                isAllChecked: true
            })

            // 아닐경우 해제
        } else {
            this.setState({
                isAllChecked: false
            })
        }

        // 한개 컨트롤할 때는 좋은데, 아니면...
        /*
        this.setState({
            isEachChecked: !this.state.isEachChecked,
        });
        */

    }

    uploadDelete = (e) => {
        
        // event.target과 event.currentTarget의 차이
        // 예를 들어 <button onClick={}><span>버튼</span></button>이 있다고 가정할 때
        // evnet.target은 "버튼"이라는 글자위에서 undefined가 떨어진다.
        // 그 이유는 button요소 안의 span요소를 클릭했기 때문이다.
        // 버튼을 클릭하는 동안 실제로는 span요소를 클릭하고 있었기 때문이다.
        // 정리하자면
        // target : 누군가 실제로 클릭한 요소. 이벤트가 바운드 된 요소 내에 있을 수 있다.
        // currentTarget : 실제로 이벤트를 바인딩 한 요소.

        /*
        let eTest = e.target.getAttribute("test");
        let eDataSrc = e.target.getAttribute("data-src");
        let eValue = e.target.getAttribute("value");

        console.log("eTest = " + eTest);
        console.log("eDataSrc = " + eDataSrc);
        console.log("eValue = " + eValue);
        */

        // e.target.closest("li").remove();
        /*
        uploadArray.map((falist, i) => {
            console.log("uploadArray fileName = " + falist.fileName);
            console.log("uploadArray fileSize = " + falist.fileSize);
        });

        for(let chk of chkArray){
            console.log("var of key = " + chk);
        }
        */
        
        const upldClass = document.getElementsByClassName("upld_file");
        
        for(let upldKey=0; upldKey<upldClass.length; upldKey++){
            
            if(upldClass[upldKey].checked == true){

                let rCode = upldClass[upldKey].getAttribute("code");
                
                // fileArray요소 중 upldKey번째부터 1개삭제
                // fileArray.splice(upldKey, 1);
                // contentsArray.splice(upldKey, 1);

                // contentsArray에서 randomName을 찾아서 rCode와 같으면
                // randomName이 같은 요소를 지우고
                // 그 rCode를 가지고 있는 부모요소를 지워라
                
                /*
                let arrayFind = contentsArray.find(function(item){
                    return item.randomName === rCode
                });
                let arrayIdx = contentsArray.indexOf(arrayFind);
                */

                let arrayIdx = contentsArray.findIndex((item) => { // findIndex = find + indexOf (중간단계 생략가능)
                    return item.randomName === rCode;
                });
                
                arrayIdx > -1 ? contentsArray.splice(arrayIdx, 1) : "";

                upldClass[upldKey].parentNode.style.display = "none";
                /*
                왜 여기 있으면 안되냐;;;
                if(upldClass[upldKey].parentNode.style.display == "none"){
                    upldClass[upldKey].parentNode.remove();
                }
                */
            }

        }

        for(let upldKey=0; upldKey<upldClass.length; upldKey++){
            
            if(upldClass[upldKey].parentNode.style.display == "none"){
                
                upldClass[upldKey].parentNode.remove();

            }
        }

    }
    
    allCheck = (e) => {
        
        // 없으면 false
        // 있으면 true
        let allChk = this.state.isAllChecked;
        let chkArray = this.state.checkList;

        this.setState({
            isAllChecked: !this.state.isAllChecked,
        });

        // if true children checkbox all check
        if(allChk == false){
            
            for(let cKey=0; cKey<chkArray.length; cKey++){
                chkArray[cKey] = true;
            }

            this.setState({
                checkList: chkArray,
            });
            // else children checkbox all discheck

        } else {
            
            for(let cKey=0; cKey<chkArray.length; cKey++){
                chkArray[cKey] = false;
            }

            this.setState({
                checkList: chkArray,
            });

        }
        console.log("chkArray = " + chkArray);
        
    }

    regConts = (e) => {
        
        this.props.regContents(contentsArray);

    }

	render() {
        
        const test = this.state.uploadList;
        const testList = test != null ?
            test.map((list, i) => (
            <li key={i}>

                <input type="checkbox" className={"upld_file"} id={"upld_file_" + i} checked={this.state.checkList[i]} onChange={this.checkChange.bind(this)} value={i} code={list.randomName} />
                <label htmlFor={"upld_file_" + i} test={i} value={i}></label>

                <span>{list.fileName}</span>
                <span>{list.sizeUnit}</span>
                <span style={{right: "10px", display: "none"}} onClick={this.uploadDelete} value={i} test={i} data-src={i}>삭제</span>
            </li>
            )) : null;

		return (
				
			<div>

				<Header />

                <div id="uploadArea" onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDrop={this.fileDrop}>
                    <UploadWrap>
                        <div style={{display:"table-cell", color: "#59bce0", verticalAlign: "middle"}}>
                            파일을 드래그하여 이 곳에 넣어주세요.
                        </div>
                    </UploadWrap>
                </div>

                <div>
                    <div className="uploadHeader">
                        <input type="checkbox" className="upld_all" id="upld_all" checked={this.state.isAllChecked} onChange={this.allCheck.bind(this)}/>
                        <label htmlFor="upld_all"></label>
                        <span>파일명</span>
                        <span style={{right: "100px", width: "80px", textAlign: "center", }}>용량</span>
                    </div>

                    <ul className="uploadList">
                        {testList}
                    </ul>
                    <div className="uploadDelete">
                        <div style={{display: "inline-block"}} onClick={this.uploadDelete}>
                            <FileDeleteBtn></FileDeleteBtn>
                        </div>

                        <div style={{display: "inline-block"}} onClick={this.regConts.bind(this)}>
                            <ContentsRegBtn></ContentsRegBtn>
                        </div>
                    </div>
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
        regContents: (contentsArray) => dispatch(createActionReducer.regContents(contentsArray)),
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Upload));