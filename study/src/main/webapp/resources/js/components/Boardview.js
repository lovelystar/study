import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import * as BoardReducer from "../reducers/BoardReducer";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import scss from "../../scss/board.scss";
const boardStyle = classNames.bind(scss);

let baseArr = new Array; // 기본
let upldArr = new Array; // 업로드 파일
let delArr = new Array; // 삭제 파일

let selectedOptions = new String;
let reportObj = new Object();

class Boardview extends Component {
	
	constructor(props){
		super(props);
		this.state = {
            connect: true,
            replyPage: 1,
            boardIdx: document.getElementById("idxParam").value,
            username: document.getElementById("username").value,
            gmIdx: document.getElementById("gmIdx").value,
            gIdx: document.getElementById("gIdx").value,
            upldList: [],
            delList: [],
            checkList: [],
        }
        
        this.fileCnt = 0;

    }
    
	componentDidMount() {
        
        let page = this.state.replyPage;

        this.getBoardInfo();
        this.getReplyInfo(page);

        // 스크롤 이벤트
        window.addEventListener("scroll", this.scrollEvent);
        let username = this.state.username;
        let comment = document.getElementById("comment_disable");
        let replyArea = document.getElementById("replyArea");
        let replyAreaWrap = document.getElementsByClassName("comment_reply_area")[0];

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

            // 댓글 등록 중 "파일" 선택 시 바로 등록
            let replyImg = document.getElementById("fileImg");
            replyImg.addEventListener("change", (e) => {

                let param = new Object();

                param.idxBoard = this.state.boardIdx;
                param.boardType = "board";
                param.gmIdx = this.state.gmIdx;
                param.grIdx = this.state.gIdx;
                param.username = this.state.username;
                param.nickname = this.state.username;
                param.imgContents = replyImg.files[0];

                this.props.regReplyAct(param);

            });

            // 붙여넣기
            replyArea.addEventListener("paste", (e) => {
                
                let replyRow = this.replyRow;
                let clipboardData = e.clipboardData || window.clipboardData;
                let pasteData = clipboardData.getData("text");

                let pasteLength = 0;
                if(pasteData.match(/(\n|\r\n)/g) != null) {
                    pasteLength = pasteData.match(/(\n|\r\n)/g).length;
                }

                if(pasteLength != 0) {

                    this.replyRow = replyRow + pasteLength;
                    let rawHeight = window.getComputedStyle(replyAreaWrap).height.replace("px", "").trim();
                    let raHeight = window.getComputedStyle(replyArea).height.replace("px", "").trim();
                    
                    // textarea 영역 height 감소를 90 초과일 때만.
                    rawHeight = parseInt(rawHeight) + (21 * pasteLength);
                    raHeight = parseInt(raHeight) + (21 * pasteLength);

                    raHeight > 300 ? raHeight = 300 : null;
                    rawHeight > 390 ? rawHeight = 390 : null;
                    
                    replyAreaWrap.style.height = rawHeight + "px";
                    replyArea.style.height = raHeight + "px";

                }
                
            });

        }

        let reportOptions = document.getElementsByClassName("ros");
        for(let i=0; i<reportOptions.length; i++){
            
            reportOptions[i].addEventListener("click", (e) => {
                document.getElementById("report_title").innerHTML = reportOptions[i].firstChild.value;
                selectedOptions = reportOptions[i].firstChild.value;
                document.getElementById("report_reason").classList.remove("dropdown");
                reportObj.opt = selectedOptions;
            });
        
        }
        
        let reportSubmit = document.getElementById("reportSubmit");
        reportSubmit.addEventListener("click", (e) => {
            if(selectedOptions == "" || selectedOptions == "undefined" || selectedOptions == null){
                alert("신고사유를 선택해주세요.");
            } else {

                let comments = document.getElementById("report_comments").value.replace(/(\n|\r\n)/g, "<br>");
                if(comments == "" || comments == null) {
                    alert("내용을 작성해주세요.");
                } else {
                    reportObj.comments = comments;
                    this.props.report(reportObj);
                    this.reportMask();
                    this.reportResultMask();
                }

            }
        });

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

    getReplyInfo = async(page) => {

        let param = new Object;
        param.idxBoard = this.state.boardIdx;
        param.page = page;

        this.props.getReplyInfo(param);

    }

