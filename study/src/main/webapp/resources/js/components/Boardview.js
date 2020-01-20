import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
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
		}
		
	}
	
	componentDidMount() {

    }
	
	render() {
		
		return (

            <div>

				<Header />

                <div className={boardStyle('boardWrap')}>
                    <section>
                        <div className={boardStyle('board_container')}>

                            <div className={boardStyle('board_title')}>
                                <h2>ABCDEFGHIJKLMNOP</h2>
                            </div>

                            <div className={boardStyle('board_detail')}>
                                
                                <div className={boardStyle('board_write_button')}>
                                    <a id="board_write" onClick={this.regForm}>수정</a>
                                    <a>삭제</a>
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

                <Footer />
                
			</div>
			
		);
		
	}
	
}

const mapStateToProps = (state, props) => {
	
	return ({

	});
	
}

const mapDispatchToProps = dispatch => {
	
	return {

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Boardview));