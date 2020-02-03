import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import * as BoardReducer from "../reducers/BoardReducer";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import scss from "../../scss/board.scss";
const boardStyle = classNames.bind(scss);

class Boardview extends Component {
	
	constructor(props){
		super(props);
		this.state = {
            connect: true,
            ctrlDown: false,
            replyRow: 0,
            boardIdx: document.getElementById("idxParam").value,
            username: document.getElementById("username").value,
            gmIdx: document.getElementById("gmIdx").value,
            gIdx: document.getElementById("gIdx").value,
            likedUser: null,
		}
		
	}
	
	componentDidMount() {
        
        this.getBoardInfo();

        // 스크롤 이벤트
        window.addEventListener("scroll", this.scrollEvent);
        let username = this.state.username;
        let comment = document.getElementById("comment_disable");

        if(username == null || username == "" || username == "undefined"){
            
            comment.addEventListener("mouseover", (e) => {
                comment.classList.add("active");
            });
            comment.addEventListener("mouseleave", (e) => {
                comment.classList.remove("active");
            });
            comment.addEventListener("click", (e) => {
                location.href = "/study/login";
            });
            
        } else {

            document.getElementById("replyArea").setAttribute("placeholder", "저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손하는 게시물은 이용약관 및 관련 법률에 의해 제재를 받을 수 있습니다.");
            comment.style.display = "none";

        }
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

    getBoardInfo = async() => {

        let boardIdx = this.state.boardIdx;
        this.props.getBoardInfo(boardIdx);

    };

    componentDidUpdate() {

        let result = this.props.state.BoardReducer.result;
        let boardLike = this.props.state.BoardReducer.like;
        let username = this.state.username;

        let boardTItleForm = document.getElementById("board_title");
        let boardInfoForm = document.getElementById("board_info");
        let boardViewsForm = document.getElementById("board_views");
        let boardLikesForm = document.getElementById("board_likes");

        if(result != null){

            let boardName = result.boardName;
            let boardDetails = result.boardDetails;
            let boardViews = result.boardViews;
            let boardLikes = result.boardLikes;

            console.log("통 = " + boardLike);
            for(let i=0; i<boardLike.length; i++){
                if(username == boardLike[i]){
                    boardLikesForm.classList.add("likeActive");
                } else {
                    boardLikesForm.classList.remove("likeActive");
                }
            }

            boardTItleForm.innerHTML = boardName;
            boardInfoForm.innerHTML = boardDetails;
            boardViewsForm.innerHTML = boardViews;
            boardLikesForm.innerHTML = boardLikes;
            
        }

        //window.getComputedStyle(firstIcon).display = "none";

    }


    goList = () => {
        location.href = "/study/board";
    }

    likes = () => {

        let username = this.state.username;
        if(username == null || username == "" || username == "undefined"){

            let loginAlertMask = document.getElementById("loginAlertMask");
            let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
            let loginMaskWrap = document.getElementById("loginMaskWrap");
            let needLogin = document.getElementById("needLogin");

            loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
            loginAlertMaskForm.className == "active" ? this.loginMaskFadeOut(loginAlertMask, loginMaskWrap) : this.loginMaskFadeIn(loginAlertMask, loginMaskWrap);
            loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
            
            needLogin.addEventListener("click", (e) => {
                location.href = "/study/login";
            });
            
        } else {

            let like = document.getElementById("board_likes");

            let param = new Object;
            param.idxBoard = this.state.boardIdx;
            param.boardType = "board";
            param.gmIdx = this.state.gmIdx;
            param.grIdx = this.state.gIdx;
            param.username = username;
            
            //let likedUser = this.state.likedUser;
            //console.log(likedUser.classList.contains(username));
            
            // 좋아요 추가
            if(!like.classList.contains("likeActive")){

                param.cnt = 1;
                this.props.like(param);
                like.classList.add("likeActive");

                // 좋아요 빼기
            } else {
                
                param.cnt = -1;
                this.props.like(param);
                like.classList.remove("likeActive");

            }
            
        }

    }

    replyIn = () => {

        let replyArea = document.getElementById("replyArea");
        replyArea.parentNode.parentNode.classList.add("focus");

    }

    replyOut = () => {
        
        let replyArea = document.getElementById("replyArea");
        replyArea.parentNode.parentNode.classList.remove("focus");

    }

    keyDown = (element) => {

        let reply = element.currentTarget.value;
        if(reply.length <= 300){

            // 엔터 클릭
            if(element.keyCode == 13) {

                let replyRow = this.state.replyRow;
                this.setState({
                    replyRow: replyRow + 1
                });

                // 엔터를 3번까지는 그대로
                // 그 이후는 textarea 영역 height 증가
                if(replyRow > 2) {

                    let replyAreaWrap = document.getElementsByClassName("comment_reply_area")[0];
                    let replyArea = document.getElementById("replyArea");
                    
                    let rawHeight = window.getComputedStyle(replyAreaWrap).height.replace("px", "").trim();
                    let raHeight = window.getComputedStyle(replyArea).height.replace("px", "").trim();
                    
                    // textarea 영역 height 증가를 300 미만일 때만.
                    if(raHeight < 300){

                        if(reply.length != 300){

                            rawHeight = parseInt(rawHeight) + 21;
                            raHeight = parseInt(raHeight) + 21;
                            
                            replyAreaWrap.style.height = rawHeight + "px";
                            replyArea.style.height = raHeight + "px";
                        }
                        
                    }

                }

            }

            // backspace 클릭
            if(element.keyCode == 8) {

                let replyRow = this.state.replyRow;
                let value = element.currentTarget.value;

                if(replyRow > 0){

                    // 선택된 영역값 가져오기
                    let selectionText = "";
                    if(window.getSelection){
                        selectionText = window.getSelection().toString();
                    } else if(document.selection && document.selection.type != "Control") {
                        selectionText = document.selection.createRange().text;
                    }

                    // 선택된 영역에서 enter가 몇개 있는지
                    let selectionLength = 0; 
                    if(selectionText.match(/(\n|\r\n)/g) != null) {
                        selectionLength = selectionText.match(/(\n|\r\n)/g).length;
                    }

                    // 선택된 영역이 0이 아닐 때 = 영역 선택해서 지움
                    if(selectionLength != 0){

                        this.setState({
                            replyRow: replyRow - selectionLength
                        });
                        
                        let replyAreaWrap = document.getElementsByClassName("comment_reply_area")[0];
                        let replyArea = document.getElementById("replyArea");
                        
                        let rawHeight = window.getComputedStyle(replyAreaWrap).height.replace("px", "").trim();
                        let raHeight = window.getComputedStyle(replyArea).height.replace("px", "").trim();
                        
                        // textarea 영역 height 감소를 90 초과일 때만.
                        rawHeight = parseInt(rawHeight) - (21 * selectionLength);
                        raHeight = parseInt(raHeight) - (21 * selectionLength);

                        raHeight <= 90 ? raHeight = 90 : null;
                        rawHeight <= 180 ? rawHeight = 180 : null;
                        
                        replyAreaWrap.style.height = rawHeight + "px";
                        replyArea.style.height = raHeight + "px";

                        // 선택된 영역이 0이면 = 하나씩 지우는 것
                    } else {

                        // 하나씩 지울 때
                        let lastString = value.substr(value.length-1, 1);
                        if(/(\n|\r\n)/g.test(lastString)) {

                            this.setState({
                                replyRow: replyRow - 1
                            });

                            let replyAreaWrap = document.getElementsByClassName("comment_reply_area")[0];
                            let replyArea = document.getElementById("replyArea");
                            
                            let rawHeight = window.getComputedStyle(replyAreaWrap).height.replace("px", "").trim();
                            let raHeight = window.getComputedStyle(replyArea).height.replace("px", "").trim();
                            
                            // textarea 영역 height 감소를 90 초과일 때만.
                            rawHeight = parseInt(rawHeight) - 21;
                            raHeight = parseInt(raHeight) - 21;

                            raHeight <= 90 ? raHeight = 90 : null;
                            rawHeight <= 180 ? rawHeight = 180 : null;

                            replyAreaWrap.style.height = rawHeight + "px";
                            replyArea.style.height = raHeight + "px";

                        }

                    }
                    
                }

            }

            // ctrl 눌렀을 때
            if(element.keyCode == 17){
                this.setState({
                    ctrlDown: true,
                });
            }

            // ctrl + v 키조합
            let ctrlDown = this.state.ctrlDown;
            if(ctrlDown && (element.keyCode == 86) || ctrlDown && (element.keyCode == 229)) {
                
                //console.log("ctrl + v");

            }

        }
        
    }

    keyUp = (element) => {
        
        let rc = document.getElementById("rc");
        let reply = element.currentTarget.value;
        
        if(reply.length > 300) {
            element.currentTarget.value = reply.substring(0, 300);
        } else {

            rc.innerHTML = reply.length;

            // 300글자 아닐 때
            if(reply.length != 300){

                rc.parentNode.classList.remove("disable");

                if(reply.length != 0){    
                    rc.classList.add("cnt");
                } else {
                    rc.classList.remove("cnt");
                }

                // 300글자 일 때
            } else {
                rc.parentNode.classList.add("disable");
            }

        }

        // ctrl 뗐을 때
        if(element.keyCode == 17){
            this.setState({
                ctrlDown: false,
            });
        }
        
    }

    loginMaskFadeIn = (mElement, tElement) => {

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

    loginMaskFadeOut = (mElement, tElement) => {

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

	render() {
		
		return (

            <div>

				<Header />

                <div className={boardStyle('boardWrap')}>
                    <section>
                        <div className={boardStyle('board_container')}>

                            <div className={boardStyle('board_title')}>
                                <h2 id="board_title"></h2>
                            </div>

                            <div className={boardStyle('board_detail')}>
                                
                                <div className={boardStyle('board_info')}>
                                    <p id="board_info"></p>
                                </div>

                                <div className={boardStyle('board_list')}>
                                    
                                    <div className={boardStyle('board_list_wrap')}>
                                        <a id="board_back_btn" onClick={this.goList}>목록</a>
                                    </div>
                                    
                                    <div className={boardStyle('board_lv')}>
                                        <a id="board_likes" onClick={this.likes}></a>
                                        <span id="board_views"></span>
                                    </div>

                                </div>


                            </div>

                            <div className={boardStyle('board_comment')}>
                                <div className={boardStyle('board_comment_wrap')}>

                                    <div id="comment_disable">
                                        <p>로그인 후 댓글을 입력하실 수 있습니다.</p>
                                        <a id="comment_login_btn">로그인</a>
                                    </div>

                                    <div className={boardStyle('comment_reply_area')}>
                                        <textarea id="replyArea" onFocus={this.replyIn} onBlur={this.replyOut} onKeyDown={this.keyDown} onKeyUp={this.keyUp}></textarea>
                                    </div>

                                    <div className={boardStyle('comment_reply_btn')}>
                                        
                                        <div className={boardStyle('reply_left')}>
                                            <label className={boardStyle('filtImg_label')} htmlFor="fileImg"></label>
                                            <input type="file" id="fileImg"></input>
                                        </div>

                                        <div className={boardStyle('reply_right')}>
                                            <span className={boardStyle('reply_count')}><em id="rc">0</em>/300</span>
                                            <button id="replySubmit">등록</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>
                    <section>
                        <div className={boardStyle('reply_container')}>
                            <p>댓글<span>0</span></p>
                        </div>
                    </section>
                    <section>
                        <div className={boardStyle('reply_list')}>
                        </div>
                    </section>
                </div>



                <div id="loginAlertMask" onClick={this.likes}></div>
                <div id="loginAlertMaskForm">
                    <div id="loginMaskWrap">

                        <div id="loginMaskClose" onClick={this.likes}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="loginAlert">
                            <img src='/study/resources/img/port_warning.png' />
                            <p>로그인이 필요합니다.</p>
                            <p>로그인 페이지로 이동하시겠습니까?</p>
                        </div>
                        
                        <div id="loginConfirm">
                            <a id="needLogin">확인</a>
                            <a onClick={this.likes}>취소</a>
                        </div>

                    </div>
                </div>

                <Footer />
                
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
        getBoardInfo: (boardIdx) => dispatch(BoardReducer.getBoardInfo(boardIdx)),
        like: (param) => dispatch(BoardReducer.like(param))
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Boardview));