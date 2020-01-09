window.addEventListener("DOMContentLoaded", function() {
    let selector = document.querySelector('.nav__selector'),
        nav__items = document.querySelectorAll('.nav__item');

    nav__items.forEach((item) => {
        item.addEventListener('click', (event) => {
            console.log(item.getBoundingClientRect().left);
            item.getBoundingClientRect().left = item.getBoundingClientRect().left + 100;
            console.log(item.getBoundingClientRect().left);
            // selector.setAttribute(`transform', 'translateX(${item.getBoundingClientRect().left})`);
        });
    });

});