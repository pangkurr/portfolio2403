// aos
AOS.init();

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
// 반응형 변수 초기화
let isMobile = isMobileDevice();

// aniText
let typed = new Typed('.textani', {
    strings: [
        'Web Frontend',
        'UI Developer',
        'Web Publisher',
    ],
    fadeOut: false, //true: 사라지기, false: 한글자씩 지우기
    fadeOutDelay: 1000, //사라지는 타이밍
    loop: false, //반복 유무
    showCursor: true,
    cursorChar: "|", //깜박거리는 문자열 = 기본값은 "|"
    autoInsertCss: true, //fade같이 css 사용하는거 자동조절 x
    backSpeed: 50, //한글자씩 지워지는 속도
    smartBackspace: true,
});


// header
const header = document.querySelector("header");
const headerInner = header.querySelector(".page-inner");
const pcHeader = header.querySelector(".header-menu.pc");//pc 헤더
const mobileHeader = header.querySelector(".header-menu.mobile"); //모바일헤더
const menuList = header.querySelectorAll("ul li"); //헤더메뉴
const menuLine = header.querySelector(".menu-focus");//헤더메뉴 표시줄
const menuBar = header.querySelector(".menu-bar");//mobile 햄버거바
let menuOpen = false; // 헤더메뉴 오픈여부

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // 스크롤 거리가 0보다 크면 fixed 클래스를 추가, 아니면 제거
    if(isMobile){ //true=mobile 일때
        if (scrollPosition > 0) {
            header.classList.remove('zero');
            header.classList.add('fixed');

            if(menuBar.classList.contains("active")&&header.classList.contains("fixed")){//스크롤시 열려있다면
                pcHeader.style.opacity = "0"; // 기본값으로 초기화
                pcHeader.style.transform = "translateX(150%)"; // 기본값으로 초기화
                menuBar.classList.remove("active");
                menuOpen = false;
            }
        } else {
            header.classList.add('zero');
            header.classList.remove('fixed');
            mobileHeader.style.opacity = "0"; 
            mobileHeader.style.transform = "translateY(-100%)";
            menuBar.classList.remove("active");
            menuOpen = false;
        }
    }else{//false = pc일때 
        if (scrollPosition > 0) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }
})

// header-menu
menuBar.addEventListener("click",()=>{
    menuOpen = !menuOpen;

    if(menuOpen){ //true = 열려있을때
        menuBar.classList.add("active");
    }else{
        menuBar.classList.remove("active");
    }
    
    if (!menuBar.classList.contains("active")) {
        // active 클래스가 제거되었을 때
        pcHeader.style.opacity = "0"; // 기본값으로 초기화
        pcHeader.style.transform = "translateX(150%)"; // 기본값으로 초기화
        mobileHeader.style.opacity = "0"; 
        mobileHeader.style.transform = "translateY(-100%)";
    } else {
        if(header.classList.contains("fixed")){//fixed가 있다면
            mobileHeader.style.opacity = 1;
            mobileHeader.style.transform = "translateY(0%)";
        }else{ //fixed가 없다면
            pcHeader.style.opacity = 1;
            pcHeader.style.transform = "translateX(25%)";
        }
    }
})

window.addEventListener("load", () => { //pc일때 첫 메뉴 포커스
    window.scrollTo("top", 0);
    //초기화
    menuList.forEach((root) => {
        root.classList.remove("active");
    });
    menuList[0].classList.add("active");
    // focus 위치잡기
    const pcHeaderRect = pcHeader.getBoundingClientRect();
    const activeMenu = pcHeader.querySelector("ul li.active");
    const activeMenuSpan = activeMenu.querySelector("span");
    const activeSpanWidth = activeMenuSpan.offsetWidth;
    menuLine.style.width = activeSpanWidth + "px";

    const activeSpanRect = activeMenuSpan.getBoundingClientRect();
    menuLine.style.left = ((activeSpanRect.left - pcHeaderRect.left) / pcHeaderRect.width) * 100 + "%";
    if(isMobile){
        menuLine.style.display = "none";
        pcHeader.style.opacity = "0"; // 기본값으로 초기화
        pcHeader.style.transform = "translateX(150%)"; // 기본값으로 초기화
    }else{
        menuLine.style.display = "block";
    }
});

menuList.forEach((menu) => { //메뉴포커스 관련 코드
    menu.addEventListener("click", () => {
        // menu-focus width값 정하기
        menuLine.style.display = "block";
        const menuSpan = menu.querySelector("span");

        const menuLineWidth = menuSpan.offsetWidth;
        menuLine.style.width = menuLineWidth + "px";

        const pcHeaderRect = pcHeader.getBoundingClientRect();
        const spanRect = menuSpan.getBoundingClientRect();

        menuLine.style.left = ((spanRect.left - pcHeaderRect.left) / pcHeaderRect.width) * 100 + "%";

        menuList.forEach((other) => {
            other.classList.remove("active");
        });
        menu.classList.add("active");

        // 초기화
        if(isMobile){
            pcHeader.style.opacity = "0"; // 기본값으로 초기화
            pcHeader.style.transform = "translateX(150%)"; // 기본값으로 초기화
            mobileHeader.style.opacity = "0"; 
            mobileHeader.style.transform = "translateY(-100%)";
            menuBar.classList.remove("active");
            menuOpen = false;
            menuLine.style.display = "none";
        }else{
            menuLine.style.display = "block";
        }
    });
});


// portfolio filter
const filterBox = document.querySelectorAll(".filter-box"); //연도 버튼
const portfolio = document.querySelectorAll(".portfolio-box");//포트폴리오 아이템
filterBox.forEach((box) => {
    box.addEventListener("click", () => {
        const years = box.getAttribute("data-years"); //클릭한 필터값

        filterBox.forEach((other) => {
            other.classList.remove("active");
        })
        box.classList.add("active");

        portfolio.forEach((item) => {
            const itemYears = item.getAttribute('data-years');
            const shouldBeDisplayed = (years === "all" || itemYears === years);
            item.classList.toggle("active", shouldBeDisplayed);
        });
    });
});

// back to top
function scrollToTop() {
    window.scrollTo("top", 0);
}

const topbtn = document.querySelector(".topbtn");
topbtn.addEventListener("click", scrollToTop);
const logo = document.querySelector(".header-logo");
logo.addEventListener("click", scrollToTop);

window.addEventListener("scroll",()=>{
    const scrollPosition = window.scrollY;
    
    if(scrollPosition>0){//스크롤 발생시 생기기
        topbtn.style.display = "flex";
    }else{
        topbtn.style.display = "none";
    }
})
