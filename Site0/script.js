window.addEventListener('DOMContentLoaded', function () {
    var backdrop = document.querySelector('.backdrop'),
        btns = document.querySelectorAll('.plan-btn'),
        modal = document.querySelector('.modal'),
        noBtn = document.querySelector('.modal__action--negative'),
        toggleBtn = document.querySelector('.toggle-button'),
        mobileNav = document.querySelector('.mobile-nav');

    function clickOnBtn() {
        backdrop.style.display = 'block';
        setTimeout(() => backdrop.classList.add('active'), 10);
        if (modal) {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add('active'), 10);
        }
    }

    if (modal) {
        btns[0].addEventListener('click', clickOnBtn);
        btns[1].addEventListener('click', clickOnBtn);
        btns[2].addEventListener('click', clickOnBtn);
    }

    if(modal){
    noBtn.addEventListener('click', function () {
        setTimeout(() => backdrop.style.display = 'none', 500);
        backdrop.classList.remove('active');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = "none", 500)
        }
    });
}

    backdrop.addEventListener('click', () => {
        backdrop.classList.remove('active');
        setTimeout(() => backdrop.style.display = 'none', 500);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = "none", 500)
        }
        mobileNav.classList.remove('active');
        setTimeout(() => mobileNav.style.display = 'none', 500);
    });

    toggleBtn.addEventListener('click', () => {
        backdrop.style.display = 'block';
        setTimeout(() => backdrop.classList.add('active'), 10);
        mobileNav.style.display = 'block';
        setTimeout(() => mobileNav.classList.add('active'), 10);
    });
});