import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";

class Header extends Component {
	
	render() {
		
		return (
			<div>
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
			</div>
		);
		
	}
	
}

export default Header;