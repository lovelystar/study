import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import portfolio from "../../scss/portfolio.scss";
const portfolioStyle = classNames.bind(portfolio);

import styled from "styled-components";
const BasicSectionWrap = styled.section`
    text-align: center;
    padding-bottom: 50px;
    background-color: ${props => {if(props.even) return '#f6f6f6'; else return '#ffffff';}}
    p { font-weight: bold; margin: 0; padding: 20px 0;}
`;

class Portfolio extends Component {
    
	constructor(props){

		super(props);
		this.state = {
        }

    }

    componentDidMount() {
        
        let sectionHTotal = 0;
        
        // 크로스 브라우징
        // client@@@ = 스크롤바의 공간을 제외한 부분
        let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        /*
        console.log("clientWidth = " + clientWidth);
        console.log("clientHeight = " + clientHeight);
        
        // offset@@@ = 스크롤바의 공간을 포함한 부분
        // scroll@@@ = 스크롤이 안보이는 영역까지의 길이

        // 현재 화면에서 실제로 사용가능한 최대치의 폭과 넓이
        console.log("window.screen.availWidth = " + window.screen.availWidth);
        console.log("window.screen.availHeight = " + window.screen.availHeight);

        // 현재 브라우저의 크기 값을 반환
        console.log("window.outerWidth = " + window.outerWidth);
        console.log("window.outerHeight = " + window.outerHeight);
        */

        // 스크롤 이벤트
        window.addEventListener("scroll", this.portfolioScroll);
        
        // 인터넷 창 조절 이벤트
        window.addEventListener("resize", this.portfolioResize);

        // 텍스트 타이핑 애니메이션
        let textElements = document.getElementsByClassName("text_animated");


        // 첫번째 섹션의 크기 설정
        let sectionTag = document.getElementsByTagName("section");
        sectionTag[0].style.height = clientHeight - 56 + "px";

        // 헤더 animate
        let headerBreak = false;
        let headerCategory = document.getElementsByClassName("headerLink");

        for(let i=0; i<textElements.length; i++){

            let basicText = textElements[i].getAttribute("text-data");
            let period = textElements[i].getAttribute("text-period");

            this.textAnimation(textElements[i], JSON.parse(basicText), period);

        }

        for(let i=0; i<sectionTag.length; i++){

            // 스크롤 위치
            let scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // 그냥 이일반 sectionTag[i].style.height로는 값을 불러오질 못함.
            let sectionH = parseInt(window.getComputedStyle(sectionTag[i]).height.replace("px", "").trim());
            sectionHTotal += sectionH

            if(scrollPosition <= sectionHTotal && headerBreak == false){

                headerBreak = true;
                headerCategory[i].classList.add("active");

            } else {
                headerCategory[i].classList.remove("active");
            }

        }
        
        window.scrollTo(0, 0);

    }

    // 마우스 스크롤
    portfolioScroll = (e) => {
                
        let filledSkillBar = document.getElementsByClassName("filled_skill_bar");
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let toTopBtn = document.getElementsByClassName("to_top_btn");

        // 스크롤 위치
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // 첫번째 섹션
        let firstSec = document.getElementById("firstSection");
        let scrollValue = scrollPosition / 400;

        // header
        let headerTag = document.getElementById("header");

        if(scrollPosition > clientHeight / 1.2){
            
            if(filledSkillBar[0].className === "filled_skill_bar") {

                // toTopBtn[0].className += " active";
                this.fadeIn(toTopBtn);

                filledSkillBar[0].className += " skill_html";
                filledSkillBar[1].className += " skill_ajax";
                filledSkillBar[2].className += " skill_javascript";
                filledSkillBar[3].className += " skill_jquery";
                filledSkillBar[4].className += " skill_css";

                headerTag.classList.add("active");

            }

        } else {

            if(filledSkillBar[0].className !== "filled_skill_bar") {

                // toTopBtn[0].className = toTopBtn[0].className.replace(" active", "");
                this.fadeOut(toTopBtn);
                
                filledSkillBar[0].className = filledSkillBar[0].className.replace(" skill_html", "");
                filledSkillBar[1].className = filledSkillBar[1].className.replace(" skill_ajax", "");
                filledSkillBar[2].className = filledSkillBar[2].className.replace(" skill_javascript", "");
                filledSkillBar[3].className = filledSkillBar[3].className.replace(" skill_jquery", "");
                filledSkillBar[4].className = filledSkillBar[4].className.replace(" skill_css", "");

                headerTag.classList.remove("active");

            }

        }

        firstSec.style.backgroundImage = 
        'linear-gradient(to bottom, rgba(255, 255, 255, ' + scrollValue + '), rgba(255, 255, 255, ' + scrollValue + ')), url(/study/resources/img/bg_temp.jpg)';
        
        
        // 헤더 animate
        let headerBreak = false;
        let sectionTag = document.getElementsByTagName("section");
        let headerCategory = document.getElementsByClassName("headerLink");
        let sectionHTotal = 0;

        for(let i=0; i<sectionTag.length; i++){

            // 스크롤 위치
            let scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // 그냥 이일반 sectionTag[i].style.height로는 값을 불러오질 못함.
            let sectionH = parseInt(window.getComputedStyle(sectionTag[i]).height.replace("px", "").trim() / 1.1);
            sectionHTotal += sectionH

            if(scrollPosition <= sectionHTotal && headerBreak == false){

                headerBreak = true;
                headerCategory[i].classList.add("active");

            } else {
                
                headerCategory[i].classList.remove("active");

            }

        }
        
    }
    
