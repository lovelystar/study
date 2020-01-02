import React, { Component } from "react";

import classNames from "classnames/bind";
import footer from "../../scss/footer.scss";
const footerStyle = classNames.bind(footer);

class Footer extends Component {
	
	render() {
		
		return (
			<div>

				<footer id={footerStyle('footer')}>
					<div className={footerStyle('inner_footer')}>
						<p>Copyright ⓒ 2019 Sumin Oh All right reserved.</p>
					</div>
				</footer>

			</div>
		);
		
	}
	
}

export default Footer;