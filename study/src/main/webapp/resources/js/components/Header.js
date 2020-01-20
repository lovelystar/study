import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";

import classNames from "classnames/bind";
import header from "../../scss/header.scss";
const headerStyle = classNames.bind(header);

class Header extends Component {
	
	componentDidMount() {

		let headerCateTag = document.getElementsByClassName("headerLink");
		let locPath = location.pathname;

		for(let t=0; t<headerCateTag.length; t++){
			
			let headerCatePath = headerCateTag[t].getAttribute("href");
			headerCatePath == locPath ? headerCateTag[t].classList.add("active") : headerCateTag[t].classList.remove("active");

		}
		
	}

	headerCateClick = (e) => {
		//console.log(e.currentTarget.parentNode);
		
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
				{/*
				<Navbar color="dark" dark expand="md">
					<NavbarBrand href="/study/client/">Client</NavbarBrand>
					<NavbarBrand href="/study/style">Style</NavbarBrand>
					<NavbarBrand href="/study/upload">Upload</NavbarBrand>
					<NavbarBrand href="/study/swiper">Swiper</NavbarBrand>
					<NavbarBrand href="/study/data">Algorithm</NavbarBrand>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/study/client/">Home</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
				*/}

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

						<div className={headerStyle('m_header_menu')} onClick={this.headerMenu}>
							<i id="firstIcon"></i>
							<i id="secondIcon"></i>
							<i id="thirdIcon"></i>
						</div>

					</div>
				</header>

			</div>
		);
		
	}
	
}

export default Header;