    // 인터넷 창 조절 이벤트
    portfolioResize = (e) => {

        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let sectionTag = document.getElementsByTagName("section");
        sectionTag[0].style.height = clientHeight - 56 + "px";

    }

    // 텍스트 애니메이션
    textAnimation = (elements, fullTxt, tPer) => {
        
        let loop = 0;
        tPer = parseInt(tPer, 10) || 2000;
        let result = "";
        let txtBoolean = false;

        this.textAniExec(elements, fullTxt, tPer, loop, result, txtBoolean);

    }

    // 텍스트 애니메이션 실행
    textAniExec = (elements, fullTxt, tPer, loop, result, txtBoolean) => {

        let count = loop % fullTxt.length;
        let baseTxt = fullTxt[count];

        if(txtBoolean) {
            result = baseTxt.substring(0, result.length - 1);
        } else {
            result = baseTxt.substring(0, result.length + 1);
        }
        
        elements.innerHTML = "<span class='text_animated_wrap'>" + result + "</span>";
        
        let speed = 150 - Math.random() * 100;
        if(txtBoolean){
            speed /= 2;
        }

        if(!txtBoolean && result === baseTxt) {
            txtBoolean = true;
            speed = tPer;
        } else if(txtBoolean && result === "") {
            txtBoolean = false;
            loop++;
            speed = 500;
        }

        setTimeout(() => {
            this.textAniExec(elements, fullTxt, tPer, loop, result, txtBoolean);
        }, speed);
    
    }

    // fadeIn
    fadeIn = (e) => {

        let opacity = 0;
        let fade = setInterval(function() {

            e[0].style.display = "block";
            opacity += 1 * 0.5;
            
            if(opacity >= 1) {
                
                clearInterval(fade);
                e[0].style.opacity = 1;

            }

        }, 50);

    }

    // fadeOut
    fadeOut = (e) => {

        let opacity = e[0].style.opacity;
        let fade = setInterval(function() {

            opacity -= 1 * 0.3;
            
            if(opacity <= 0) {
                
                clearInterval(fade);
                e[0].style.opacity = 0;

            }

        }, 50);

    }

    // 제일 상단으로 이동하는 버튼클릭 이벤트
    toTop = () => {

        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        let scrollStep = scrollPosition / (1000 / 50);

        let scrollToTop = setInterval(function() {
            
            // 스크롤 이동
            window.scrollBy(0, -scrollStep);
            
            // 스크롤 위치 값 갱신
            scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // 스크롤이 맨 위로 도착하면
            if(scrollPosition == 0) {
                
                clearInterval(scrollToTop);
                scrollPosition = 0;

            }

        }, 15);

    }



