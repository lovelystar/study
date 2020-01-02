import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import UploadForm from "./Upload";

// 방법1. css를 가져와서 적용
import style from "../../css/main.css";

// classnames/bind를 사용하면 여러가지를 묶을 때 편리하고,
// 방법2. css 호출 시 'style.' 을 생략할 수 있다.
import classNames from "classnames/bind";
const cn = classNames.bind(style);

// 방법3. css에서 scss로 변경
import scss from "../../scss/main.scss";
const scsscn = classNames.bind(scss);

import header from "../../scss/header.scss";
const headerStyle = classNames.bind(header);


// 방법4. styled-component를 사용하여 
// import styled from "styled-components";
// <StyledButton big>안녕??</StyledButton> 에서 big을 유의해서 확인하자. (= <StyledButton big={true}>안녕??</StyledButton>)
import { StyledButton, LogoutBtn } from "./Button";


class Style extends Component {
	
	constructor(props){

		super(props);
		this.state = {
        }
        
        this.testBtn = this.testBtn.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.fileDrop = this.fileDrop.bind(this);

        // = 기준 왼쪽 : 버튼에서 선언한 명칭
        // = 기준 오른쪽 : 함수 선언할 명칭
        this.centerBtn = this.centerBtnClick.bind(this);
		
	}
    
    centerBtnClick = async() => {
        console.log("CENTER BUTTON CLICK");
    }

    testBtn = async() => {
        console.log("TEST BUTTON CLICK");
    }

    dragEnter = async(e) => {
        
        e.preventDefault();
        e.stopPropagation();
        console.log("dragEnter");

    }

    dragOver = async(e) => {

        e.preventDefault();
        e.stopPropagation();
        console.log("dragOver");

    }

    fileDrop = async(e) => {

        e.preventDefault();
        e.stopPropagation();
        console.log("fileDrop");

    }

	render() {
		
		// css를 이렇게 만들어서 <div style={css}></div> 이렇게 해주면 된다.
		// jsp로 치면 style 태그안에 만들어서 사용한다고 생각하면 됨.
		// <div style={{ width: "100px", height: "100px", background: "orange", }}></div>
		// 이런식으로 하면 태그 하드코딩이라고 보면 된다.
		const css = {
			width: "100px",
			height: "100px",
			background: "black",
        }
        
		return (
				
			<div>

                <Header />
                <p>Style 테스트</p>


                <div onClick={this.testBtn}>
					<LogoutBtn>TEST BTN</LogoutBtn>
				</div>

				<div className={style.test}></div>
				<div className={cn('test', 'sumin')}></div>
				<div style={css}></div>
				<div style={{ width: "100px", height: "100px", background: "orange", }}></div>
				<div className={scsscn('outside')}>
					<div className={scsscn('inside')}></div>
					<div className={scsscn('box one')}></div>
					<div className={scsscn('box two')}></div>
					<div className={scsscn('box three')}></div>
					<div className={scsscn('box four')}></div>
					<div className={scsscn('box five')}></div>
					<div className={scsscn('box six')}></div>
					<div className={scsscn('box seven')}></div>
				</div>

				<div className={scsscn('animation')}></div>

				<div className={headerStyle('reactButton')} onClick={this.centerBtn}>버튼</div>
				<StyledButton big test="헬로"></StyledButton>
				<div onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDrop={this.fileDrop}>
					<UploadForm></UploadForm>
				</div>
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

	};
	
}

export default withCookies(connect(
		
	mapStateToProps,
	mapDispatchToProps
	
)(Style));