import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";

import classNames from "classnames/bind";
import header from "../../scss/header.scss";
const headerStyle = classNames.bind(header);

class Header extends Component {
	
	headerMenu = () => {
		
		/*
		let mHeader = document.getElementsByClassName("m_header_menu");
		mHeader[0].className += (" clicked");
*/
		let mHeader = document.getElementsByClassName("m_header_menu");
		mHeader[0].classList.contains("clicked") ? mHeader[0].classList.remove("clicked") : mHeader[0].classList.add("clicked");
		
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
							<a href="#">OSM</a>
						</h1>

						<div className={headerStyle('header_category')}>
							<ul>
								<li>
									<a href="/study/client/">Client</a>
								</li>
								<li>
									<a href="/study/swiper">Swiper</a>
								</li>
								<li>
									<a href="/study/style">Style</a>
								</li>
								<li>
									<a href="/study/upload">Upload</a>
								</li>
								<li>
									<a href="/study/data">Algorithm</a>
								</li>
								<li>
									<a href="/study/portfolio">Portfolio</a>
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