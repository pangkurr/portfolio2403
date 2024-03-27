// aos
AOS.init();

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

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // 스크롤 거리가 0보다 크면 fix 클래스를 추가, 아니면 제거
    if (scrollPosition > 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
})

// header-menu
const headerMenu = header.querySelector(".header-menu");
const menuList = header.querySelectorAll("ul li");
const menuLine = header.querySelector(".menu-focus");

window.addEventListener("load", () => {
    window.scrollTo("top", 0);
    //초기화
    menuList.forEach((root) => {
        root.classList.remove("active");
    });
    menuList[0].classList.add("active");
    // focus 위치잡기
    const headerMenuRect = headerMenu.getBoundingClientRect();
    const activeMenu = headerMenu.querySelector("ul li.active");
    const activeMenuSpan = activeMenu.querySelector("span");
    const activeSpanWidth = activeMenuSpan.offsetWidth;
    menuLine.style.width = activeSpanWidth + "px";

    const activeSpanRect = activeMenuSpan.getBoundingClientRect();
    menuLine.style.left = ((activeSpanRect.left - headerMenuRect.left) / headerMenuRect.width) * 100 + "%";
});

menuList.forEach((menu) => {
    menu.addEventListener("click", () => {
        // menu-focus width값 정하기
        const menuSpan = menu.querySelector("span");

        const menuLineWidth = menuSpan.offsetWidth;
        menuLine.style.width = menuLineWidth + "px";

        const headerMenuRect = headerMenu.getBoundingClientRect();
            const spanRect = menuSpan.getBoundingClientRect();

            menuLine.style.left = ((spanRect.left - headerMenuRect.left) / headerMenuRect.width) * 100 + "%";

            menuList.forEach((other) => {
                other.classList.remove("active");
            });
            menu.classList.add("active");
    });
});


// portfolio filter
const filterBox = document.querySelectorAll(".filter-box"); //연도 버튼
const portfolio = document.querySelectorAll(".portfolio-box");//포트폴리오 아이템
filterBox.forEach((box) => {
    box.addEventListener("click", () => {
        filterBox.forEach((other) => {
            other.classList.remove("active");
        })
        box.classList.add("active");

        // 연도별 필터링 코드
        portfolio.forEach((item) => { //다 없애주고
            // item.style.display = "none";
            item.classList.remove("active");
        });

        const years = box.getAttribute("data-years"); //클릭한 필터값

        if (years == "all") {
            portfolio.forEach((item) => { //다 없애주고
                // item.style.display = "flex";
                item.classList.add("active");
            });
        } else {
            portfolio.forEach((item) => {
                if (item.getAttribute('data-years') === years) {
                    // item.style.display = 'flex';
                    item.classList.add("active");
                }
            });
        }
    });
});

// back to top
const logo = document.querySelector(".header-logo");
const topbtn = document.querySelector(".topbtn");

window.addEventListener("scroll",()=>{
    const scrollPosition = window.scrollY;
    
    if(scrollPosition>0){//스크롤 발생시 생기기
        topbtn.style.display = "flex";
    }else{
        topbtn.style.display = "none";
    }
})

topbtn.addEventListener("click", () => {
    window.scrollTo("top", 0);
});
logo.addEventListener("click", () => {
    window.scrollTo("top", 0);
});