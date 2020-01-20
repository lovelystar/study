import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import * as BoardReducer from "../reducers/BoardReducer";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import scss from "../../scss/board.scss";
const boardStyle = classNames.bind(scss);

let fileArray = new Array;
let checkArray = new Array;
let contentsArray = new Array;

class Board extends Component {
    
	constructor(props){

		super(props);
		this.state = {
            uploadList : [],
            checkList : [],
            isAllChecked : false,
            currentPage : 1,
		}
		
        this.fileDrop = this.uploadFormDrop.bind(this);
        this.uploadDelete = this.uploadDelete.bind(this);

    }




    componentDidMount() {
        let curPage = this.state.currentPage;
        this.getBoardList(curPage);

        // 스크롤 이벤트
        window.addEventListener("scroll", this.scrollEvent);
    }

    scrollEvent = () => {

        let headerTag = document.getElementById("header");

        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if(scrollPosition > clientHeight / 2.0){
            headerTag.classList.add("active");
        } else {
            headerTag.classList.remove("active");
        }

    };

    componentDidUpdate() {

        const result = this.props.state.BoardReducer.result;
        if(result != null){

            const board = result.board;
            const paging = result.paging;

            let boardListId = document.getElementById("boardList");
            let boardListValue = new String;

            let paginationId = document.getElementsByClassName("board_pagination")[0];
            let paginationValue = new String;

            // board는 일반배열처럼 생겼는데 그 배열의 값이 [object Object]
            // 즉, [object Object],[object Object],[object Object],[object Object],[object Object], ...
            //console.log("board는 = " + board);
            board.map((boardList) => {
                
                // [object Object]
                //console.log("boardList = " + boardList);
                // object 안에 있는 key값들만 가져온다.
                //console.log("boardList keys = " + Object.keys(boardList));
                // object 안에 있는 value값들만 가져온다.
                //console.log("boardList value = " + Object.values(boardList));

                // 배열에서 존재여부 확인
                //console.log("존재여부 i : " + i + "번째 = " + Object.keys(boardList).includes("contentsList"));
                let date = new Date(boardList.uptdate);
                let parseDate = 
                    this.dateFunc(date.getFullYear()) + "-" +
                    this.dateFunc((date.getMonth()+1)) + "-" + 
                    this.dateFunc(date.getDate()) + " " +
                    this.dateFunc(date.getHours()) + ":" +
                    this.dateFunc(date.getMinutes());

                /*
                for(let key of board){
                    for(let inKey in key){
                        console.log("inKey = [" + inKey + "] value = [" + key[inKey] + "]");
                    }
                }
                */
                
                // 첨부파일 처리
                let contentsList = boardList.contentsList;
                if(contentsList.length != 0){

                    let contentsResult = new String;

                    contentsList.map((contents) => {

                        // randomName + extension 처리 ( mimeType에 따라서 )
                        contentsResult += 
                            "<div class='vc_each' style='background: url(/study/thumbs?pfn=" + contents.randomName + ".jpg) no-repeat;'></div>";

                    });

                    boardListValue += 
                    "<tr class='board' key=" + boardList.idx + ">" + 
                        "<td>" + boardList.idx + "</td>" + 
                        "<td class='validContents'>" + 
                            "<div class='vc_container'>" + 
                                "<div class='vc_wrap'>" + 
                                    contentsResult + 
                                "</div>" + 
                                "<div class='vc_arrow'>" + 
                                    //"<a class='arrow disable' id='to_left' mv='1'>" + 
                                    "<a class='arrow' id='to_left' mv='1'>" + 
                                        "<img src='/study/resources/img/to-left.png' />" + 
                                    "</a>" + 
                                    "<a class='arrow' id='to_right' mv='-1'>" + 
                                        "<img src='/study/resources/img/to-right.png' />" + 
                                    "</a>" + 
                                "</div>" + 
                            "</div>" + 
                        "</td>" + 
                        "<td class='boardview' key=" + boardList.idx + ">" + boardList.boardName + "</td>" + 
                        "<td>user</td>" + 
                        "<td>" + boardList.boardViews + "</td>" +  
                        "<td>0</td>" + 
                        "<td>" + parseDate + "</td>" + 
                    "</tr>";

                } else {

                    boardListValue += 
                    "<tr key=" + boardList.idx + ">" + 
                        "<td>" + boardList.idx + "</td>" + 
                        "<td class='invalidContents'> - </td>" + 
                        "<td class='boardview' key=" + boardList.idx + ">" + boardList.boardName + "</td>" + 
                        "<td>user</td>" + 
                        "<td>" + boardList.boardViews + "</td>" + 
                        "<td>0</td>" + 
                        "<td>" + parseDate + "</td>" + 
                    "</tr>";

                }

            });

            if(paging != null){
                
                let prevPage = paging.prevPage;
                let prev = paging.prev;
                let startPage = paging.startPage;
                
                let nextPage = paging.nextPage;
                let next = paging.next;
                let endPage = paging.endPage;

                prev ?
                    paginationValue += "<li class='pagination' data-page='" + (prevPage - 1) +"'><a>prev</a>" : null;
                
                for(let pagingIdx=prevPage; pagingIdx<=nextPage; pagingIdx++){
                    
                    let currentPage = this.state.currentPage;
                    if(currentPage == pagingIdx){
                        paginationValue += "<li class='pagination activePage' data-page='" + pagingIdx + "'><a>" + pagingIdx + "</a>";
                    } else {
                        paginationValue += "<li class='pagination' data-page='" + pagingIdx + "'><a>" + pagingIdx + "</a>";
                    }

                }

                next ? 
                    paginationValue += "<li class='pagination' data-page='" + (nextPage + 1) +"'><a>next</a>" : null;

            }

            boardListId.innerHTML = boardListValue;
            paginationId.innerHTML = paginationValue;

        }

        let pagingEvent = document.getElementsByClassName("pagination");
        let pagingLength = pagingEvent.length;
        for(let i=0; i<pagingLength; i++){
            pagingEvent[i].addEventListener("click", (elements) => {
                
                let pageValue = elements.currentTarget.getAttribute("data-page");
                this.setState({
                    currentPage: pageValue
                });

                this.getBoardList(pageValue);

            });
        }

        // 이미지 슬라이드
        let validWrap = document.getElementsByClassName("vc_wrap");
        let arrow = document.getElementsByClassName("arrow");

        this.validImageSlide(validWrap, arrow);

        let boardView = document.getElementsByClassName("boardview");
        for(let i=0; i<boardView.length; i++) {
            boardView[i].addEventListener("click", (e) => {
                
                let detail = e.target.getAttribute("key");
                location.href="/study/boardview?boardno=" + detail;

            });
        }

    }

