import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import ws from "../../scss/websocket.scss";
const wsStyle = classNames.bind(ws);

class Socketroom extends Component {
	
	constructor(props){
		super(props);
		this.state = {
            connect: true,
		}
		
	}
	
	componentDidMount() {

        let room = document.getElementsByClassName("each_room");
        let connect = document.getElementsByClassName("connect_btn");
        let currentRoom = document.getElementById("currentRoom");
        let send = document.getElementById("send");

        let stomp = null;
        let currentRoomValue = null;
        let subscribe = null;

        for(let i=0; i<room.length; i++){
            room[i].addEventListener("click", (e) => {

                currentRoomValue = e.target.value;
                let resultCurrentRoom = "( CURRENT CHAT ROOM : " + currentRoomValue + " )";

                currentRoom.innerHTML = resultCurrentRoom;
                
            });
        }

        for(let i=0; i<connect.length; i++){
            connect[i].addEventListener("click", (e) => {
                // console.log("connect value")
            });
        }

        send.addEventListener("click", (e) => {
            console.log("send");
        });
        this.clientRef
    }
	
	render() {
		
		return (
				
			<div>

				<Header />

                <div className={wsStyle('wsWrap')}>
                    <section>
                        <div className={wsStyle('ws_container')}>
                            
                            <div className={wsStyle('ws_title')}>
                                <h2>WEBSOCKET CONNECTION</h2>
                            </div>

                            <div className={wsStyle('ws_info')}>
                                <label>1. PLEASE ENTER A NICKNAME</label>
                                <input id="nickname" type="text" placeholder="NICKNAME HERE.." />
                            </div>

                            <div className={wsStyle('ws_room')}>
                                <label>2. PLEASE SELECT A ROOM</label>
                                <button className="each_room" value="ROOM #1">ROOM #1</button>
                                <button className="each_room" value="ROOM #2">ROOM #2</button>
                                <button className="each_room" value="ROOM #3">ROOM #3</button>
                                <button className="each_room" value="ROOM #4">ROOM #4</button>
                                <button className="each_room" value="ROOM #5">ROOM #5</button>
                            </div>

                            <div className={wsStyle('ws_connect')}>
                                <label>3. CONNECTION</label>
                                <button className="connect_btn" value="connect">Connect</button>
                                <button className="connect_btn" value="disconnect">Disconnect</button>
                            </div>

                            <div className={wsStyle('ws_message')}>
                                <label>4. MESSAGE</label>
                                <input id="message" type="text" placeholder="MESSAGE HERE.." />
                                <button id="send">SEND</button>
                            </div>

                            <div className={wsStyle('ws_result')}>
                                <label>5. RESULT <span id="currentRoom"></span></label>
                                <div id="chat">
                                    sdfsdf: sdfsdf
                                </div>
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
	
)(Socketroom));