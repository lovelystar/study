import React from "react";
import Swiper from "react-id-swiper";

const Default = () => {
    
    return (
        <Swiper>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=t1s6cx7pnksjiubvta795a.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=ek2evdl8d69tgwgsq3elsq.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=yee9v7oy8vlu3lm5jv9qi.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=y0gtyncpysaydjgo7hsv0r.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=zzu7k6eh6t8613qkmiyo8s.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=kg22tv8ju9qpbxyfwcm7vc.jpg" />
        </div>
        <div style={{width: "150px", height: "150px"}}>
            <img style={{width: "150px", height: "150px"}} src="/study/thumbs?pfn=1r7pu1grwn4k5yn03htda.jpg" />
        </div>
        </Swiper>
    )

};

const Navigation = () => {

    const param1 = {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Swiper {...param1}>
            <div style={{background: "red", height: "100px", }}>
                <span>NAVAIGATION SWIPER #1</span>
            </div>
            <div style={{background: "orange", height: "100px", }}>
                <span>NAVAIGATION SWIPER #2</span>
            </div>
            <div style={{background: "yellow", height: "100px", }}>
                <span>NAVAIGATION SWIPER #3</span>
            </div>
            <div style={{background: "green", color: "white", height: "100px", }}>
                <span>NAVAIGATION SWIPER #4</span>
            </div>
            <div style={{background: "blue", color: "white", height: "100px", }}>
                <span>NAVAIGATION SWIPER #5</span>
            </div>
            <div style={{background: "indigo", color: "white", height: "100px", }}>
                <span>NAVAIGATION SWIPER #6</span>
            </div>
            <div style={{background: "purple", color: "white", height: "100px", }}>
                <span>NAVAIGATION SWIPER #7</span>
            </div>
        </Swiper>
    )

};

const DynamicPagination = () => {

    const param2 = {
        spaceBetween: 20, // << 그림과 그림 사이의 공백
        pagination: {
            el: ".swiper-pagination",
            clickable: true, // << 페이징 클릭하도록
            dynamicBullets: true // << 점 버튼에 애니메이션 효과 추가 풀면 swiper 갯수대로
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Swiper {...param2}>
            <div style={{background: "red", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #1</span>
            </div>
            <div style={{background: "orange", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #2</span>
            </div>
            <div style={{background: "yellow", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #3</span>
            </div>
            <div style={{background: "green", color: "white", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #4</span>
            </div>
            <div style={{background: "blue", color: "white", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #5</span>
            </div>
            <div style={{background: "indigo", color: "white", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #6</span>
            </div>
            <div style={{background: "purple", color: "white", height: "100px", }}>
                <span>DYNAMICPAGINATION SWIPER #7</span>
            </div>
        </Swiper>
    )

};

const ProgressPagination = () => {
    
    const param3 = {
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Swiper {...param3}>
            <div style={{background: "red", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #1</span>
            </div>
            <div style={{background: "orange", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #2</span>
            </div>
            <div style={{background: "yellow", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #3</span>
            </div>
            <div style={{background: "green", color: "white", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #4</span>
            </div>
            <div style={{background: "blue", color: "white", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #5</span>
            </div>
            <div style={{background: "indigo", color: "white", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #6</span>
            </div>
            <div style={{background: "purple", color: "white", height: "100px", }}>
                <span>PROGRESSPAGINATION SWIPER #7</span>
            </div>
        </Swiper>
    )

}

const FractionPagination = () => {
    
    const param4 = {
        pagination: {
            el: ".swiper-pagination",
            type: "fraction"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Swiper {...param4}>
            <div style={{background: "red", height: "100px", }}>
                <span>FractionPagination SWIPER #1</span>
            </div>
            <div style={{background: "orange", height: "100px", }}>
                <span>FractionPagination SWIPER #2</span>
            </div>
            <div style={{background: "yellow", height: "100px", }}>
                <span>FractionPagination SWIPER #3</span>
            </div>
            <div style={{background: "green", color: "white", height: "100px", }}>
                <span>FractionPagination SWIPER #4</span>
            </div>
            <div style={{background: "blue", color: "white", height: "100px", }}>
                <span>FractionPagination SWIPER #5</span>
            </div>
            <div style={{background: "indigo", color: "white", height: "100px", }}>
                <span>FractionPagination SWIPER #6</span>
            </div>
            <div style={{background: "purple", color: "white", height: "100px", }}>
                <span>FractionPagination SWIPER #7</span>
            </div>
        </Swiper>
    )

}

const Scroll = () => {
    
    const param5 = {
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Swiper {...param5}>
            <div style={{background: "red", height: "100px", }}>
                <span>Scroll SWIPER #1</span>
            </div>
            <div style={{background: "orange", height: "100px", }}>
                <span>Scroll SWIPER #2</span>
            </div>
            <div style={{background: "yellow", height: "100px", }}>
                <span>Scroll SWIPER #3</span>
            </div>
            <div style={{background: "green", color: "white", height: "100px", }}>
                <span>Scroll SWIPER #4</span>
            </div>
            <div style={{background: "blue", color: "white", height: "100px", }}>
                <span>Scroll SWIPER #5</span>
            </div>
            <div style={{background: "indigo", color: "white", height: "100px", }}>
                <span>Scroll SWIPER #6</span>
            </div>
            <div style={{background: "purple", color: "white", height: "100px", }}>
                <span>Scroll SWIPER #7</span>
            </div>
        </Swiper>
    )

}










/* Board 전용 */
const BoardContents = () => {

    const booardParam = {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
        }
    }

    return (
        <Swiper {...booardParam}>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=t1s6cx7pnksjiubvta795a.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=ek2evdl8d69tgwgsq3elsq.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=yee9v7oy8vlu3lm5jv9qi.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=y0gtyncpysaydjgo7hsv0r.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=zzu7k6eh6t8613qkmiyo8s.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=kg22tv8ju9qpbxyfwcm7vc.jpg" />
            </div>
            <div style={{width: "150px", height: "150px"}}>
                <img src="/study/thumbs?pfn=1r7pu1grwn4k5yn03htda.jpg" />
            </div>
        </Swiper>
    )
}

export { 
    Default, 
    Navigation, 
    DynamicPagination, 
    ProgressPagination,
    FractionPagination,
    Scroll,
    BoardContents,
};