    dateFunc = (param) => {

        let dateParam = param;
        param < 10 ? dateParam = "0" + param : dateParam = param;

        return dateParam;

    }

    validImageSlide = (validWrap, arrow) => {

        let viewNo = 0;

        for(let i=0; i<validWrap.length; i++){

            let eachCount = validWrap[i].childNodes.length;
            let vcArrow = validWrap[i].parentNode.childNodes[1];

            let downOffset = 0;
            let upOffset = 0;
            let movement = 0;

            validWrap[i].addEventListener("mousedown", (e) => {

                e.preventDefault;
                e.stopPropagation;

                downOffset = e.offsetX;

            });

            validWrap[i].addEventListener("mouseup", (e) => {

                e.preventDefault;
                e.stopPropagation;
                
                upOffset = e.offsetX;

                if(downOffset > upOffset){
                    if(movement != -150 * (eachCount-1)){
                        movement -= 150;
                        validWrap[i].style.transform = "translate3d(" + movement + "px, 0, 0)";
                        //viewNo++;
                    }
                } else if(downOffset < upOffset) {
                    if(movement != 0){
                        movement += 150;
                        validWrap[i].style.transform = "translate3d(" + movement + "px, 0, 0)";
                        //viewNo--;
                    }
                }

            });


            // left
            vcArrow.childNodes[0].addEventListener("click", (e) => {
                if(movement != 0){
                    movement += 150;
                    validWrap[i].style.transform = "translate3d(" + movement + "px, 0, 0)";
                }
            });
            
            //right
            vcArrow.childNodes[1].addEventListener("click", (e) => {
                if(movement != -150 * (eachCount-1)){
                    movement -= 150;
                    validWrap[i].style.transform = "translate3d(" + movement + "px, 0, 0)";
                }
            });

        }

    }