	render() {
        
		return (
				
			<div>

				<Header />

                <div className={portfolioStyle('port_main')}>
                    <BasicSectionWrap id="firstSection">
                        <div className={portfolioStyle('port_inner_container')}>
                            <div className={portfolioStyle('port_title')}>
                                <h2 style={{position: "absolute", left: "-9999px", top: "-9999px",}}>Home</h2>
                                <div className={portfolioStyle('text_animated_container')}>
                                    <div>
                                        <span className={portfolioStyle("text_animated")} text-data='["Full-Stack Developer."]' text-period="2000"></span>
                                    </div>
                                    <p>Sumin Oh</p>
                                </div>
                                <a className={portfolioStyle("scrolling_btn")}></a>
                            </div>
                        </div>
                    </BasicSectionWrap>
                    <BasicSectionWrap even>
                        <div className={portfolioStyle('port_inner_container')}>
                            <div className={portfolioStyle('port_title')}>
                                <h2>About</h2>
                            </div>
                            <div className={portfolioStyle('port_about')}>
                                <div className={portfolioStyle('about_left')}>
                                    <div className={portfolioStyle('port_profile')}>

                                        <h3 style={{paddingBottom: "30px",}}>Profile</h3>
                                        <img src="/study/resources/img/portfolio.jpg" />

                                        <ul className={portfolioStyle('profile_personal')}>
                                            <li>오 수 민</li>
                                            <li>Full-Stack Developer [경력, 3년]</li>
                                            <li>1994. 02. 01</li>
                                            <li>서울특별시 송파구 석촌동</li>
                                            <li>010-4651-4580</li>
                                            <li>kr_alice@naver.com</li>
                                            <li>lovelystar0201@naver.com</li>
                                        </ul>

                                    </div>
                                    <div className={portfolioStyle('port_record')}>

                                        <h3>Record</h3>
                                        <ul className={portfolioStyle('record_personal')}>
                                            <li>
                                                <p>전주대학교</p>
                                                <p>정보시스템 전공 ( 수석 )</p>
                                                <p>2012.03 ~ 2018.02</p>
                                            </li>
                                            
                                            <li>
                                                <p>G-SMATT</p>
                                                <p>콘텐츠 운영팀</p>
                                                <p>2017.08 ~ 2020.xx</p>
                                            </li>
                                        </ul>

                                    </div>
                                    <div className={portfolioStyle('skill_bar')}>
                                        <ul>

                                            <li>
                                                
                                                <span>HTML</span>
                                                <div className={portfolioStyle('skill_bar_wrap')}>
                                                    <div className={portfolioStyle('empty_skill_bar')}></div>
                                                    <div className={portfolioStyle('filled_skill_bar')}></div>
                                                </div>

                                            </li>
                                            <li>
                                                
                                                <span>Ajax</span>
                                                <div className={portfolioStyle('skill_bar_wrap')}>
                                                    <div className={portfolioStyle('empty_skill_bar')}></div>
                                                    <div className={portfolioStyle('filled_skill_bar')}></div>
                                                </div>

                                            </li>
                                            <li>
                                                
                                                <span>JavaScript</span>
                                                <div className={portfolioStyle('skill_bar_wrap')}>
                                                    <div className={portfolioStyle('empty_skill_bar')}></div>
                                                    <div className={portfolioStyle('filled_skill_bar')}></div>
                                                </div>

                                            </li>
                                            <li>
                                                
                                                <span>JQuery</span>
                                                <div className={portfolioStyle('skill_bar_wrap')}>
                                                    <div className={portfolioStyle('empty_skill_bar')}></div>
                                                    <div className={portfolioStyle('filled_skill_bar')}></div>
                                                </div>

                                            </li>
                                            <li>
                                                
                                                <span>CSS</span>
                                                <div className={portfolioStyle('skill_bar_wrap')}>
                                                    <div className={portfolioStyle('empty_skill_bar')}></div>
                                                    <div className={portfolioStyle('filled_skill_bar', 'active')}></div>
                                                </div>

                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className={portfolioStyle('about_right')}>
                                    <div className={portfolioStyle('port_skill')}>

                                        <h3 style={{paddingBottom: "30px",}}>Skill</h3>
                                        <ul className={portfolioStyle('skill_personal')}>
                                            <li> - Spring Framework 4</li>
                                            <li> - MVC 이해</li>
                                            <li> - MySQL 활용</li>
                                            <li> - MyBatis 활용</li>
                                            <li> - 다중 DB 접속 활용</li>
                                            <li> - FFMPEG, FFPROBE 활용</li>
                                            <li> - 파일업로드</li>
                                            <li> - Spring Security</li>
                                            <li> - 보안서버 구축 : 인증서버 ( Access Token + JWT + JDBC )</li>
                                            <li> - 자원서버 구축</li>
                                            <li> - 소켓서버 구축 : 실시간 통신</li>
                                            <li> - 쿼리문 작성</li>
                                            <li> - Restful Api 제작</li>
                                            <li> - HTML5, CSS3 웹 표준 마크업</li>
                                            <li> - JavaScript 활용</li>
                                            <li> - Ajax 활용</li>
                                            <li> - JQuery 활용</li>
                                            <li> - SCSS 경험</li>
                                            <li> - Amazon S3 연동 테스트</li>
                                            <li> - React Study</li>
                                            <li> - Redux Study</li>
                                            <li> - Redux-saga Study</li>
                                            <li> - 반응형 Study</li>
                                            <li> - JPA Study</li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </BasicSectionWrap>
                    <BasicSectionWrap>
                        <div className={portfolioStyle('port_inner_container')}>
                            
                            <div className={portfolioStyle('port_title')}>
                                <h2>Portfolio</h2>
                            </div>
                            
                            <div className={portfolioStyle('port_info')}>
                                <img src="/study/resources/img/bg_temp.jpg" />
                                <div className={portfolioStyle('port_info_detail')}>
                                    <span>01</span>
                                    <h3>OAuth</h3>
                                    <p>사용자, 인증서버, 자원서버로 분할하여 인증 및 접근하는 페이지입니다.</p>
                                    <ul>
                                        <li>2019.12 ~ 2020. 02</li>
                                        <li>Spring Security</li>
                                        <li>OAuth</li>
                                        <li>Authentication Server</li>
                                        <li>Resource Server</li>
                                        <li>기획 / 디자인 / 개발 참여도 100%</li>
                                    </ul>
                                    <a href="/study/client/">View</a>
                                </div>
                            </div>

                            <div className={portfolioStyle('port_info')}>
                                <img style={{float: "left", }} src="/study/resources/img/bg_temp.jpg" />
                                <div style={{float: "right", }} className={portfolioStyle('port_info_detail')}>
                                    <span>02</span>
                                    <h3>게시판</h3>
                                    <p>게시판 기능을 구현한 페이지입니다.</p>
                                    <ul>
                                        <li>2020. 01 ~ 2020. 02</li>
                                        <li>파일업로드</li>
                                        <li>Spring Security</li>
                                        <li>Swiper</li>
                                        <li>기획 / 디자인 / 개발 참여도 100%</li>
                                    </ul>
                                    <a href="/study/board">View</a>
                                </div>
                            </div>

                            <div className={portfolioStyle('port_info')}>
                                <img src="/study/resources/img/bg_temp.jpg" />
                                <div className={portfolioStyle('port_info_detail')}>
                                    <span>03</span>
                                    <h3>Web Socket</h3>
                                    <p>소켓을 이용한 채팅 기능을 구현한 페이지입니다.</p>
                                    <ul>
                                        <li>2019. 12 ~ 2020. 02</li>
                                        <li>Web Socket</li>
                                        <li>Client Server 자체</li>
                                        <li>Web Socket Server 별도 구현</li>
                                        <li>HTML5</li>
                                        <li>Access Token</li>
                                        <li>OAuth</li>
                                    </ul>
                                    <a style={{width: "48%", marginRight: "4%"}} href="/study/clientws">Client</a>
                                    <a style={{width: "48%", }} href="/study/resourcews">Resource</a>
                                </div>
                            </div>

                        </div>
                    </BasicSectionWrap>
                    <BasicSectionWrap even>
                        <div className={portfolioStyle('port_inner_container')}>
                            <div className={portfolioStyle('port_title')}>
                                <h2>Contact Us</h2>
                            </div>
                            <p>Owner : 오수민</p>
                            <p>Email : kr_alice@naver.com</p>
                            <p>Email : lovelystar0201@naver.com</p>
                            <p>HP : 010-4651-4580</p>
                        </div>
                    </BasicSectionWrap>
                </div>

                <div className={portfolioStyle('to_top_btn')} onClick={this.toTop}>
                    <a>To Top</a>
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

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Portfolio));