    componentDidUpdate() {
        
        let result = this.props.state.BoardReducer.result;
        let boardLike = this.props.state.BoardReducer.like;
        let username = this.state.username;

        let boardTitleForm = document.getElementById("board_title");
        let boardInfoForm = document.getElementById("board_info");
        let boardViewsForm = document.getElementById("board_views");
        let boardLikesForm = document.getElementById("board_likes");
        let boardDateUserForm = document.getElementById("board_date_user");
        let boardBtnForm = document.getElementById("board_btn");
        let boardAttachForm = document.getElementById("board_attach");

        let commentsForm = new String;
        commentsForm = "<div id='comments_area'>" + 
            "<textarea id='commentsForm'></textarea>" + 
        "</div>" + 
        "<div id='comments_btn'>" + 
            "<div id='comments_left'>" + 
                "<label class='comments_file_label' for='commentsFile'></label>" + 
                "<input type='file' id='commentsFile' />" + 
            "</div>" + 
            "<div id='comments_right'>" + 
                "<span id='comments_count'><em id='cc'>0</em>/300</span>" + 
                "<button id='commentsSubmit'>등록</button>" + 
            "</div>" + 
        "</div>";

        let modifyForm = new String;
        modifyForm = "<div id='comments_area'>" + 
            "<textarea id='commentsForm'></textarea>" + 
        "</div>" + 
        "<div id='comments_btn'>" + 
            "<div id='comments_left'>" + 
                "<label class='comments_file_label' for='modFile'></label>" + 
                "<input type='file' id='modFile' />" + 
            "</div>" + 
            "<div id='comments_right'>" + 
                "<span id='comments_count'><em id='cc'>0</em>/300</span>" + 
                "<button id='modifySubmit'>수정</button>" + 
            "</div>" + 
        "</div>";
        
        if(result != null) {

            let boardName = result.boardName;
            let boardDetails = result.boardDetails;
            let boardAttach = result.upldList;
            let boardViews = result.boardViews;
            let boardLikes = result.boardLikes;
            let boardDate = new Date(result.uptdate);
            let parseBoardDate = 
                this.dateFunc(boardDate.getFullYear()) + "-" +
                this.dateFunc((boardDate.getMonth()+1)) + "-" + 
                this.dateFunc(boardDate.getDate()) + " " +
                this.dateFunc(boardDate.getHours()) + ":" +
                this.dateFunc(boardDate.getMinutes());
            let boardUsername = result.username;
            let boardBtnString = new String;
            let boardAttachString = new String;

            if(boardLike.length != 0){
                for(let i=0; i<boardLike.length; i++){
                    if(username == boardLike[i]){
                        boardLikesForm.classList.add("likeActive");
                    } else {
                        boardLikesForm.classList.remove("likeActive");
                    }
                }
            } else {
                boardLikesForm.classList.remove("likeActive");
            }
            
            if(boardAttach.length != 0){

                boardAttachForm.classList.add("valid");
                boardAttach.map((attach) => {
                    boardAttachString +=
                        "<div class='board_attach_each'style='background: url(/study/thumbs?pfn=" + attach.randomName + ".jpg) no-repeat;'></div>";
                });
                
            }

            if(boardUsername == username){
                boardBtnString = "<a id='boardMod' data-idx='" + result.idx + "'>수정</a><a id='boardDel' data-idx='" + result.idx + "'>삭제</a>";
            } else {
                boardBtnString = "<a id='boardDeclare' data-idx='" + result.idx + "' data-user='" + boardUsername + "'>신고</a>";
            }

            boardTitleForm.innerHTML = boardName;
            boardInfoForm.innerHTML = boardDetails;
            boardViewsForm.innerHTML = boardViews;
            boardLikesForm.innerHTML = boardLikes;
            boardDateUserForm.innerHTML = parseBoardDate + "   <span>/</span>   " + boardUsername;
            boardBtnForm.innerHTML = boardBtnString;

            if(boardAttachString != "" || boardAttachString != null || boardAttachString != "undefined"){
                boardAttachForm.innerHTML = boardAttachString;
            }

            let boardMod = document.getElementById("boardMod");
            let boardDel = document.getElementById("boardDel");
            let boardDeclare = document.getElementById("boardDeclare");

            if(boardMod != null && boardDel != null){

                // 게시물 수정 form
                boardMod.addEventListener("click", (e) => {
                    
                    let idx = e.target.getAttribute("data-idx");
                    this.modForm(idx);

                    if(boardAttach.length != 0){
                        
                        document.getElementsByClassName("modUploadHeader")[0].style.display = "block";
                        document.getElementById("modUploadControl").style.display = "block";
                        
                        boardAttach.map((attach) => {

                            this.fileCnt = this.fileCnt + 1;
                            let fileObject = new Object();
                            
                            fileObject.fileName = attach.originalName;
                            fileObject.sizeUnit = attach.fileSize;
                            fileObject.randomName = attach.randomName;
                            fileObject.cnt = this.fileCnt;

                            //baseArr.push(fileObject);
                            baseArr.push(fileObject);

                        });

                        this.setState({
                            upldList: baseArr
                        });

                    }

                });

                // 게시물 삭제
                boardDel.addEventListener("click", (e) => {

                    let param = new Object();

                    let idxBoard = e.target.getAttribute("data-idx");
                    param.idx = idxBoard;

                    this.deleteMask(param);

                });

            }
            
            if(boardDeclare != null){

                // 게시물 신고
                boardDeclare.addEventListener("click", (e) => {
                    if(username == null || username == "" || username == "undefined"){
    
                        let loginAlertMask = document.getElementById("loginAlertMask");
                        let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                        let loginMaskWrap = document.getElementById("loginMaskWrap");
                        let needLogin = document.getElementById("needLogin");
            
                        loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                        loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                        loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                        
                        needLogin.addEventListener("click", (e) => {
                            location.href = "/study/login";
                        });
                        
                    } else {
                        

                        this.reportMask();

                    }
                });

            }

        }


        let replyResult = this.props.state.BoardReducer.reply;
        if(replyResult != null) {

            const reply = replyResult.rc;
            const replyTotal = replyResult.rcTotal;
            const paging = replyResult.paging;

            let replyListId = document.getElementById("reply_list");
            let replyListValue = new String;

            let replyTotalId = document.getElementById("reply_total");

            let paginationId = document.getElementsByClassName("reply_pagination")[0];
            let paginationValue = new String;

            reply.map((replyList) => {
                
                let date = new Date(replyList.uptdate);
                let parseDate = 
                    this.dateFunc(date.getFullYear()) + "-" +
                    this.dateFunc((date.getMonth()+1)) + "-" + 
                    this.dateFunc(date.getDate()) + " " +
                    this.dateFunc(date.getHours()) + ":" +
                    this.dateFunc(date.getMinutes());

                let replyAble = replyList.replyable;
                let imgValue = replyList.imgValue;
                let replyUser = replyList.username;
                let replyBtn = new String;
                let replyLikedString = new String;

                let replyModDel = "<button class='replyMod'>수정</button><button class='replyDel'>삭제</button>";
                let replyDeclare = "<button class='declareBtn' data-idx=" + replyList.idx + ">신고</button>";

                username == replyUser ? replyBtn = replyModDel : replyBtn = replyDeclare;

                let commentsList = replyList.comments;
                if(commentsList.length != 0){

                    let commentsResult = new String;
                    commentsList.map((comments) => {

                        let commentAble = comments.commentable;
                        let commentsUser = comments.username;
                        let commentsImg = comments.imgValue;
                        let commentsBtn = new String;

                        username == commentsUser ? commentsBtn = replyModDel : commentsBtn = replyDeclare;
                        
                        // commentAble이 1이면 활성화
                        if(commentAble == 1){
                            if(commentsImg == null){

                                commentsResult += 
                                "<div class='ec_list com'>" + 
                                    "<div class='ec_info'>" + 
                                        "<div class='ec_profile'>" + 
                                            "<img src='/study/resources/img/port_profile_default.png' />" + 
                                            "<div class='ec_nick'>" + 
                                                comments.nickname + 
                                            "</div>" + 
                                        "</div>" + 
                                        "<div class='ec_right' rc='comments' data-idx='" + comments.idx + "'>" + 
                                            commentsBtn + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_reply'>" + 
                                        "<div class='ec_contents'>" + 
                                            comments.contents + 
                                        "</div>" + 
                                        "<div class='ec_form'></div>" + 
                                    "</div>" + 
                                    "<div class='ec_lc_wrap'></div>" + 
                                    "<div class='ec_comments_wrap'></div>" + 
                                "</div>";
                                
                                // imgValue가 not null이라 img
                            } else {
    
                                commentsResult += 
                                "<div class='ec_list com'>" + 
                                    "<div class='ec_info'>" + 
                                        "<div class='ec_profile'>" + 
                                            "<img src='/study/resources/img/port_profile_default.png' />" + 
                                            "<div class='ec_nick'>" + 
                                                comments.nickname + 
                                            "</div>" + 
                                        "</div>" + 
                                        "<div class='ec_right' rc='comments' data-img='" + commentsImg + "' data-idx='" + comments.idx + "'>" + 
                                            commentsBtn + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_reply validContents' style='background: url(/study/cthumbs?pfn=" + commentsImg + ") no-repeat;'><div class='ec_form'></div></div>" + 
                                    "<div class='ec_lc_wrap'></div>" + 
                                    "<div class='ec_comments_wrap'></div>" + 
                                "</div>";
            
                            }

                            // 1이 아니면 비활성화 ( 삭제된 덧글 )
                        } else {
                            commentsResult += 
                            "<div class='ec_list com'>" + 
                                "<div class='ec_reply remove'>삭제된 덧글입니다.</div>" + 
                            "</div>";
                        }
                        
                    });

                    // replyAble이 1이면 활성화
                    if(replyAble == 1){
                        
                        let replyLikedUser = replyList.replyLikedUser;
                        if(replyLikedUser.length != 0){
                            for(let i=0; i<replyLikedUser.length; i++){
                                if(username == replyLikedUser[i]){
                                    replyLikedString = "<a class='ec_like likeActive' data-ridx='" + replyList.idx + "'>";
                                } else {
                                    replyLikedString = "<a class='ec_like' data-ridx='" + replyList.idx + "'>";
                                }
                            }
                        } else {
                            replyLikedString = "<a class='ec_like' data-ridx='" + replyList.idx + "'>";
                        }

                        // 덧글 있음 + 댓글 이미지 없음
                        if(imgValue == null){

                            replyListValue += 
                            "<div class='ec_list'>" + 
                                "<div class='ec_info'>" + 
                                    "<div class='ec_profile'>" + 
                                        "<img src='/study/resources/img/port_profile_default.png' />" + 
                                        "<div class='ec_nick'>" + 
                                            replyList.nickname + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_right' rc='reply' data-idx='" + replyList.idx + "'>" + 
                                        replyBtn + 
                                    "</div>" + 
                                "</div>" + 
                                "<div class='ec_reply'>" + 
                                    "<div class='ec_contents'>" + 
                                        replyList.contents + 
                                    "</div>" + 
                                    "<div class='ec_form'></div>" + 
                                "</div>" + 
                                "<div class='ec_lc_wrap'>" + 
                                    replyLikedString + 
                                        replyList.replyLikes + 
                                    "</a>" + 
                                    "<a class='ec_comments' data-ridx='" + replyList.idx + "'>" + 
                                        replyList.commentsCnt + 
                                    "</a>" + 
                                "</div>" + 
                                "<div class='ec_comments_wrap'></div>" + 
                            "</div>" + commentsResult;
                            
                            // 덧글 있음 + 댓글 이미지 있음
                        
                        } else {
        
                            replyListValue += 
                            "<div class='ec_list'>" + 
                                "<div class='ec_info'>" + 
                                    "<div class='ec_profile'>" + 
                                        "<img src='/study/resources/img/port_profile_default.png' />" + 
                                        "<div class='ec_nick'>" + 
                                            replyList.nickname + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_right' rc='reply' data-img='" + imgValue + "' data-idx='" + replyList.idx + "'>" + 
                                        replyBtn + 
                                    "</div>" + 
                                "</div>" + 
                                "<div class='ec_reply validContents' style='background: url(/study/cthumbs?pfn=" + imgValue + ") no-repeat;'><div class='ec_form'></div></div>" + 
                                "<div class='ec_lc_wrap'>" + 
                                    replyLikedString + 
                                        replyList.replyLikes + 
                                    "</a>" + 
                                    "<a class='ec_comments' data-ridx='" + replyList.idx + "'>" + 
                                        replyList.commentsCnt + 
                                    "</a>" + 
                                "</div>" + 
                                "<div class='ec_comments_wrap'></div>" + 
                            "</div>" + commentsResult;
        
                        }

                        // 1이 아니면 비활성화 ( 삭제된 댓글 )
                    } else {
                        replyListValue += 
                        "<div class='ec_list'>" + 
                            "<div class='ec_reply remove'>삭제된 댓글입니다.</div>" + 
                        "</div>" + commentsResult;
                    }

                } else {

                    // replyAble이 1이면 활성화
                    if(replyAble == 1) {

                        let replyLikedUser = replyList.replyLikedUser;
                        if(replyLikedUser.length != 0){
                            for(let i=0; i<replyLikedUser.length; i++){
                                if(username == replyLikedUser[i]){
                                    replyLikedString = "<a class='ec_like likeActive' data-ridx='" + replyList.idx + "'>";
                                } else {
                                    replyLikedString = "<a class='ec_like' data-ridx='" + replyList.idx + "'>";
                                }
                            }
                        } else {
                            replyLikedString = "<a class='ec_like' data-ridx='" + replyList.idx + "'>";
                        }

                        // 덧글 없음 + 댓글 이미지 없음
                        if(imgValue == null){

                            replyListValue += 
                            "<div class='ec_list'>" + 
                                "<div class='ec_info'>" + 
                                    "<div class='ec_profile'>" + 
                                        "<img src='/study/resources/img/port_profile_default.png' />" + 
                                        "<div class='ec_nick'>" + 
                                            replyList.nickname + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_right' rc='reply' data-idx='" + replyList.idx + "'>" + 
                                        replyBtn + 
                                    "</div>" + 
                                "</div>" + 
                                "<div class='ec_reply'>" + 
                                    "<div class='ec_contents'>" + 
                                        replyList.contents + 
                                    "</div>" + 
                                    "<div class='ec_form'></div>" + 
                                "</div>" + 
                                "<div class='ec_lc_wrap'>" + 
                                    replyLikedString + 
                                        replyList.replyLikes + 
                                    "</a>" + 
                                    "<a class='ec_comments' data-ridx='" + replyList.idx + "'>" + 
                                        replyList.commentsCnt + 
                                    "</a>" + 
                                "</div>" + 
                                "<div class='ec_comments_wrap'></div>" + 
                            "</div>";
                            
                            // 덧글 없음 + 댓글 이미지 있음
                        } else {
        
                            replyListValue += 
                            "<div class='ec_list'>" + 
                                "<div class='ec_info'>" + 
                                    "<div class='ec_profile'>" + 
                                        "<img src='/study/resources/img/port_profile_default.png' />" + 
                                        "<div class='ec_nick'>" + 
                                            replyList.nickname + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div class='ec_right' rc='reply' data-img='" + imgValue + "' data-idx='" + replyList.idx + "'>" + 
                                        replyBtn + 
                                    "</div>" + 
                                "</div>" + 
                                "<div class='ec_reply validContents' style='background: url(/study/cthumbs?pfn=" + imgValue + ") no-repeat;'><div class='ec_form'></div></div>" + 
                                "<div class='ec_lc_wrap'>" + 
                                    replyLikedString + 
                                        replyList.replyLikes + 
                                    "</a>" + 
                                    "<a class='ec_comments' data-ridx='" + replyList.idx + "'>" + 
                                        replyList.commentsCnt + 
                                    "</a>" + 
                                "</div>" + 
                                "<div class='ec_comments_wrap'></div>" + 
                            "</div>";
        
                        }

                        // 1이 아니면 비활성화 ( 삭제된 댓글 )
                    } else {
                        replyListValue += 
                        "<div class='ec_list'>" + 
                            "<div class='ec_reply remove'>삭제된 댓글입니다.</div>" + 
                        "</div>";
                    }

                };

            });

            if(paging != null) {

                let prevPage = paging.prevPage;
                let prev = paging.prev;
                let startPage = paging.startPage;
                
                let nextPage = paging.nextPage;
                let next = paging.next;
                let endPage = paging.endPage;

                prev ?
                    paginationValue += "<li class='pagination' data-page='" + (prevPage - 1) +"'><a>prev</a>" : null;
                
                for(let pagingIdx=prevPage; pagingIdx<=nextPage; pagingIdx++){
                    
                    let currentPage = this.state.replyPage;
                    if(currentPage == pagingIdx){
                        paginationValue += "<li class='pagination activePage' data-page='" + pagingIdx + "'><a>" + pagingIdx + "</a>";
                    } else {
                        paginationValue += "<li class='pagination' data-page='" + pagingIdx + "'><a>" + pagingIdx + "</a>";
                    }

                }

                next ? 
                    paginationValue += "<li class='pagination' data-page='" + (nextPage + 1) +"'><a>next</a>" : null;
            }

            replyListId.innerHTML = replyListValue;
            replyTotalId.innerHTML = replyTotal;
            paginationId.innerHTML = paginationValue;

            let pagingEvent = document.getElementsByClassName("pagination");
            let pagingLength = pagingEvent.length;

            for(let i=0; i<pagingLength; i++){
                pagingEvent[i].addEventListener("click", (element) => {
                    
                    let replyValue = element.currentTarget.getAttribute("data-page");
                    this.setState({
                        replyPage: replyValue
                    });
                    
                    this.getReplyInfo(replyValue);

                });
            }

        }

        let ecLike = document.getElementsByClassName("ec_like");
        let ecComments = document.getElementsByClassName("ec_comments");

        // 댓글 좋아요, 덧글
        for(let i=0; i<ecLike.length; i++){
            
            // 댓글 좋아요
            ecLike[i].addEventListener("click", (e) => {

                if(username == null || username == "" || username == "undefined"){

                    let loginAlertMask = document.getElementById("loginAlertMask");
                    let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                    let loginMaskWrap = document.getElementById("loginMaskWrap");
                    let needLogin = document.getElementById("needLogin");
        
                    loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                    loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                    loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                    
                    needLogin.addEventListener("click", (e) => {
                        location.href = "/study/login";
                    });
                    
                } else {
                    
                    let param = new Object;
                    
                    param.idxReply = e.target.getAttribute("data-ridx");
                    param.idxBoard = this.state.boardIdx;
                    param.replyType = "reply";
                    param.gmIdx = this.state.gmIdx;
                    param.grIdx = this.state.gIdx;
                    param.username = username;
                    
                    // 좋아요 추가
                    if(!ecLike[i].classList.contains("likeActive")){
                        param.cnt = 1;
                        this.props.rcLike(param);
                        ecLike[i].classList.add("likeActive");

                        // 좋아요 빼기
                    } else {
                        param.cnt = -1;
                        this.props.rcLike(param);
                        ecLike[i].classList.remove("likeActive");

                    }
                }

            });

            // 덧글
            ecComments[i].addEventListener("click", (e) => {

                if(username == null || username == "" || username == "undefined"){

                    let loginAlertMask = document.getElementById("loginAlertMask");
                    let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                    let loginMaskWrap = document.getElementById("loginMaskWrap");
                    let needLogin = document.getElementById("needLogin");
        
                    loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                    loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                    loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                    
                    needLogin.addEventListener("click", (e) => {
                        location.href = "/study/login";
                    });
                    
                } else {
                    
                    let formDiv = e.target.parentNode.parentNode.childNodes[3];
                    let ecReply = document.getElementsByClassName("ec_reply");
                    let ecw = document.getElementsByClassName("ec_comments_wrap");
                    let ecForm = document.getElementsByClassName("ec_form");
                    let idxReply = e.target.getAttribute("data-ridx");

                    // 세팅 초기화
                    for(let i=0; i<ecw.length; i++){
                        ecw[i].innerHTML = "";
                        ecw[i].classList.remove("activeForm");
                        ecReply[i].classList.remove("activeForm");
                        ecForm[i].innerHTML = "";
                    }

                    formDiv.classList.add("activeForm");
                    formDiv.innerHTML = commentsForm;

                    // 덧글 ( 사진 ) 등록
                    let commentsFile = document.getElementById("commentsFile");
                    commentsFile.addEventListener("change", (e) => {

                        let param = new Object();
                        
                        param.idxBoard = this.state.boardIdx;
                        param.idxReply = idxReply;
                        param.boardType = "board";
                        param.gmIdx = this.state.gmIdx;
                        param.grIdx = this.state.gIdx;
                        param.username = this.state.username;
                        param.nickname = this.state.username;
                        param.imgContents = commentsFile.files[0];

                        this.props.regCommentsAct(param);

                    });

                    // 덧글 작성 등록 버튼
                    let commentsReg = document.getElementById("commentsSubmit");
                    commentsReg.addEventListener("click", (e) => {
                        
                        const comments = document.getElementById("commentsForm").value;
                        if(comments == "" || comments == null) {
                            this.replyMask();
                        } else {

                            let param = new Object();

                            param.idxBoard = this.state.boardIdx;
                            param.idxReply = idxReply;
                            param.boardType = "board";
                            param.gmIdx = this.state.gmIdx;
                            param.grIdx = this.state.gIdx;
                            param.username = this.state.username;
                            param.nickname = this.state.username;
                            param.contents = comments.replace(/(\n|\r\n)/g, "<br>");

                            this.props.regCommentsAct(param);

                        }

                    });

                    // 덧글 form에 focus & blur & keyup
                    let commentsArea = document.getElementById("commentsForm");
                    commentsArea.addEventListener("focus", (e) => {
                        e.target.parentNode.parentNode.classList.add("focus");
                    });

                    commentsArea.addEventListener("blur", (e) => {
                        e.target.parentNode.parentNode.classList.remove("focus");
                    });
                    
                    commentsArea.addEventListener("keyup", (e) => {

                        let cc = document.getElementById("cc");
                        let comments = e.currentTarget.value;

                        if(comments.length > 300) {
                            e.currentTarget.value = comments.substring(0, 300);
                        } else {
                            
                            cc.innerHTML = comments.length;
                            if(comments.length != 0) {
                                cc.classList.add("cnt");
                            } else {
                                cc.classList.remove("cnt");
                            }

                        }
                        
                    });

                }

            });

        }

        // 댓글 수정
        let replyModBtn = document.getElementsByClassName("replyMod");
        for(let i=0; i<replyModBtn.length; i++){
            replyModBtn[i].addEventListener("click", (e) => {
                if(username == null || username == "" || username == "undefined"){

                    let loginAlertMask = document.getElementById("loginAlertMask");
                    let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                    let loginMaskWrap = document.getElementById("loginMaskWrap");
                    let needLogin = document.getElementById("needLogin");
        
                    loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                    loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                    loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                    
                    needLogin.addEventListener("click", (e) => {
                        location.href = "/study/login";
                    });
                    
                } else {

                    let rc = e.currentTarget.parentNode.getAttribute("rc");
                    let rcIdx = e.currentTarget.parentNode.getAttribute("data-idx");

                    let rcImg = new String;

                    let modDiv = e.target.parentNode.parentNode.parentNode.childNodes[1];
                    let ecReply = document.getElementsByClassName("ec_reply");
                    let ecw = document.getElementsByClassName("ec_comments_wrap");
                    let ecForm = document.getElementsByClassName("ec_form");

                    this.commentsRow = 0;

                    // 세팅 초기화
                    for(let i=0; i<ecw.length; i++){
                        ecw[i].innerHTML = "";
                        ecw[i].classList.remove("activeForm");
                        ecReply[i].classList.remove("activeForm");
                        ecForm[i].innerHTML = "";
                    }

                    // vadidContents가 없으면 사진이 없는 것이므로 form 동작 + 있으면 사진 변경
                    if(!modDiv.classList.contains("validContents")){
                        
                        let beforeValue = new String;
                        let afterValue = new String;

                        beforeValue = modDiv.childNodes[0].innerHTML;
                        afterValue = beforeValue.replace(/(<br>|<br\/>|<br \/>)/g, "\n");

                        modDiv.classList.add("activeForm");
                        modDiv.childNodes[1].innerHTML = modifyForm;

                        document.getElementById("commentsForm").value = afterValue;

                        let cc = document.getElementById("cc");
                        cc.classList.add("cnt");
                        cc.innerHTML = afterValue.length;

                        // 댓글 수정 form에 focus & blur
                        let commentsForm = document.getElementById("commentsForm");
                        commentsForm.addEventListener("focus", (e) => {
                            e.target.parentNode.parentNode.parentNode.classList.add("focus");
                        });

                        commentsForm.addEventListener("blur", (e) => {
                            e.target.parentNode.parentNode.parentNode.classList.remove("focus");
                        });

                        commentsForm.addEventListener("keyup", (e) => {

                            let cc = document.getElementById("cc");
                            let comments = e.currentTarget.value;

                            if(comments.length > 300) {
                                e.currentTarget.value = comments.substring(0, 300);
                            } else {
                                
                                cc.innerHTML = comments.length;
                                if(comments.length != 0) {
                                    cc.classList.add("cnt");
                                } else {
                                    cc.classList.remove("cnt");
                                }

                            }

                        });

                        // 댓글 수정 등록 버튼
                        let modSubmitBtn = document.getElementById("modifySubmit");
                        modSubmitBtn.addEventListener("click", (e) => {

                            if(commentsForm.value == "" || commentsForm.value == null) {
                                this.replyMask();
                            } else {

                                let param = new Object();
                                let comments = commentsForm.value.replace(/(\n|\r\n)/g, "<br>");
    
                                param.idx = rcIdx;
                                param.idxBoard = this.state.boardIdx;
                                param.replyType = rc;
                                param.contents = comments;
    
                                this.modifyMask(param);

                            }
                            
                        });

                    } else {

                        rcImg = e.currentTarget.parentNode.getAttribute("data-img");
                        let fileString = "<input type='file' id='modFile' />";
                        modDiv.childNodes[0].innerHTML = fileString;

                        document.getElementById("modFile").click();

                    }
                    
                    // 댓글 ( 사진 ) 수정시 즉시 수정
                    let modFile = document.getElementById("modFile");
                    modFile.addEventListener("change", (e) => {

                        let param = new Object();

                        param.idx = rcIdx;
                        param.idxBoard = this.state.boardIdx;
                        param.replyType = rc;
                        param.imgName = rcImg;
                        param.imgContents = modFile.files[0];

                        this.modifyMask(param);

                    });

                }

            });
        }

        // 댓글 삭제
        let replyDelBtn = document.getElementsByClassName("replyDel");
        for(let i=0; i<replyDelBtn.length; i++){
            replyDelBtn[i].addEventListener("click", (e) => {
                if(username == null || username == "" || username == "undefined"){

                    let loginAlertMask = document.getElementById("loginAlertMask");
                    let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                    let loginMaskWrap = document.getElementById("loginMaskWrap");
                    let needLogin = document.getElementById("needLogin");
        
                    loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                    loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                    loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                    
                    needLogin.addEventListener("click", (e) => {
                        location.href = "/study/login";
                    });
                    
                } else {

                    let param = new Object();

                    let rc = e.currentTarget.parentNode.getAttribute("rc");
                    let rcIdx = e.currentTarget.parentNode.getAttribute("data-idx");

                    param.idx = rcIdx;
                    param.idxBoard = this.state.boardIdx;
                    param.replyType = rc;

                    this.deleteMask(param);

                }
            });
        }
        
        // 댓글 신고
        let declareBtn = document.getElementsByClassName("declareBtn");
        for(let i=0; i<declareBtn.length; i++){
            declareBtn[i].addEventListener("click", (e) => {
                if(username == null || username == "" || username == "undefined"){

                    let loginAlertMask = document.getElementById("loginAlertMask");
                    let loginAlertMaskForm = document.getElementById("loginAlertMaskForm");
                    let loginMaskWrap = document.getElementById("loginMaskWrap");
                    let needLogin = document.getElementById("needLogin");
        
                    loginAlertMask.className == "active" ? loginAlertMask.classList.remove("active") : loginAlertMask.classList.add("active");
                    loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
                    loginAlertMaskForm.className == "active" ? loginAlertMaskForm.classList.remove("active") : loginAlertMaskForm.classList.add("active");
                    
                    needLogin.addEventListener("click", (e) => {
                        location.href = "/study/login";
                    });
                    
                } else {

                    reportObj = new Object();
                    let current = new Date();
                    let cyr = current.getFullYear();
                    
                    let cmt = current.getMonth() + 1;
                    if(cmt < 10){
                        cmt = "0" + cmt;
                    }
                    
                    let cdt = current.getDate();
                    if(cdt < 10){
                        cdt = "0" + cdt;
                    }
                    
                    let chr = current.getHours();
                    if(chr < 10){
                        chr = "0" + chr;
                    }
                    
                    let cmn = current.getMinutes();
                    if(cmn < 10){
                        cmn = "0" + cmn;
                    }
                    
                    let csd = current.getSeconds();
                    if(csd < 10){
                        csd = "0" + csd;
                    }
                    
                    let cd = cyr + "." + cmt + "." + cdt + " " + chr + ":" + cmn + ":" + csd;
                    let type = e.currentTarget.parentNode.getAttribute("rc");
                    let idxEtc = e.currentTarget.parentNode.getAttribute("data-idx");
                    let target = e.currentTarget.parentNode.parentNode.childNodes[0].childNodes[1].innerHTML;

                    document.getElementById("report_user").innerHTML = username;
                    document.getElementById("report_date").innerHTML = cd;
                    document.getElementById("report_target").innerHTML = target;

                    reportObj.gmIdx = this.state.gmIdx;
                    reportObj.grIdx = this.state.gIdx;
                    reportObj.username = username; // 신고자
                    reportObj.target = target // 신고대상자
                    reportObj.type = type // 신고들어온 게시판이나 댓, 덧글
                    reportObj.idxEtc = idxEtc;

                    this.reportMask();

                }

            });
        }

        let reportResult = this.props.state.BoardReducer.report;
        document.getElementById("reportResultMessage").innerHTML = reportResult;
        
    }