    getBoardList = async(curPage) => {
        this.props.getBoardList(curPage);
    }

    regForm = (e) => {

        let upldMaskForm = document.getElementById("uploadMaskForm");
        let upldMask = document.getElementById("uploadMask");
        let htmlTag = document.getElementsByTagName("html")[0];
        let textForm = document.getElementById("boardTextForm");

        upldMaskForm.className == "active" ? upldMaskForm.classList.remove("active") : upldMaskForm.classList.add("active");
        upldMask.className == "active" ? this.txtFormFadeOut(uploadMaskForm, textForm) : this.txtFormFadeIn(uploadMaskForm, textForm);
        upldMask.className == "active" ? upldMask.classList.remove("active") : upldMask.classList.add("active");

        htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";

        // value 정의
        document.getElementById("subject").value = "";
        document.getElementById("comment").value = "";

        contentsArray = new Array();
        document.getElementsByClassName("uploadHeader")[0].style.display = "none";
        document.getElementById("uploadControl").style.display = "none";
        
        // 자식노드 전체 삭제
        let upldList = document.getElementsByClassName("uploadList")[0];
        // upldList.innerHTML = "";
        while(upldList.firstChild) {
            upldList.removeChild(upldList.firstChild);
        }

        
    }
    
    txtFormFadeIn = (mElement, tElement) => {

        let opacity = 0;
        let mHeightTemp = 0;

        let fade = setInterval(function() {

            let mHeight = window.getComputedStyle(mElement).height.replace("px", "").trim();

            if(mHeightTemp == mHeight) {

                opacity += 1 * 0.5;
                if(opacity >= 1) {

                    tElement.style.opacity = 1;
                    clearInterval(fade);

                }

            } else {
                mHeightTemp = mHeight;
            }

        }, 50);
        
    }

    txtFormFadeOut = (mElement, tElement) => {

        let opacity = tElement.style.opacity;
        let mHeightTemp = 0;

        let fade = setInterval(function() {

            let mHeight = window.getComputedStyle(mElement).height.replace("px", "").trim();

            if(mHeightTemp == mHeight) {

                opacity -= 1 * 0.5;
                if(opacity <= 0) {

                    tElement.style.opacity = 0;
                    clearInterval(fade);

                }

            } else {
                mHeightTemp = mHeight;
            }

        }, 50);

    }
    
    // 끌어서 진입
	dragEnter = (e) => {
        
        e.preventDefault();
        e.stopPropagation();

        let upldArea = document.getElementById("uploadArea");
        upldArea.style.border = "2px solid #ff0073";
        upldArea.style.fontWeight = "bold";

    }

    // 진입한 상태
    dragOver = (e) => {

        e.preventDefault();
        e.stopPropagation();

    }

    // 진입한 상태에서 나갈 때
    dragLeave = (e) => {

        e.preventDefault();
        e.stopPropagation();

        let upldArea = document.getElementById("uploadArea");
        upldArea.style.border = "none";
        upldArea.style.fontWeight = "normal";

    }

