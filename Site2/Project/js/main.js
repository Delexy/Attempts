const menuItems = document.querySelectorAll('.main-nav__item');
const menuIcons = document.querySelectorAll('.menu-item__svg');
const closerNav = document.querySelector('.main-nav__exit');
const burgerNav = document.querySelector('.main-nav__burger');
const navMenu = document.querySelector('.main-nav');
const userInput = document.querySelector('.main-header__input-cnt input');

function deleteActiveClass() {
    function deleteActiveSVG(item) {
        const strokes = item.querySelectorAll('path');
        strokes.forEach(stroke => {
            stroke.setAttribute("stroke", "black");
        });
    }
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    menuIcons.forEach(item => {
        deleteActiveSVG(item);
    });
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        deleteActiveClass();
        item.classList.add('active');
        const strokes = item.querySelectorAll('path');
        strokes.forEach(stroke => {
            stroke.setAttribute("stroke", "#34ABE0");
        });
        const namePage = document.querySelector('.main-header h1');
        namePage.textContent = item.querySelector('span').textContent;
    });
});

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos || window.scrollY < 60) {
    document.querySelector(".main-header h1").style.top = "0";
    document.querySelector(".main-header__input-cnt").style.top = "0";
    document.querySelector(".main-header").style.height = "100%";
  } else {
    document.querySelector(".main-header h1").style.top = "-100px";
    if (document.documentElement.clientWidth <= 320){
        document.querySelector(".main-header__input-cnt").style.top = "-60px";
    }else if(document.documentElement.clientWidth <= 768) {
        document.querySelector(".main-header__input-cnt").style.top = "-50px";
    }else {
        document.querySelector(".main-header__input-cnt").style.top = "-80px";
    }
    document.querySelector(".main-header").style.height = "50%";

  }
  prevScrollpos = currentScrollPos;
}

closerNav.addEventListener("click", () => {
    navMenu.classList.toggle("active-nav");
});

burgerNav.addEventListener("click", () => {
    navMenu.classList.toggle("active-nav");
});

const defaultInput = userInput.value;

userInput.addEventListener("click", () => {
    if(userInput.value === defaultInput){
        userInput.value = '';
    }
});