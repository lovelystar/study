import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";

import classNames from "classnames/bind";
import header from "../../scss/header.scss";
const headerStyle = classNames.bind(header);

class Header extends Component {

	constructor(props){

		super(props);
		this.state = {
            username: document.getElementById("username").value,
            gIdx: document.getElementById("gIdx").value,
            gmIdx: document.getElementById("gmIdx").value,
		}

	}

	componentDidMount() {

		let username = this.state.username;
		let htmlTag = document.getElementsByTagName("html")[0];
		let headerCateTag = document.getElementsByClassName("headerLink");
		let locPath = location.pathname;

		if(username == null || username == "" || username == "undefined"){
            
            const loggedIn = document.getElementById("logged_in");
			loggedIn.classList.add("active");
			
        } else {

            const loggedOut = document.getElementById("logged_out");
			const profileName = document.getElementById("profile_username");
			const ddName = document.getElementById("dropdown_username");
			
            loggedOut.classList.add("active");
			profileName.innerHTML = username;
			ddName.innerHTML = username;

        }

		for(let t=0; t<headerCateTag.length; t++){
			
			let headerCatePath = headerCateTag[t].getAttribute("href");
			headerCatePath == locPath ? headerCateTag[t].classList.add("active") : headerCateTag[t].classList.remove("active");

		}

		const loggedOut = document.getElementById("logged_out");
		const dropdown = document.getElementById("dropdown_wrap");

		loggedOut.addEventListener("click", (e) => {
			loggedOut.parentNode.className == "dropdown" ? loggedOut.parentNode.classList.remove("dropdown") : loggedOut.parentNode.classList.add("dropdown")
			dropdown.className == "dropdown" ? dropdown.classList.remove("dropdown") : dropdown.classList.add("dropdown");
		});

		const dropdownDetail = document.getElementsByClassName("dropdown_detail");
		for(let i=0; i<dropdownDetail.length; i++){
			dropdownDetail[i].addEventListener("click", (e) => {
				const dataloc = dropdownDetail[i].getAttribute("dataloc");
				console.log("dataloc = " + dataloc);
			});
		}

	}

	headerCateClick = (e) => {

		let clickOrder = e.currentTarget.getAttribute("h_order");
		let sectionTag = document.getElementsByTagName("section");
		let sectionHTotal = 0;

		for(let i=0; i<sectionTag.length; i++){
			console.log(parseInt(window.getComputedStyle(sectionTag[i]).height.replace("px", "").trim()));
			let sectionH;
			i==0 ? sectionH = 0 : sectionH = parseInt(window.getComputedStyle(sectionTag[i-1]).height.replace("px", "").trim());

			sectionHTotal += sectionH;

			console.log("clickOrder = " + clickOrder);
			console.log("i = " + i);
			if(clickOrder == i) {

				console.log("sectionHTotal = " + sectionHTotal);
				console.log("sectionH = " + sectionH);

				console.log("element.scrollHeight = " + document.documentElement.scrollHeight);
				console.log("element.scrollTop = " + document.documentElement.scrollTop);
				console.log("element.clientHeight = " + document.documentElement.clientHeight)
				//this.moveWindow(sectionHTotal, sectionH);

			}

		}

	}

	headerMenu = () => {
		
		/*
		let mHeader = document.getElementsByClassName("m_header_menu");
		mHeader[0].className += (" clicked");
*/
		let mHeader = document.getElementsByClassName("m_header_menu");
		mHeader[0].classList.contains("clicked") ? mHeader[0].classList.remove("clicked") : mHeader[0].classList.add("clicked");

	}