    // (파일 등을) 떨어뜨릴 때
    uploadFormDrop = async(e) => {

        e.preventDefault();
        e.stopPropagation();

        let upldArea = document.getElementById("uploadArea");
        upldArea.style.border = "none";
        upldArea.style.fontWeight = "normal";

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
        let uploadControl = document.getElementById("uploadControl");

        uploadHeader[0].style.display = "block";
        uploadControl.style.display = "inline-block";

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

        // 선택한 갯수와 총 갯수가 같으면 display작업도 같이. 아니라면 그냥 삭제
        let upldCount = upldClass.length;
        let chkCount = 0;

        for(let i=upldCount-1; i>=0; i--){
            if(upldClass[i].checked == true){

                chkCount++;

                // fileArray요소 중 upldKey번째부터 1개삭제
                // fileArray.splice(upldKey, 1);
                // contentsArray.splice(upldKey, 1);

                // contentsArray에서 randomName을 찾아서 rCode와 같으면
                // randomName이 같은 요소를 지우고
                // 그 rCode를 가지고 있는 부모요소를 지워라
                let rCode = upldClass[i].getAttribute("code");

                // let arrayFind = contentsArray.find(function(item){
                //    return item.randomName === rCode
                // });
                // let arrayIdx = contentsArray.indexOf(arrayFind);
                
                let arrayIdx = contentsArray.findIndex((item) => {
                    return item.randomName === rCode;
                });

                // 삭제하면 contentsArray에서도 삭제해야 데이터가 제대로 넘어감
                contentsArray.splice(arrayIdx, 1);
                
                // 리스트 삭제
                upldClass[i].parentNode.remove();
                
                if(upldCount == chkCount){
                    document.getElementsByClassName("uploadHeader")[0].style.display = "none";
                    document.getElementById("uploadControl").style.display = "none";
                    this.setState({
                        isAllChecked: false
                    });
                }

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
        
    }

    regConts = (e) => {

        let textObj = new Object();
        textObj.subject = document.getElementById("subject").value;
        textObj.comment = document.getElementById("comment").value;
        textObj.fileList = contentsArray;

        this.props.regContents(textObj);

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

                <div className={boardStyle('boardWrap')}>
                    <section>
                        <div className={boardStyle('board_container')}>

                            <div className={boardStyle('board_title')}>
                                <h2>글 목록</h2>
                            </div>

                            <div className={boardStyle('board_detail')}>
                                
                                <div className={boardStyle('board_write_button')}>
                                    <a id="board_write" onClick={this.regForm}>작성</a>
                                </div>

                                <div className={boardStyle('board_info')}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>no</th>
                                                <th>product</th>
                                                <th>subject</th>
                                                <th>writer</th>
                                                <th>views</th>
                                                <th>♥</th>
                                                <th>date</th>
                                            </tr>
                                        </thead>
                                        <tbody id="boardList"></tbody>
                                    </table>
                                    
                                </div>

                            </div>
                            <div className={boardStyle('pagination_wrap')}>
                                <ol className={boardStyle('board_pagination')}></ol>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="uploadMask" onClick={this.regForm}></div>
                <div id="uploadMaskForm">
                    
                    <div id="uploadMaskClose" onClick={this.regForm}>
                        <i className={boardStyle('firstClose')}></i>
                        <i className={boardStyle('secondClose')}></i>
                    </div>

                    <div id="uploadArea" onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={this.fileDrop}>
                        <div>파일을 드래그하여 이 곳에 넣어주세요.</div>
                    </div>

                    <div id="uploadList">

                        <div className="uploadHeader">
                            <input type="checkbox" className="upld_all" id="upld_all" checked={this.state.isAllChecked} onChange={this.allCheck.bind(this)}/>
                            <label htmlFor="upld_all"></label>
                            <span>파일명</span>
                            <span style={{right: "20px", width: "80px", textAlign: "center", }}>용량</span>
                        </div>

                        <ul className="uploadList">
                            {testList}
                        </ul>

                    </div>
                    
                    <div id="uploadControl">
                        <div onClick={this.uploadDelete}>
                            <a>삭제</a>
                        </div>
                    </div>

                    <div id="uploadDiv"></div>

                    <div id="boardTextForm">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Subject</th>
                                </tr>
                                <tr>
                                    <th>
                                        <input style={{maxHeight: "30px", minHeight: "30px", padding: "0 5px"}} type="text" id="subject" />
                                    </th>
                                </tr>
                                <tr>
                                    <th>Comment</th>
                                </tr>
                                <tr>
                                    <th>
                                        <textarea style={{resize: "none", maxHeight: "350px", minHeight: "350px", padding: "3px 5px"}} rows="14" type="text" id="comment" />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div style={{minWidth: "130px", width: "40%", float: "right", marginRight: "5%"}}>
                            <a onClick={this.regConts}>등록하기</a>
                        </div>

                    </div>

                </div>

                <Footer />
                
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
        getBoardList: (curPage) => dispatch(BoardReducer.getBoard(curPage)),
        regContents: (textObj) => dispatch(BoardReducer.regContents(textObj)),
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Board));