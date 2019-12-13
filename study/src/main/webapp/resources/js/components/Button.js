import React from "react";

// 방법4. styled-component를 사용하여 
import styled from "styled-components";

// props로 넣어준 값을 직접 전달할 수도 있음.
// 'big이라는 props에 따라 크기가 변경
const StyleWrap = styled.div`
	border: 2px solid black;
	display: inline-block;
	padding: 1rem;
	border-radius: 3px;
	transition: .2s ease;
	font-size: ${(props) => props.fontSize}; ${props => props.big && `font-size: 5rem; padding: 5rem;`}
	&:hover {
		background: black;
		color: white;
	}
`;

const LogoutWrap = styled.button`
	border: 2px solid black;
	background: #ffffff;
	display: inline-block;
	padding: 1rem;
	border-radius: 3px;
	transition: .2s ease;
	font-size: ${(props) => props.fontSize}; ${props => props.buttonProp && `font-size: 2rem; padding: 2rem;`}
	&:hover {
		background: black;
		color: white;
	}
`;

const DeleteBtn = styled.button`
	border: 2px solid black;
	background: #ffffff;
	padding: 0.5rem;
	border-radius: 3px;
	transition: .2s ease;
	margin: 12px;
	font-size: ${(props) => props.fontSize}; ${props => props.buttonProp && `font-size: 2rem; padding: 2rem;`}
	&:hover {
		background: black;
		color: white;
	}
`;

const ContentsRegWrap = styled.button`
	border: 2px solid black;
	background: #ffffff;
	padding: 0.5rem;
	border-radius: 3px;
	transition: .2s ease;
	margin: 12px;
	font-size: ${(props) => props.fontSize}; ${props => props.buttonProp && `font-size: 2rem; padding: 2rem;`}
	&:hover {
		background: black;
		color: white;
	}
`

const CheckBoxWrap = styled.input.attrs({type: 'checkbox'})`
	margin: 10px 12px 0 12px;
	width: 15px;
	height: 15px;
	background: #ffffff;
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
	border: 1px solid #d6d6d6;
	box-sizing: border-box;
	cursor: pointer;
`

// big={big}을 설정함으로 써 render하는 곳에서 big의 유무에 따라 크기 변경
const StyledButton = ({test, big, ...rest}) => {
    return (

        <StyleWrap fontSize="2em" {...rest} big={big}>
            {test}
        </StyleWrap>

    );
};

const LogoutBtn = () => {
	return (

		<LogoutWrap fontSize="1em">
			TEST BTN
		</LogoutWrap>

	);
};

const FileDeleteBtn = () => {
	return (
		<DeleteBtn>
			DELETE
		</DeleteBtn>
	);
}

const ContentsRegBtn = () => {
	return (
		<ContentsRegWrap>
			콘텐츠 등록
		</ContentsRegWrap>
	);
}

export { StyledButton, LogoutBtn, FileDeleteBtn, ContentsRegBtn };








// 반응형2
/*
const sizes = {
	desktop: 1024,
	tablet: 768,
};

const media = Object.keys(sizes).reduce((acc, label) => {

	acc[label] = (...args) => css`
		@media(max-width: ${sizes[label] / 16}em){
			${css(...args)};
		}
	`;

	return acc;
}, {});

const MediaTest = styled.div`
	background: ${props => props.color || "blue"};
	padding: 1rem;
	display: flex;
	width: 1024px;
	margin: 0 auto;
	${media.desktop`width: 768px;`}
	${media.tablet`width: 768px;`};
`;
*/