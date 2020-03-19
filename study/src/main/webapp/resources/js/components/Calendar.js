import React, { Component, createElement } from "react";
import { connect, createSelectorHook } from "react-redux";
import { withCookies } from "react-cookie";
//import * as BoardReducer from "../reducers/CalenReducer";
import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import scss from "../../scss/calendar.scss";
const calendarStyle = classNames.bind(scss);

// 윤년
let leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년 아닐 때
let nonLeap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// calendar 선택 Form
let csyr = null;
let csmt = null;
let csdt = null;
let cshr = null;
let csmn = null;

let cToday = new Date();
let cFirst = new Date(cToday.getFullYear(), cToday.getMonth(), 1);

let cStart = cFirst;
let cPageYear;
// 4로 나뉘어 떨어지면 윤년
if(cFirst.getFullYear() % 4 === 0){
    cPageYear = leap;
} else {
    cPageYear = nonLeap;
}



// base 선택 Form
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);

let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let start = first;
let pageYear;

// 4로 나뉘어 떨어지면 윤년
if(first.getFullYear() % 4 === 0){
    pageYear = leap;
} else {
    pageYear = nonLeap;
}

class Calendar extends Component {
    
	constructor(props){

		super(props);
		this.state = {
		}

    }

    componentDidMount() {

        let calendarCurrent = document.getElementById("calendar_current");
        let calendarBody = document.getElementById("calendar_body");

        this.showCalendar(calendarCurrent, calendarBody);
        this.showMain();
        this.changeDate();

        document.getElementById("calendar_prev").addEventListener("click", (element) => {
            
            const $divs = document.querySelector("#input-list > div");
            if($divs != null){
                $divs.forEach((e) => {
                    e.remove();
                });
            }

            const $btns = document.querySelector("#input-list > button");
            if($btns != null){
                $btns.forEach((e) => {
                    e.remove();
                });
            }

            if(start.getMonth() === 1){
                start = new Date(first.getFullYear()-1, 12, 1);
                first = start;
                if(first.getFullYear % 4 === 0) {
                    pageYear = leap;
                } else {
                    pageYear = nonLeap;
                }
            } else {
                start = new Date(first.getFullYear(), first.getMonth()-1, 1);
                first = start;
            }

            today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());

            this.removeCalendar();
            this.showCalendar(calendarCurrent, calendarBody);
            this.showMain();
            this.changeDate();

        });