    dateFunc = (param) => {

        let dateParam = param;
        param < 10 ? dateParam = "0" + param : dateParam = param;

        return dateParam;

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
            loginAlertMaskForm.className == "active" ? this.fadeOut(loginAlertMask, loginMaskWrap) : this.fadeIn(loginAlertMask, loginMaskWrap);
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

    keyUp = (element) => {

        let rc = document.getElementById("rc");
        let reply = element.currentTarget.value;
        
        if(reply.length > 300) {
            element.currentTarget.value = reply.substring(0, 300);
        } else {

            rc.innerHTML = reply.length;

            if(reply.length != 0) {
                rc.classList.add("cnt");
            } else {
                rc.classList.remove("cnt");
            }

        }
        
    }

    fadeIn = (mElement, tElement) => {

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

        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";

    }

    fadeOut = (mElement, tElement) => {

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

        let htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";
        
    }

    regReply = (e) => {
        
        const reply = document.getElementById("replyArea").value;

        if(reply == "" || reply == null) {
            this.replyMask();
        } else {

            let param = new Object();

            param.idxBoard = this.state.boardIdx;
            param.boardType = "board";
            param.gmIdx = this.state.gmIdx;
            param.grIdx = this.state.gIdx;
            param.username = this.state.username;
            param.nickname = this.state.username;
            param.contents = reply.replace(/(\n|\r\n)/g, "<br>");

            this.props.regReplyAct(param);

            document.getElementById("replyArea").value = "";
            
        }

        // 엔터를 원래대로 = (/(<br>|<br\/>|<br \/>)/g, "\r\n");
        // 엔터 치환 = (/(\n|\r\n)/g, "<br>");

    }

    replyMask = (e) => {

        let replyAlertMask = document.getElementById("replyAlertMask");
        let replyAlertMaskForm = document.getElementById("replyAlertMaskForm");
        let replyMaskWrap = document.getElementById("replyMaskWrap");
        let needReply = document.getElementById("needReply");

        replyAlertMask.className == "active" ? replyAlertMask.classList.remove("active") : replyAlertMask.classList.add("active");
        replyAlertMaskForm.className == "active" ? this.fadeOut(replyAlertMask, replyMaskWrap) : this.fadeIn(replyAlertMask, replyMaskWrap);
        replyAlertMaskForm.className == "active" ? replyAlertMaskForm.classList.remove("active") : replyAlertMaskForm.classList.add("active");
        
        needReply.addEventListener("click", (e) => {
            replyAlertMask.classList.remove("active");
            replyAlertMaskForm.classList.remove("active");
            this.replyMaskFadeOut(replyAlertMask, replyMaskWrap)
        });

    }

    modifyMask = (param) => {

        let modifyAlertMask = document.getElementById("modifyAlertMask");
        let modifyAlertMaskForm = document.getElementById("modifyAlertMaskForm");
        let modifyMaskWrap = document.getElementById("modifyMaskWrap");
        let modifyConfirm = document.getElementById("modify");

        modifyAlertMask.className == "active" ? modifyAlertMask.classList.remove("active") : modifyAlertMask.classList.add("active");
        modifyAlertMaskForm.className == "active" ? this.fadeOut(modifyAlertMask, modifyMaskWrap) : this.fadeIn(modifyAlertMask, modifyMaskWrap);
        modifyAlertMaskForm.className == "active" ? modifyAlertMaskForm.classList.remove("active") : modifyAlertMaskForm.classList.add("active");
        
        modifyConfirm.addEventListener("click", (e) => {
            this.props.modRC(param);
            this.modifyMask(param);
        });

    }

    deleteMask = (param) => {
        
        let deleteAlertMask = document.getElementById("deleteAlertMask");
        let deleteAlertMaskForm = document.getElementById("deleteAlertMaskForm");
        let deleteMaskWrap = document.getElementById("deleteMaskWrap");
        let deleteConfirm = document.getElementById("delete");
        let rt = param['replyType'];

        deleteAlertMask.className == "active" ? deleteAlertMask.classList.remove("active") : deleteAlertMask.classList.add("active");
        deleteAlertMaskForm.className == "active" ? this.fadeOut(deleteAlertMask, deleteMaskWrap) : this.fadeIn(deleteAlertMask, deleteMaskWrap);
        deleteAlertMaskForm.className == "active" ? deleteAlertMaskForm.classList.remove("active") : deleteAlertMaskForm.classList.add("active");
        
        deleteConfirm.addEventListener("click", (e) => {
            if(rt == "" || rt == null || rt == "undefined"){
                this.props.delBoard(param);
            } else {
                this.props.delRC(param);
                this.deleteMask(param);
            }
        });

    }

    modForm = (e) => {

        let modUpldMask = document.getElementById("modUploadMask");
        let modUpldMaskForm = document.getElementById("modUploadMaskForm");
        let htmlTag = document.getElementsByTagName("html")[0];
        let modTextForm = document.getElementById("modTextForm");
        let subjectValue = document.getElementById("board_title").innerHTML;
        let contentsValue = document.getElementById("board_info").innerHTML;
        
        modUpldMaskForm.className == "active" ? modUpldMaskForm.classList.remove("active") : modUpldMaskForm.classList.add("active");
        modUpldMask.className == "active" ? this.fadeOut(modUpldMaskForm, modTextForm) : this.fadeIn(modUpldMaskForm, modTextForm);
        modUpldMask.className == "active" ? modUpldMask.classList.remove("active") : modUpldMask.classList.add("active");

        htmlTag.style.overflow == "hidden" ? htmlTag.style.overflow = "auto" : htmlTag.style.overflow = "hidden";
        
        document.getElementById("subject").value = subjectValue;
        document.getElementById("comment").value = contentsValue.replace(/(<br>|<br\/>|<br \/>)/g, "\n");
        document.getElementsByClassName("modUploadHeader")[0].style.display = "none";
        document.getElementById("modUploadControl").style.display = "none";

        // 자식노드 전체 삭제
        let upldList = document.getElementsByClassName("upldList")[0];
        while(upldList.firstChild){
            upldList.removeChild(upldList.firstChild);
        }

    }

    dragEnter = (e) => {

        e.preventDefault();
        e.stopPropagation();

        let modUploadArea = document.getElementById("modUploadArea");
        modUploadArea.style.border = "2px solid #ff0073";
        modUploadArea.style.fontWeight = "bold";

    }

    dragOver = (e) => {

        e.preventDefault();
        e.stopPropagation();

    }

    dragLeave = (e) => {

        e.preventDefault();
        e.stopPropagation();

        let modUploadArea = document.getElementById("modUploadArea");
        modUploadArea.style.border = "none";
        modUploadArea.style.fontWeight = "normal";

    }

    fileDrop = (e) => {

        e.preventDefault();
        e.stopPropagation();

        let modUploadArea = document.getElementById("modUploadArea");
        modUploadArea.style.border = "none";
        modUploadArea.style.fontWeight = "normal";
        
        let files = e.dataTransfer.files;
        for(let i=0; i<files.length; i++){

            this.fileCnt = this.fileCnt + 1;
            let fileObject = new Object();
            let randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            fileObject.fileName = files[i].name;
            fileObject.fileSize = files[i].size;
            fileObject.file = files[i];
            fileObject.randomName = randomName;
            fileObject.cnt = this.fileCnt;

            let sizeKB = files[i].size / 1024;
            let sizeMB = sizeKB / 1024;
            let sizeGB = sizeMB / 1024;
            let sizeUnit;

            sizeUnit = sizeKB > 1024 ? sizeMB.toFixed(2) + " MB" : sizeKB.toFixed(2) + " KB";
            sizeUnit = sizeMB > 1024 ? sizeGB.toFixed(2) : sizeUnit;

            fileObject.sizeUnit = sizeUnit;
            
            upldArr.push(fileObject);
            baseArr.push(fileObject);

        }
        
        this.setState({
            upldList: baseArr,
        });

        document.getElementsByClassName("modUploadHeader")[0].style.display = "block";
        document.getElementById("modUploadControl").style.display = "inline-block";

    }

    checkChange = (e) => {

        let upldChkClass = 0;
        const upldClass = document.getElementsByClassName("upld_file");

        for(let upldKey=0; upldKey<upldClass.length; upldKey++){
            if(upldClass[upldKey].checked == true){
                upldChkClass++;
            }
        }

        if(upldChkClass == upldClass.length){
            document.getElementById("upld_all").checked = true;
        } else {
            document.getElementById("upld_all").checked = false;
        }

    }

    allCheck = (e) => {
        
        let upldAll = document.getElementById("upld_all");
        let upldEach = document.getElementsByClassName("upld_file");

        if(upldAll.checked == true){
            for(let i=0; i<upldEach.length; i++){
                upldEach[i].checked = true;
            }
        } else {
            for(let i=0; i<upldEach.length; i++){
                upldEach[i].checked = false;
            }
        }
    }

    uploadDelete = (e) => {

        const upldClass = document.getElementsByClassName("upld_file");

        let upldCnt = upldClass.length;
        let chkCnt = 0;

        for(let i=upldCnt-1; i>=0; i--){
            
            if(upldClass[i].checked == true){

                chkCnt++;

                let rCode = upldClass[i].getAttribute("code");
                let oCode = upldClass[i].getAttribute("origin");
                let dot = oCode.indexOf(".");
                let ext = oCode.substr(dot); // .확장자 ( dot+1 하면 점은 빠짐 )
                
                let delObj = new Object();
                delObj.rCode = rCode;
                delObj.ext = ext;

                let upldIdx = upldArr.findIndex((item) => {
                    return item.randomName === rCode;
                });
                if(upldIdx != -1){
                    upldArr.splice(upldIdx, 1);
                }

                delArr.push(delObj);
                upldClass[i].parentNode.remove();

                if(upldCnt == chkCnt){
                    document.getElementsByClassName("modUploadHeader")[0].style.display = "none";
                    document.getElementById("modUploadControl").style.display = "none";
                }

            }
        }

    }

    modBoard = (e) => {

        let subject = document.getElementById("subject").value;
        let comment = document.getElementById("comment").value;
        let idx = document.getElementById("boardMod").getAttribute("data-idx");
        comment = comment.replace(/(\n|\r\n)/g, "<br />");
        
        let modObj = new Object();
        modObj.idx = idx;
        modObj.subject = subject;
        modObj.comment = comment;
        modObj.idxUser = this.state.gmIdx;
        modObj.idxUserGroup = this.state.gIdx;
        modObj.upldList = upldArr;
        modObj.delList = delArr;

        this.props.modBoard(modObj);
        this.modForm(idx);

    }

    reportMask = () => {

        selectedOptions = "";
        document.getElementById("report_title").innerHTML = "선택해주세요.";
        document.getElementById("report_comments").value = "";
        document.getElementById("report_reason").classList.remove("dropdown");

        let reportMask = document.getElementById("reportMask");
        let reportMaskForm = document.getElementById("reportMaskForm");
        let reportMaskWrap = document.getElementById("reportMaskWrap");
        
        reportMask.className == "active" ? reportMask.classList.remove("active") : reportMask.classList.add("active");
        reportMaskForm.className == "active" ? this.fadeOut(reportMask, reportMaskWrap) : this.fadeIn(reportMask, reportMaskWrap);
        reportMaskForm.className == "active" ? reportMaskForm.classList.remove("active") : reportMaskForm.classList.add("active");
        
    }

    reportResultMask = (e) => {

        let reportResultMask = document.getElementById("reportResultMask");
        let reportResultMaskForm = document.getElementById("reportResultMaskForm");
        let reportResultMaskWrap = document.getElementById("reportResultMaskWrap");
        
        reportResultMask.className == "active" ? reportResultMask.classList.remove("active") : reportResultMask.classList.add("active");
        reportResultMaskForm.className == "active" ? this.fadeOut(reportResultMask, reportResultMaskWrap) : this.fadeIn(reportResultMask, reportResultMaskWrap);
        reportResultMaskForm.className == "active" ? reportResultMaskForm.classList.remove("active") : reportResultMaskForm.classList.add("active");

        document.getElementById("report_title").innerHTML = "선택해주세요.";

    }

    selectOpt = (e) => {

        let reportReason = document.getElementById("report_reason");
        if(reportReason.classList.contains("dropdown")){
            reportReason.classList.remove("dropdown");
        } else {
            reportReason.classList.add("dropdown");
        }

    }

	render() {

        const upld = this.state.upldList;
        const upldList = upld != null ?
            upld.map((list) => (
            <li key={list.cnt}>

                <input type="checkbox" className={"upld_file"} id={"upld_file_" + list.cnt} value={list.cnt} code={list.randomName} origin={list.fileName} onChange={this.checkChange} />
                <label htmlFor={"upld_file_" + list.cnt} value={list.cnt}></label>

                <span>{list.fileName}</span>
                <span>{list.sizeUnit}</span>

            </li>
            )) : null;
		
		return (

            <div>

				<Header />

                <div className={boardStyle('boardWrap')}>
                    <section>
                        <div className={boardStyle('board_container')}>

                            <div className={boardStyle('board_title')}>
                                <h2 id="board_title"></h2>
                            </div>

                            <div className={boardStyle('board_reg_info_btn')}>
                                
                                <div id="board_date_user"></div>
                                <div id="board_btn"></div>

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

                                <div id='board_attach'></div>

                            </div>

                            <div className={boardStyle('board_comment')}>
                                <div className={boardStyle('board_comment_wrap')}>

                                    <div id="comment_disable">
                                        <p>로그인 후 댓글을 입력하실 수 있습니다.</p>
                                        <a id="comment_login_btn">로그인</a>
                                    </div>

                                    <div className={boardStyle('comment_reply_area')}>
                                        <textarea id="replyArea" onFocus={this.replyIn} onBlur={this.replyOut} onKeyUp={this.keyUp}></textarea>
                                    </div>

                                    <div className={boardStyle('comment_reply_btn')}>
                                        
                                        <div className={boardStyle('reply_left')}>
                                            <label className={boardStyle('filtImg_label')} htmlFor="fileImg"></label>
                                            <input type="file" id="fileImg"></input>
                                        </div>

                                        <div className={boardStyle('reply_right')}>
                                            <span className={boardStyle('reply_count')}><em id="rc">0</em>/300</span>
                                            <button id="replySubmit" onClick={this.regReply}>등록</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>
                    <section>
                        <div className={boardStyle('reply_container')}>
                            
                            <div className={boardStyle('reply_wrap')}>
                                <p>댓글<span id="reply_total">0</span></p>
                            </div>
                            
                            <div id="reply_list"></div>
                            
                            <div className={boardStyle('pagination_wrap')}>
                                <ol className={boardStyle('reply_pagination')}></ol>
                            </div>

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

                <div id="replyAlertMask" onClick={this.replyMask}></div>
                <div id="replyAlertMaskForm">
                    <div id="replyMaskWrap">

                        <div id="replyMaskClose" onClick={this.replyMask}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="replyAlert">
                            <img src='/study/resources/img/port_warning.png' />
                            <p>내용을 입력하세요.</p>
                        </div>
                        
                        <div id="replyConfirm">
                            <a id="needReply">확인</a>
                        </div>

                    </div>
                </div>

                <div id="deleteAlertMask" onClick={this.deleteMask}></div>
                <div id="deleteAlertMaskForm">
                    <div id="deleteMaskWrap">

                        <div id="deleteMaskClose" onClick={this.deleteMask}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="deleteAlert">
                            <img src='/study/resources/img/port_warning.png' />
                            <p>작성된 내용을 삭제하시겠습니까?</p>
                        </div>
                        
                        <div id="deleteConfirm">
                            <a id="delete">확인</a>
                            <a onClick={this.deleteMask}>취소</a>
                        </div>

                    </div>
                </div>
                
                <div id="modifyAlertMask" onClick={this.modifyMask}></div>
                <div id="modifyAlertMaskForm">
                    <div id="modifyMaskWrap">

                        <div id="modifyMaskClose" onClick={this.modifyMask}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="modifyAlert">
                            <img src='/study/resources/img/port_warning.png' />
                            <p>작성된 내용으로 수정하시겠습니까?</p>
                        </div>
                        
                        <div id="modifyConfirm">
                            <a id="modify">확인</a>
                            <a onClick={this.modifyMask}>취소</a>
                        </div>

                    </div>
                </div>

                <div id="modUploadMask" onClick={this.modForm}></div>
                <div id="modUploadMaskForm">

                    <div id="modUploadMaskClose" onClick={this.modForm}>
                        <i className={boardStyle('firstClose')}></i>
                        <i className={boardStyle('secondClose')}></i>
                    </div>

                    <div id="modUploadArea" onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={this.fileDrop}>
                        <div>파일을 드래그하여 이 곳에 넣어주세요.</div>
                    </div>

                    <div id="modUploadList">

                        <div className="modUploadHeader">
                            <input type="checkbox" className="upld_all" id="upld_all" checked={this.state.isAllChecked} onChange={this.allCheck} />
                            <label htmlFor="upld_all"></label>
                            <span>파일명</span>
                            <span style={{right: "20px", width: "80px", textAlign: "center", }}>용량</span>
                        </div>

                        <ul className="upldList">
                            {upldList}
                        </ul>

                    </div>

                    <div id="modUploadControl">
                        <div onClick={this.uploadDelete}>
                            <a>삭제</a>
                        </div>
                    </div>

                    <div id="modUploadDiv"></div>

                    <div id="modTextForm">
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
                            <a onClick={this.modBoard}>수정하기</a>
                        </div>
                    </div>

                </div>
                
                <div id="reportMask" onClick={this.reportMask}></div>
                <div id="reportMaskForm">
                    <div id="reportMaskWrap">

                        <div id="reportTitle">
                            <span>신고하기</span>
                        </div>

                        <div id="reportMaskClose" onClick={this.reportMask}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="reportAlert">
                            <p>
                                신고사유 선택 후 상세한 신고 내용을 함께 작성해 주시면 확인에 큰 도움이 됩니다.
                                <br />
                                허위신고 시 운영정책에 의거하여 제재될 수 있습니다.
                            </p>
                        </div>

                        <div id="reportForm">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>신고자</th>
                                        <td id="report_user">abcd</td>
                                    </tr>
                                    <tr>
                                        <th>신고일</th>
                                        <td id="report_date">abcd</td>
                                    </tr>
                                    <tr>
                                        <th>신고대상자</th>
                                        <td id="report_target">abcd</td>
                                    </tr>
                                    <tr>
                                        <th>신고사유</th>
                                        <td>
                                            <div id="report_reason">
                                                <div id="report_title" onClick={this.selectOpt}>
                                                    선택해주세요.
                                                </div>
                                                <div id="report_option">
                                                    <label className="ros">
                                                        <input type="radio" value="불건전 언어 사용" />
                                                        불건전 언어 사용
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="잘못된 정보" />
                                                        잘못된 정보
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="도배" />
                                                        도배
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="사칭 및 사기" />
                                                        사칭 및 사기
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="타인비방" />
                                                        타인비방
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="음란물" />
                                                        음란물
                                                    </label>
                                                    <label className="ros">
                                                        <input type="radio" value="기타" />
                                                        기타 ( 신고내용 작성 필수 )
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>신고내용</th>
                                        <td>
                                            <textarea id="report_comments"></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="reportConfirm">
                            <a id="reportSubmit">확인</a>
                            <a onClick={this.reportMask}>취소</a>
                        </div>

                    </div>
                </div>
                
                <div id="reportResultMask" onClick={this.reportResultMask}></div>
                <div id="reportResultMaskForm">
                    <div id="reportResultMaskWrap">

                        <div id="reportResultMaskClose" onClick={this.reportResultMask}>
                            <i className={boardStyle('firstClose')}></i>
                            <i className={boardStyle('secondClose')}></i>
                        </div>

                        <div id="reportResult">
                            <img src='/study/resources/img/port_warning.png' />
                            <p id="reportResultMessage"></p>
                        </div>
                        
                        <div id="reportResultConfirm">
                            <a id="needReportResult" onClick={this.reportResultMask}>확인</a>
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
        like: (param) => dispatch(BoardReducer.like(param)),
        regReplyAct: (param) => dispatch(BoardReducer.reply(param)),
        getReplyInfo: (param) => dispatch(BoardReducer.getReply(param)),
        regCommentsAct: (param) => dispatch(BoardReducer.comments(param)),
        modRC: (param) => dispatch(BoardReducer.modRC(param)),
        delRC: (param) => dispatch(BoardReducer.delRC(param)),
        delBoard: (param) => dispatch(BoardReducer.delBoard(param)),
        modBoard: (param) => dispatch(BoardReducer.modBoard(param)),
        rcLike: (param) => dispatch(BoardReducer.rcLike(param)),
        report: (param) => dispatch(BoardReducer.report(param)),
	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Boardview));