	moveWindow = (sectionHTotal, sectionH) => {

		let scrollPosition = window.scrollY || document.documentElement.scrollTop;
		let scrollBoolean;
		let scrollStep;

		sectionH == 0 ? sectionH = 700 : false;
		
		sectionHTotal < scrollPosition ? scrollBoolean = true : scrollBoolean = false;
		sectionHTotal < scrollPosition ? scrollStep = -sectionH / (1000 / 200) : scrollStep = sectionH / (1000 / 50);

        let scrollToHeight = setInterval(function() {
			
			console.log("sectionHTotal = " + sectionHTotal);
			console.log("scrollBoolean = " + scrollBoolean);
			console.log("scrollStep = " + scrollStep);
			console.log("scrollPosition = " + scrollPosition);

			// 스크롤 이동
            window.scrollBy(sectionHTotal, scrollStep);
            
            // 스크롤 위치 값 갱신
			scrollPosition = window.scrollY || document.documentElement.scrollTop;
			
            // 스크롤이 조건에 맞으면
			if(scrollBoolean){

				if(scrollPosition <= sectionHTotal){
					clearInterval(scrollToHeight, sectionH);
				}

			} else {

				if(scrollPosition >= sectionHTotal){
					clearInterval(scrollToHeight, sectionH);
				}

			}

		}, 20);

	}

	render() {
		
		return (
			<div>

				<header id={headerStyle('header')}>
					<div className={headerStyle('inner_header')}>

						<h1 className={headerStyle('logo')}>
							<a href="/study/portfolio">OSM</a>
						</h1>

						<div className={headerStyle('header_category')}>
							<ul>
								<li>
									<a className="headerLink" h_order="0" onClick={this.headerCateClick}>Home</a>
								</li>
								<li>
									<a className="headerLink" h_order="1" onClick={this.headerCateClick}>About</a>
								</li>
								<li>
									<a className="headerLink" h_order="2" onClick={this.headerCateClick}>Portfolio</a>
								</li>
								<li>
									<a className="headerLink" h_order="3" onClick={this.headerCateClick}>Contact</a>
								</li>
							</ul>
						</div>

						<div id="header_login">

							<div className={headerStyle('header_profile')} id="logged_in">
								<a href="/study/login">Login</a>
								<a>Sign up</a>
							</div>

							<div className={headerStyle('header_profile')} id="logged_out">
								<img id="profile_default" src="/study/resources/img/port_profile_default.png"></img>
								<span id="profile_username"></span>
								<img id="profile_icon" src="/study/resources/img/f107-icon.png"></img>
							</div>

						</div>

						<div className={headerStyle('m_header_menu')} onClick={this.headerMenu}>
							<i id="firstIcon"></i>
							<i id="secondIcon"></i>
							<i id="thirdIcon"></i>
						</div>

					</div>

					<div id="profile_dropdown">
						<div id="dropdown_container">
							<div id="dropdown_wrap">

								<div id="dropdown_profile" className="dropdown_detail" dataloc="timeline">
									<a>
										<img id="dropdown_default" src="/study/resources/img/port_profile_default.png"></img>
										<span id="dropdown_username"></span>
									</a>
								</div>

								<hr />

								<ul id="dropdown_info">
									<li className="dropdown_detail" dataloc="myInfo">
										<img id="dropdown_default" src="/study/resources/img/port_profile_info.gif" style={{opacity: 1, borderRadius: "50%",}}></img>
										<span>내 정보</span>
									</li>
									<li className="dropdown_detail" dataloc="cart">
										<img id="dropdown_default" src="/study/resources/img/port_cart.png"></img>
										<span>장바구니</span>
									</li>

									<hr />

									<li className="dropdown_detail" dataloc="alarm">
										<img id="dropdown_default" src="/study/resources/img/port_alarm.png"></img>
										<span>알림</span>
									</li>
									<li className="dropdown_detail" dataloc="message">
										<img id="dropdown_default" src="/study/resources/img/port_message.png"></img>
										<span>쪽지</span>
									</li>

									<hr />

									<li className="dropdown_detail" dataloc="service">
										<img id="dropdown_default" src="/study/resources/img/port_question.png"></img>
										<span>고객센터</span>
									</li>
									<li className="dropdown_detail" dataloc="report">
										<img id="dropdown_default" src="/study/resources/img/port_alarm.png"></img>
										<span>신고센터</span>
									</li>

									<hr />

									<li className="dropdown_detail" dataloc="logout">
										<img id="dropdown_default" src="/study/resources/img/port_logout.png"></img>
										<span>로그아웃</span>
									</li>

								</ul>
							</div>
						</div>
					</div>

				</header>

			</div>
		);
		
	}
	
}

export default Header;