        document.getElementById("calendar_next").addEventListener("click", (element) => {
            
            const $divs = document.querySelector("#input-list > div");
            if($divs != null){
                $divs.forEach((e) => {
                    e.remove();
                });
            }

            const $btns = document.querySelector("#input-list > button");
            if($btns != null){
                $btns.forEach((e) => {
                    e.remove();
                });
            }

            if(start.getMonth() === 12){
                start = new Date(first.getFullYear()+1, 1, 1);
                first = start;
                if(first.getFullYear % 4 === 0) {
                    pageYear = leap;
                } else {
                    pageYear = nonLeap;
                }
            } else {
                start = new Date(first.getFullYear(), first.getMonth()+1, 1);
                first = start;
            }

            today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());

            this.removeCalendar();
            this.showCalendar(calendarCurrent, calendarBody);
            this.showMain();
            this.changeDate();

        });

        window.addEventListener("resize", this.calResize);
        this.calResize();

        let typeOptions = document.getElementsByClassName("tos");
        for(let i=0; i<typeOptions.length; i++){

            typeOptions[i].addEventListener("click", (e) => {
                
                let dt = typeOptions[i].firstChild.value;
                document.getElementById("repeat_title").innerHTML = typeOptions[i].firstChild.getAttribute("dt");
                e.currentTarget.parentNode.parentNode.classList.remove("dropdown");
                
                if(dt == "none" || dt == null){
                    document.getElementById("repeat_pr").value = "";
                    document.getElementById("repeat_end_time").value = "";
                }

            });

        }

        let schRegBtn = document.getElementById("schReg");
        schRegBtn.addEventListener("click", (e) => {
            console.log("reg");
        });

    }

    showCalendar = (calendarCurrent, calendarBody) => {
        
        let monthCnt = 100;
        let cnt = 1;

        // week 계산 ( 최대 6주 )
        for(let i=0; i<6; i++) {
            
            let $tr = document.createElement("tr");
            $tr.setAttribute("id", monthCnt);

            // days 계산 ( 7일 )
            for(let j=0; j<7; j++) {

                if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                    let $td = document.createElement("td");
                    $tr.appendChild($td);
                } else {
                    let $td = document.createElement("td");
                    $td.textContent = cnt;
                    $td.setAttribute("id", cnt);
                    $tr.appendChild($td);
                    cnt++;
                }

            }

            monthCnt++;
            calendarBody.appendChild($tr);

        }

        // title 등록
        calendarCurrent.innerHTML = month[first.getMonth()] + "&nbsp;&nbsp;&nbsp;" + first.getFullYear();

    }

    removeCalendar = (e) => {
        
        let trCnt = 100;
        for(let i=100; i<106; i++){
            let $tr = document.getElementById(trCnt);
            $tr.remove();
            trCnt++;
        }

    }

    showMain = (e) => {
        
        let tMonth = today.getMonth() + 1;
        let tDate = today.getDate();

        document.getElementById("calendar_left_day").innerHTML = day[today.getDay()];
        document.getElementById("calendar_left_date").innerHTML = today.getDate();

        if(tMonth < 10) {
            tMonth = "0" + tMonth;
        }

        if(tDate < 10) {
            tDate = "0" + tDate;
        }

        document.getElementsByClassName("calendar_left_title")[0].innerHTML = today.getFullYear() + ". " + tMonth + ". " + tDate + ". Schedule";
    }

    changeDate = (e) => {

        // 같은 일( date ) 선택
        let clicked = document.getElementById(today.getDate());
        clicked.classList.add("active");

        let tdGroup = [];

        // 모든 일( date )에 click 이벤트 추가
        for(let i=1; i<=pageYear[first.getMonth()]; i++){
            tdGroup[i] = document.getElementById(i);
            tdGroup[i].addEventListener("click", (e) => {
                for(let i=1; i<=pageYear[first.getMonth()]; i++){
                    if(tdGroup[i].classList.contains("active")){
                        tdGroup[i].classList.remove("active");
                    }
                }

                clicked = e.currentTarget;
                clicked.classList.add("active");

                today = new Date(today.getFullYear(), today.getMonth(), clicked.id);
                this.showMain(day, today);

            });
        }
    }

    calResize = (e) => {

        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let cl = document.getElementById("calendar_left");
        let cr = document.getElementById("calendar_right");

        cl.style.height = clientHeight + "px";
        cr.style.height = clientHeight + "px";

    }

    regForm = (e) => {

        let nToday = new Date();
        let nString = new String;

        let nyr = nToday.getFullYear();
        let nmo = nToday.getMonth();
        if(nmo < 10) {
            nmo = "0" + (nmo+1);
        }

        let ndt = nToday.getDate();
        if(ndt < 10) {
            ndt = "0" + ndt;
        }

        let nhr = nToday.getHours();
        if(nhr < 10) {
            nhr = "0" + nhr;
        }

        let nmn = nToday.getMinutes();
        if(nmn < 10) {
            nmn = "0" + nmn;
        }

        nString = nyr + "-" + nmo + "-" + ndt + " " + nhr + ":" + nmn;

        let srf = document.getElementById("schRegForm");
        let srfc = document.getElementById("schRegFormContainer");
        let srfw = document.getElementById("schRegFormWrap");
        let fiw = document.getElementsByClassName("formInputWrap");

        srf.className == "active" ? srf.classList.remove("active") : srf.classList.add("active");
        srfc.className == "active" ? this.fadeOut(srf, srfw) : this.fadeIn(srf, srfw);
        srfc.className == "active" ? srfc.classList.remove("active") : srfc.classList.add("active");

        document.getElementsByClassName("repeatForm")[0].classList.remove("dropdown");
        document.getElementById("repeat_title").innerHTML = "선택해주세요.";

        document.getElementById("repeat_pr").value = 1;
        document.getElementById("start_time").value = nString;
        document.getElementById("end_time").value = nString;
        document.getElementById("repeat_end_time").value = nString;

        for(let i=0; i<fiw.length; i++){
            fiw[i].classList.remove("dropdown");
        }

    }

    fadeIn = (mElement, tElement) => {

        let opacity = 0;
        let mHeightTemp = 0;

        let fade = setInterval(function() {

            let mHeight = window.getComputedStyle(mElement).height.replace("px", "").trim();

            if(mHeightTemp == mHeight) {

                opacity += 1 * 0.5;
                if(opacity >= 1) {

                    tElement.style.opacity = 1;
                    clearInterval(fade);

                }

            } else {
                mHeightTemp = mHeight;
            }

        }, 50);

    }

    fadeOut = (mElement, tElement) => {

        let opacity = tElement.style.opacity;
        let mHeightTemp = 0;

        let fade = setInterval(function() {

            let mHeight = window.getComputedStyle(mElement).height.replace("px", "").trim();

            if(mHeightTemp == mHeight) {

                opacity -= 1 * 0.5;
                if(opacity <= 0) {

                    tElement.style.opacity = 0;
                    clearInterval(fade);

                }

            } else {
                mHeightTemp = mHeight;
            }

        }, 50);

    }

    repeatForm = (e) => {

        let repeatForm = e.currentTarget.parentNode.parentNode;
        repeatForm.classList.contains("dropdown") ? repeatForm.classList.remove("dropdown") : repeatForm.classList.add("dropdown");
        
    }

    selectRepeat = (e) => {
       
        let repeatType = e.currentTarget.parentNode;
        repeatType.classList.contains("dropdown") ? repeatType.classList.remove("dropdown") : repeatType.classList.add("dropdown")

    }

    selectStartTime = (e) => {

        let scWrap = document.getElementById("setStartCalendarWrap");

        let pn = e.currentTarget.parentNode;
        let et = document.getElementById("end_time").parentNode;
        let ret = document.getElementById("repeat_end_time").parentNode;

        pn.classList.contains("dropdown") ? pn.classList.remove("dropdown") : pn.classList.add("dropdown");
        et.classList.contains("dropdown") ? et.classList.remove("dropdown") : null;
        ret.classList.contains("dropdown") ? ret.classList.remove("dropdown") : null;

        pn.classList.contains("dropdown") ? this.createCalendar(scWrap, "st") : this.deleteCalendar(scWrap);
        et.childNodes[1].firstChild != null ? et.childNodes[1].firstChild.remove() : null;
        ret.childNodes[2].firstChild != null ? ret.childNodes[2].firstChild.remove() : null;

    }

    selectEndTime = (e) => {

        let ecWrap = document.getElementById("setEndCalendarWrap");

        let pn = e.currentTarget.parentNode;
        let st = document.getElementById("start_time").parentNode;
        let ret = document.getElementById("repeat_end_time").parentNode;

        pn.classList.contains("dropdown") ? pn.classList.remove("dropdown") : pn.classList.add("dropdown");
        st.classList.contains("dropdown") ? st.classList.remove("dropdown") : null;
        ret.classList.contains("dropdown") ? ret.classList.remove("dropdown") : null;
        
        pn.classList.contains("dropdown") ? this.createCalendar(ecWrap, "st") : this.deleteCalendar(ecWrap);
        st.childNodes[1].firstChild != null ? st.childNodes[1].firstChild.remove() : null;
        ret.childNodes[2].firstChild != null ? ret.childNodes[2].firstChild.remove() : null;

    }

    selectRepeatTime = (e) => {

        let rcWrap = document.getElementById("setRepeatCalendarWrap");

        let pn = e.currentTarget.parentNode;
        let st = document.getElementById("start_time").parentNode;
        let et = document.getElementById("end_time").parentNode;

        pn.classList.contains("dropdown") ? pn.classList.remove("dropdown") : pn.classList.add("dropdown");
        st.classList.contains("dropdown") ? st.classList.remove("dropdown") : null;
        et.classList.contains("dropdown") ? et.classList.remove("dropdown") : null;
        
        pn.classList.contains("dropdown") ? this.createCalendar(rcWrap, "st") : this.deleteCalendar(rcWrap);
        st.childNodes[1].firstChild != null ? st.childNodes[1].firstChild.remove() : null;
        et.childNodes[1].firstChild != null ? et.childNodes[1].firstChild.remove() : null;

    }

    createCalendar = (element, tp) => {
        
        let monthCnt = 100;
        let cnt = 1;
        
        csyr = null;
        csmt = null;
        csdt = null;
        cshr = null;
        csmn = null;

        cToday = new Date();
        cFirst = new Date(cToday.getFullYear(), cToday.getMonth(), 1);
        cStart = cFirst;

        let $table = document.createElement("table");
        let $thead = document.createElement("thead");
        let $tbody = document.createElement("tbody");

        // thead
        for(let i=0; i<2; i++) {

            let $tr = document.createElement("tr");
            if(i==0){
                
                for(let j=0; j<3; j++) {

                    let $td = document.createElement("td");
                    let $label = document.createElement("label");

                    switch(j) {
                        case 0: 
                            $label.innerHTML = "<";
                            $td.setAttribute("id", "set_prev");
                            $td.appendChild($label);
                            break;
                        case 1: 
                            $td.innerHTML = month[cFirst.getMonth()] + " " + cFirst.getFullYear();
                            $td.setAttribute("id", "set_current");
                            $td.setAttribute("class", "dt");
                            $td.setAttribute("colspan", 5);
                            break;
                        case 2: 
                            $label.innerHTML = ">";
                            $td.setAttribute("id", "set_next");
                            $td.appendChild($label);
                            break;
                    }
                    
                    $tr.appendChild($td);

                }

            } else {
                
                for(let k=0; k<7; k++) {

                    let $td = document.createElement("td");
                    switch(k) {

                        case 0: 
                            $td.innerHTML= "Sun";
                            $td.setAttribute("class", "sun");
                            break;
                        
                        case 1: 
                            $td.innerHTML= "Mon";
                            break;
                            
                        case 2: 
                            $td.innerHTML= "Tue";
                            break;
                        
                        case 3: 
                            $td.innerHTML= "Wed";
                            break;
                            
                        case 4: 
                            $td.innerHTML= "Thu";
                            break;
                        
                        case 5: 
                            $td.innerHTML= "Fri";
                            break;
                            
                        case 6: 
                            $td.innerHTML= "Sat"
                            $td.setAttribute("class", "sat");
                            break;
                    }

                    $tr.setAttribute("id", "day_of_the_week")
                    $tr.appendChild($td);

                }

            }

            $thead.appendChild($tr)

        }

        csyr = cFirst.getFullYear();
        csmt = cFirst.getMonth();

        // tbody
        for(let i=0; i<6; i++) {
            
            let $tr = document.createElement("tr");
            $tr.setAttribute("id", tp + "_" + monthCnt);

            // days 계산 ( 7일 )
            for(let j=0; j<7; j++) {
                csmt = first.getMonth();
                if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                    let $td = document.createElement("td");
                    $tr.appendChild($td);
                } else {
                    let $td = document.createElement("td");
                    $td.textContent = cnt;
                    $td.setAttribute("id", tp + "_" + cnt);
                    $tr.appendChild($td);
                    cnt++;
                }

            }

            monthCnt++;
            $tbody.appendChild($tr);

        }

        $tbody.setAttribute("id", "set_tbody");
        $table.appendChild($thead);
        $table.appendChild($tbody);

        element.appendChild($table);

        let sc = document.getElementById("set_current");
        let dotw = document.getElementById("day_of_the_week");
        let st = document.getElementById("set_tbody");
        let sp = document.getElementById("set_prev");
        let sn = document.getElementById("set_next");

        sc.addEventListener("click", (e) => {
            
            switch(sc.className) {

                    // 시간 선택
                case "mn":
                    this.clickHr(dotw, st, sc);
                    break;

                    // 일자 선택
                case "hr":
                    this.clickDt(dotw, st, sc);
                    break;

                    // 월 선택
                case "dt":
                    this.clickMt(dotw, st, sc);
                    break;

                    // 년도 선택
                case "mt":
                    this.clickYr(dotw, st, sc);
                    break;

            }

        });

        sp.addEventListener("click", (e) => {
            
            switch(sc.className) {

                case "mn":
                    this.clickMnPn(dotw, st, sc, "prev");
                    break;

                case "hr":
                    this.clickHrPn(dotw, st, sc, "prev");
                    break;

                case "dt":
                    this.clickDtPn(dotw, st, sc, "prev");
                    break;

                case "mt":
                    this.clickMtPn(dotw, st, sc, "prev");
                    break;

                case "yr":
                    this.clickYrPn(dotw, st, sc, "prev");
                    break;

            }

        });

        sn.addEventListener("click", (e) => {

            switch(sc.className) {

                case "mn":
                    this.clickMnPn(dotw, st, sc, "next");
                    break;

                case "hr":
                    this.clickHrPn(dotw, st, sc, "next");
                    break;

                case "dt":
                    this.clickDtPn(dotw, st, sc, "next");
                    break;

                case "mt":
                    this.clickMtPn(dotw, st, sc, "next");
                    break;

                case "yr":
                    this.clickYrPn(dotw, st, sc, "next");
                    break;

            }

        });

        for(let m=1; m<=cPageYear[cFirst.getMonth()]; m++){

            let stv = document.getElementById("st_" + m);
            stv.addEventListener("click", (e) => {

                csdt = m;
                this.clickHr(dotw, st, sc);

            });
            
        }

    }

    deleteCalendar = (element) => {
        element.firstChild.remove();
    }

    // 분(Minute) 선택 폼
    clickMn = (dotw, st, sc) => {

        st.innerHTML = "";

        sc.classList.remove("hr");
        sc.setAttribute("colspan", 2);
        sc.classList.add("mn");

        for(let i=0; i<3; i++){

            let $dttr = document.createElement("tr");
            switch(i){
                case i:
                    this.createMn($dttr, i);
                    break;
            }

            st.appendChild($dttr);

        }

        let dot = cshr.indexOf(":");
        cshr = cshr.substring(0, dot);

        let mnea = document.getElementsByClassName("mn_ea");
        for(let ea=0; ea<mnea.length; ea++){
            mnea[ea].addEventListener("click", (e) => {

                let csmn = e.currentTarget.innerHTML;
                let csmnDot = csmn.indexOf(":");

                csmn = csmn.substring(csmnDot+1);

                let csmtv = 0;
                csmt < 10 ? csmtv = "0" + (csmt+1) : csmtv = csmt+1;
                csdt < 10 ? csdt = "0" + csdt : null;
                cshr.length == 1 ? cshr = "0" + cshr : null;
                
                let pn = st.parentNode.parentNode.parentNode;
                if(pn.classList.contains("repeat_ea")){
                    pn.childNodes[1].value = csyr + "-" + csmtv + "-" + csdt + " " + cshr + ":" + csmn;
                } else {
                    pn.firstChild.value = csyr + "-" + csmtv + "-" + csdt + " " + cshr + ":" + csmn;
                }

                st.parentNode.parentNode.parentNode.classList.remove("dropdown");
                this.deleteCalendar(st.parentNode.parentNode);
                
            });
        }

    }
    
    // 분(Minute) 선택 폼 제작
    createMn = (element, i) => {

        let ve = (i+1) * 4;
        let vs = ve - 4;

        let dot = cshr.indexOf(":");

        for(let j=vs; j<ve; j++) {

            let $dttd = document.createElement("td");
            switch(j){
                case j:

                    let jv = j * 5;
                    
                    // 위, 아래 둘 중 하나 사용하면 됨.
                    // jv < 10 ? jv = "0"+jv : null;
                    if(jv < 10)
                        jv = "0" + jv;

                    $dttd.innerHTML = cshr.substring(0, dot) + ":" + jv;
                    $dttd.setAttribute("class", "mn_ea");
                    element.appendChild($dttd);
                    break;
            }

        }

    }

    // 분(Minute) 선택 폼 좌우
    clickMnPn = (dotw, st, sc, np) => {

        let scv = sc.innerHTML;
        let dot = scv.indexOf(",");
        
        np == "prev" ? csdt-- : csdt++;

        // date가 넘어갈 경우
        if(csdt > cPageYear[cFirst.getMonth()]) {

            csmt++;
            // month가 넘어갈 경우
            if(csmt > 11) {
                csdt = 1;
                csmt = 0;
                csyr++;
            }

            cFirst = new Date(csyr, csmt, 1);
            csdt = 1;

        }

        // date가 최소일 경우
        if(csdt < 1) {
            
            csmt--;
            // month가 최소일 경우
            if(csmt < 0){
                csdt = 1;
                csmt = 11;
                csyr--;
            }

            cFirst = new Date(csyr, csmt, 1);
            csdt = cPageYear[cFirst.getMonth()];

        }

        csyr = cFirst.getFullYear();
        csmt = cFirst.getMonth();

        if(cFirst.getFullYear() % 4 === 0){
            cPageYear = leap;
        } else {
            cPageYear = nonLeap;
        }

        dot != -1 ? sc.innerHTML = csdt + ", " + month[csmt] + " " + csyr : null;

    }

    
    // 시간(Hour) 선택 폼
    clickHr = (dotw, st, sc) => {
        
        let scv = sc.innerHTML;

        dotw.innerHTML = ""
        st.innerHTML = "";
        if(scv.indexOf(",") == -1)
            sc.innerHTML = csdt + ", " + scv;

        sc.classList.remove("dt");
        sc.classList.remove("mn");
        sc.setAttribute("colspan", 2);
        sc.classList.add("hr");

        for(let i=0; i<6; i++){

            let $dttr = document.createElement("tr");
            switch(i){
                case i:
                    this.createHr($dttr, i);
                    break;
            }

            st.appendChild($dttr);

        }

        let hrea = document.getElementsByClassName("hr_ea");
        for(let ea=0; ea<hrea.length; ea++){
            hrea[ea].addEventListener("click", (e) => {

                cshr = e.currentTarget.innerHTML;
                this.clickMn(dotw, st, sc);

            });
        }

    }

    // 시간(Hour) 선택 폼 제작
    createHr = (element, i) => {

        let ve = (i+1) * 4;
        let vs = ve - 4;

        for(let j=vs; j<ve; j++) {
            let $dttd = document.createElement("td");
            switch(j){
                case j:
                    $dttd.innerHTML = j + ":00";
                    $dttd.setAttribute("class", "hr_ea");
                    element.appendChild($dttd);
                    break;
            }
        }

    }

    // 시간(Hour) 선택 폼 좌우
    clickHrPn = (dotw, st, sc, np) => {

        let scv = sc.innerHTML;
        let dot = scv.indexOf(",");
        
        np == "prev" ? csdt-- : csdt++;

        // date가 넘어갈 경우
        if(csdt > cPageYear[cFirst.getMonth()]) {

            csmt++;
            // month가 넘어갈 경우
            if(csmt > 11) {
                csdt = 1;
                csmt = 0;
                csyr++;
            }

            cFirst = new Date(csyr, csmt, 1);
            csdt = 1;

        }

        // date가 최소일 경우
        if(csdt < 1) {
            
            csmt--;
            // month가 최소일 경우
            if(csmt < 0){
                csdt = 1;
                csmt = 11;
                csyr--;
            }

            cFirst = new Date(csyr, csmt, 1);
            csdt = cPageYear[cFirst.getMonth()];

        }

        csyr = cFirst.getFullYear();
        csmt = cFirst.getMonth();

        if(cFirst.getFullYear() % 4 === 0){
            cPageYear = leap;
        } else {
            cPageYear = nonLeap;
        }

        dot != -1 ? sc.innerHTML = csdt + ", " + month[csmt] + " " + csyr : null;

    }


    // 일(Date) 선택 폼
    clickDt = (dotw, st, sc) => {

        let monthCnt = 100;
        let cnt = 1;

        dotw.innerHTML = "";
        st.innerHTML = "";

        // 날짜 세팅
        if(cStart.getMonth() === 12){

            cStart = new Date(csyr, 1, 1);
            cFirst = cStart;

        } else {

            cStart = new Date(csyr, csmt, 1);
            cFirst = cStart;

        }

        if(cFirst.getFullYear() % 4 === 0) {
            cPageYear = leap;
        } else {
            cPageYear = nonLeap;
        }

        //cToday = new Date(cToday.getFullYear(), cToday.getMonth()+1, cToday.getDate());
        //cFirst = new Date(cstd, csm, 1);

        //cFirst = new Date(cstd, cToday.getMonth() + 1, 1);
        //cFirst = new Date(cstd, csd, 1);

        // 달력 form ( thead )
        for(let i=0; i<7; i++){
            let $dotwTd = document.createElement("td");
            switch(i){
                case 0:
                    $dotwTd.innerHTML = "Sun";
                    $dotwTd.setAttribute("class", "sun");
                    break;
                case 1:
                    $dotwTd.innerHTML = "Mon";
                    break;
                case 2:
                    $dotwTd.innerHTML = "Tue";
                    break;
                case 3:
                    $dotwTd.innerHTML = "Wed";
                    break;
                case 4:
                    $dotwTd.innerHTML = "Thu";
                    break;
                case 5:
                    $dotwTd.innerHTML = "Fri";
                    break;
                case 6:
                    $dotwTd.innerHTML = "Sat";
                    $dotwTd.setAttribute("class", "sat");
                    break;
            }
            dotw.appendChild($dotwTd);
        }

        // 달력 form ( tbody )
        for(let j=0; j<6; j++) {
            
            let $tr = document.createElement("tr");
            $tr.setAttribute("id", "ctr_" + monthCnt);

            for(let k=0; k<7; k++) {

                if((j === 0 && k < cFirst.getDay()) || cnt > cPageYear[cFirst.getMonth()]) {
                    
                    let $td = document.createElement("td");
                    $tr.appendChild($td);

                } else {

                    let $td = document.createElement("td");
                    $td.textContent = cnt;
                    $td.setAttribute("id", "ctd_" + cnt);
                    $tr.appendChild($td);

                    cnt++;

                }

            }

            st.appendChild($tr);

        }

        for(let m=1; m<=cPageYear[cFirst.getMonth()]; m++){

            let ctd = document.getElementById("ctd_" + m);
            ctd.addEventListener("click", (e) => {

                csdt = m;
                this.clickHr(dotw, st, sc);

            });

        }
        
        sc.classList.remove("hr");
        sc.classList.add("dt");

        let scv = sc.innerHTML;
        let dot = scv.indexOf(",");
        dot != -1 ? sc.innerHTML = scv.substr(dot+2) : null;
        
        sc.setAttribute("colspan", 5);
        
    }

    // 일(Date) 선택 폼 좌우
    clickDtPn = (dotw, st, sc, np) => {

        if(np == "prev"){

            if(csmt === 0){
                csmt = 11;
                csyr--;
                
                cStart = new Date(csyr, 12, 1);
                cFirst = cStart;

            } else {
                csmt--;
                cStart = new Date(csyr, csmt, 1);
                cFirst = cStart;
            }

        } else {
            if(csmt === 11){
                csmt = 0;
                csyr++;

                cStart = new Date(csyr, 1, 1);
                cFirst = cStart;

                if(cFirst.getFullYear() % 4 === 0){
                    cPageYear = leap;
                } else {
                    cPageYear = nonLeap;
                }

            } else {
                csmt++;
                cStart = new Date(csyr, csmt, 1);
                cFirst = cStart;
            }
        }

        if(cFirst.getFullYear() % 4 === 0){
            cPageYear = leap;
        } else {
            cPageYear = nonLeap;
        }

        switch(csmt) {
            case 0:
                sc.innerHTML = "January " + csyr;
                break;
            case 1:
                sc.innerHTML = "February " + csyr;
                break;
            case 2:
                sc.innerHTML = "March " + csyr;
                break;
            case 3:
                sc.innerHTML = "April " + csyr;
                break;
            case 4:
                sc.innerHTML = "May " + csyr;
                break;
            case 5:
                sc.innerHTML = "June " + csyr;
                break;
            case 6:
                sc.innerHTML = "July " + csyr;
                break;
            case 7:
                sc.innerHTML = "August " + csyr;
                break;
            case 8:
                sc.innerHTML = "September " + csyr;
                break;
            case 9:
                sc.innerHTML = "October " + csyr;
                break;
            case 10:
                sc.innerHTML = "November " + csyr;
                break;
            case 11:
                sc.innerHTML = "December " + csyr;
                break;
        }

        dotw.innerHTML = "";
        st.innerHTML = "";
        this.clickDt(dotw, st, sc);

    }



    // 월(Month) 선택 폼
    clickMt = (dotw, st, sc) => {
    
        dotw.innerHTML = "";
        st.innerHTML = "";

        for(let i=0; i<3; i++){

            let $dttr = document.createElement("tr");

            switch(i){
                case i:
                    this.createMt($dttr, i);
                    break;
            }

            st.appendChild($dttr);

        };

        csyr == null ? csyr = cToday.getFullYear() : null;

        sc.innerHTML = csyr;
        sc.classList.remove("dt");
        sc.setAttribute("colspan", 2);
        sc.classList.add("mt");

        let mtea = document.getElementsByClassName("mt_ea");
        for(let ea=0; ea<mtea.length; ea++){
            mtea[ea].addEventListener("click", (e) => {

                let mt = mtea[ea].innerHTML;
                
                switch(mt){
                    case "Jan":
                        csmt = 0;
                        sc.innerHTML = "January " + csyr;
                        break;
                    case "Feb":
                        csmt = 1;
                        sc.innerHTML = "February " + csyr;
                        break;
                    case "Mar":
                        csmt = 2;
                        sc.innerHTML = "March " + csyr;
                        break;
                    case "Apr":
                        csmt = 3;
                        sc.innerHTML = "April " + csyr;
                        break;
                    case "May":
                        csmt = 4;
                        sc.innerHTML = "May " + csyr;
                        break;
                    case "Jun":
                        csmt = 5;
                        sc.innerHTML = "June " + csyr;
                        break;
                    case "Jul":
                        csmt = 6;
                        sc.innerHTML = "July " + csyr;
                        break;
                    case "Aug":
                        csmt = 7;
                        sc.innerHTML = "August " + csyr;
                        break;
                    case "Sep":
                        csmt = 8;
                        sc.innerHTML = "September " + csyr;
                        break;
                    case "Oct":
                        csmt = 9;
                        sc.innerHTML = "October " + csyr;
                        break;
                    case "Nov":
                        csmt = 10;
                        sc.innerHTML = "November " + csyr;
                        break;
                    case "Dec":
                        csmt = 11;
                        sc.innerHTML = "December " + csyr;
                        break;
                }

                sc.classList.remove("mt");
                sc.classList.add("dt");
                st.innerHTML = "";

                this.clickDt(dotw, st, sc);

            });
        }

    }

    // 월(Month) 선택 폼 제작
    createMt = (element, i) => {

        let ve = (i+1) * 4;
        let vs = ve - 4;

        for(let j=vs; j<ve; j++){

            let $dttd = document.createElement("td");

            switch(j) {
                case 0:
                    $dttd.innerHTML = "Jan";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 1:
                    $dttd.innerHTML = "Feb";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 2:
                    $dttd.innerHTML = "Mar";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 3:
                    $dttd.innerHTML = "Apr";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 4:
                    $dttd.innerHTML = "May";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 5:
                    $dttd.innerHTML = "Jun";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 6:
                    $dttd.innerHTML = "Jul";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 7:
                    $dttd.innerHTML = "Aug";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 8:
                    $dttd.innerHTML = "Sep";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 9:
                    $dttd.innerHTML = "Oct";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 10:
                    $dttd.innerHTML = "Nov";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
                case 11:
                    $dttd.innerHTML = "Dec";
                    $dttd.setAttribute("class", "mt_ea");
                    element.appendChild($dttd);
                    break;
            }

        }

    }

    // 월(Month) 선택 폼 좌우
    clickMtPn = (dotw, st, sc, np) => {
        
        dotw.innerHTML = "";
        np == "prev" ? csyr-- : csyr++;

        sc.innerHTML = csyr;
        sc.classList.remove("dt");
        sc.setAttribute("colspan", 2);
        sc.classList.add("mt");

    }



    // 년도(Year) 선택 폼
    clickYr = (dotw, st, sc) => {

        dotw.innerHTML = "";
        st.innerHTML = "";

        let scv = sc.innerHTML;
        scv = scv.substring(0, scv.length-1); // 2020 >> 202x

        for(let i=0; i<3; i++){

            let $dttr = document.createElement("tr");

            switch(i){
                case i:
                    this.createYr($dttr, i, scv);
                    break;
            }

            st.appendChild($dttr);

        };

        let yrea = document.getElementsByClassName("yr_ea");
        for(let ea=0; ea<yrea.length; ea++){
            yrea[ea].addEventListener("click", (e) => {

                sc.innerHTML = yrea[ea].innerHTML;
                sc.classList.remove("yr");
                sc.classList.add("mt");
                st.innerHTML = "";

                csyr = sc.innerHTML;
                
                this.clickMt(dotw, st, sc);

            });
        }

        sc.innerHTML = scv + "0 ~ " + scv + "9";
        sc.classList.remove("mt");
        sc.setAttribute("colspan", 2);
        sc.classList.add("yr");

    }

    // 년도(Year) 선택 폼 제작
    createYr = (element, i, scv) => {

        let ve = (i+1) * 4;
        let vs = ve - 4;

        for(let j=vs; j<ve; j++) {
            
            let $dttd = document.createElement("td");
            switch(j) {

                case 0:
                    $dttd.innerHTML = scv + "0";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 1:
                    $dttd.innerHTML = scv + "1";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 2:
                    $dttd.innerHTML = scv + "2";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 3:
                    $dttd.innerHTML = scv + "3";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 4:
                    $dttd.innerHTML = scv + "4";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 5:
                    $dttd.innerHTML = scv + "5";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 6:
                    $dttd.innerHTML = scv + "6";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 7:
                    $dttd.innerHTML = scv + "7";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 8:
                    $dttd.innerHTML = scv + "8";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;
                case 9:
                    $dttd.innerHTML = scv + "9";
                    $dttd.setAttribute("class", "yr_ea");
                    element.appendChild($dttd);
                    break;

            }

        }

    }

    // 년도(Year) 선택 폼 좌우
    clickYrPn = (dotw, st, sc, np) => {
        
        dotw.innerHTML = "";

        let scv = document.getElementById("set_tbody").firstChild.firstChild.innerHTML;
        scv = scv.substring(0, scv.length-1);
        np == "prev" ? scv-- : scv++;

        st.innerHTML = "";

        for(let i=0; i<3; i++){

            let $dttr = document.createElement("tr");

            switch(i){
                case i:
                    this.createYr($dttr, i, scv);
                    break;
            }

            st.appendChild($dttr);

        };

        let yrea = document.getElementsByClassName("yr_ea");
        for(let ea=0; ea<yrea.length; ea++){
            yrea[ea].addEventListener("click", (e) => {
                
                sc.innerHTML = yrea[ea].innerHTML;
                sc.classList.remove("yr");
                sc.classList.add("mt");
                st.innerHTML = "";

                csyr = sc.innerHTML;
                
                this.clickMt(dotw, st, sc);

            });

        }

        sc.innerHTML = scv + "0 ~ " + scv + "9";

    }

	render() {
        return (
            <div>
                <div className={calendarStyle("calendar_main")}>
                    <div className={calendarStyle("calendar_wrap")}>

                        <div id="calendar_left" className={calendarStyle("calendar_left")}>
                            
                            <div className={calendarStyle("calendar_left_wrap")}>
                                <div id="calendar_left_day" className={calendarStyle("calendar_left_day")}></div>
                                <div id="calendar_left_date" className={calendarStyle("calendar_left_date")}></div>
                            </div>
                            <div className={calendarStyle("calendar_left_sch")}>
                                <div className={calendarStyle("calendar_left_title")}>Schedule List</div>
                                <div className={calendarStyle("calendar_list")}>
                                    <div id="calendar_sch_list"></div>
                                </div>
                            </div>

                        </div>

                        <div id="calendar_right" className={calendarStyle("calendar_right")}>
                            
                            <div id="calendar_table">
                                <table id="calendar" align="center">
                                    <thead>
                                        <tr>
                                            <td id="calendar_prev">
                                                <label>
                                                    &#60;
                                                </label>
                                            </td>
                                            <td id="calendar_current" colSpan="5"></td>
                                            <td id="calendar_next">
                                                <label>
                                                    &#62;
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={calendarStyle("sun")}>Sun</td>
                                            <td>Mon</td>
                                            <td>Tue</td>
                                            <td>Wed</td>
                                            <td>Thu</td>
                                            <td>Fri</td>
                                            <td className={calendarStyle("sat")}>Sat</td>
                                        </tr>
                                    </thead>
                                    <tbody id="calendar_body"></tbody>

                                </table>
                            </div>

                            <div id="calendar_filter">
                                <label>filter</label>
                            </div>

                            <a id="sch_reg_btn" onClick={this.regForm}>등록하기</a>

                        </div>
                        
                        <div id="schRegForm"></div>
                        <div id="schRegFormContainer">
                            <div id="schRegFormWrap">

                                <div className={calendarStyle("schRegFormClose")} onClick={this.regForm}>
                                    <i className={calendarStyle("firstClose")}></i>
                                    <i className={calendarStyle("secondClose")}></i>
                                </div>

                                <div className={calendarStyle("schForm")}>
                                    <div className={calendarStyle("form_ea")}>

                                        <div>
                                            <p>Playlist</p>
                                            <a>선택</a>
                                        </div>
                                        <div>
                                            <input className={calendarStyle("selectInput")} type="text" readOnly />
                                        </div>

                                    </div>

                                    <div className={calendarStyle("form_ea")}>
                                        
                                        <div>
                                            <p>Display</p>
                                            <a>선택</a>
                                        </div>
                                        <div className={calendarStyle("formInputWrap")}>
                                            <input className={calendarStyle("selectInput")} type="text" readOnly />
                                        </div>

                                    </div>

                                    <div className={calendarStyle("form_ea")}>

                                        <div>
                                            <p>스케줄 명</p>
                                        </div>
                                        <div className={calendarStyle("formInputWrap")}>
                                            <input className={calendarStyle("selectInput")} type="text" style={{cursor: "text"}} />
                                        </div>

                                    </div>

                                    <div className={calendarStyle("form_ea")}>

                                        <div>
                                            <p>시작 시간</p>
                                        </div>
                                        <div className={calendarStyle("formInputWrap")}>
                                            <input id="start_time" className={calendarStyle("selectInput")} type="text" onClick={this.selectStartTime} />
                                            <div id="setStartCalendarWrap" className={calendarStyle("setCalendarWrap")}></div>
                                        </div>

                                    </div>

                                    <div className={calendarStyle("form_ea")}>
                                        
                                        <div>
                                            <p>종료 시간</p>
                                        </div>
                                        <div className={calendarStyle("formInputWrap")}>
                                            <input id="end_time" className={calendarStyle("selectInput")} type="text" onClick={this.selectEndTime} />
                                            <div id="setEndCalendarWrap" className={calendarStyle("setCalendarWrap")}></div>
                                        </div>

                                    </div>
                                </div>
                                
                                <div className={calendarStyle("repeatForm")}>

                                    <div className={calendarStyle('repeatSetting')}>
                                        <p onClick={this.repeatForm}>반복 설정</p>
                                    </div>

                                    <div className={calendarStyle("repeatWrap")}>
                                        
                                        <div className={calendarStyle('repeat_ea')} style={{width: "58%", marginRight: "2%", display: "inline-block"}}>
                                            <p>반복 타입</p>
                                            <div id="repeat_type">
                                                <div id="repeat_title" onClick={this.selectRepeat}>
                                                    선택해주세요.
                                                </div>
                                                <div id="repeat_option">
                                                    <label className="tos">
                                                        <input type="radio" dt="선택해주세요." value="none" />
                                                        ------
                                                    </label>
                                                    <label className="tos">
                                                        <input type="radio" dt="매 시간" value="hour" />
                                                        매 시간
                                                    </label>
                                                    <label className="tos">
                                                        <input type="radio" dt="매 일" value="days" />
                                                        매 일
                                                    </label>
                                                    <label className="tos">
                                                        <input type="radio" dt="매 주" value="weeks" />
                                                        매 주
                                                    </label>
                                                    <label className="tos">
                                                        <input type="radio" dt="매 월" value="month" />
                                                        매 월
                                                    </label>
                                                    <label className="tos">
                                                        <input type="radio" dt="매 년" value="years" />
                                                        매 년
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={calendarStyle('repeat_ea')} style={{width: "40%", display: "inline-block"}}>
                                            <p>반복 간격</p>
                                            <input id="repeat_pr" className={calendarStyle("selectInput")} type="text" style={{cursor: "text"}} />
                                        </div>
                                        
                                        <div className={calendarStyle('repeat_ea formInputWrap')}>
                                            <p>반복 종료 시간</p>
                                            <input id="repeat_end_time" className={calendarStyle("selectInput")} type="text" onClick={this.selectRepeatTime} />
                                            <div id="setRepeatCalendarWrap" className={calendarStyle("setCalendarWrap")}></div>
                                        </div>

                                    </div>
                                </div>
                                
                                <div className={calendarStyle("schBtn")}>
                                    <a id="schReg">등록</a>
                                    <a id="schCan" onClick={this.regForm}>취소</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
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
	
)(Calendar));