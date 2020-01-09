window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-12-19';

    function getTimeRemaining(endtime) {
        let t = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / 1000 / 60 / 60);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, end) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(end);

            if (String(t.hours).length == 1) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }

            if (String(t.minutes).length == 1) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (String(t.seconds).length == 1) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }



    }

    setClock('timer', deadline);

    // inToTop

    let ul = document.querySelector('ul'),
        li = document.createElement('li');
    ul.append(li);
    ul.querySelectorAll('li')[4].textContent = 'Вверх';
    li.setAttribute('id', 'toTop');

    let inToTop = document.getElementById('toTop');

    inToTop.addEventListener('click', function () {
        let tr = 0,
            inter = setInterval(function () {
                document.documentElement.scrollTop -= tr;
                tr += 3;
                if (document.documentElement.scrollTop == 0) {
                    clearInterval(inter);
                }
            }, 10);
    });

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что то пошло не так'
    };

    let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset = utf-8');
        let formData = new FormData(form),
        obj = {};

        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj),
            promise = new Promise(function (resolve, reject) {
                request.send(json);
                request.addEventListener('readystatechange', function () {

                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });

            promise
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(() => {for(let i = 0; i < input.length; i++){
                        input[i].value = ''; 
                    }});
    });

    //Slider


    let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dot = document.querySelectorAll('.dot');

    showSlide(slideIndex);

    function showSlide(n){

        if(n > slides.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dot.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex-1].style.display = 'block';
        dot[slideIndex-1].classList.add('dot-active');
    }

    function plusSlides(n){
        showSlide(slideIndex += n);
    }

    function currentSlide(n){
        showSlide(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', (event) => {
        for(let i = 0; i < dot.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dot[i-1]){
                currentSlide(i);
            }
        }
    });

//Calculator

    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.querySelector('#select'),
    totalValue = document.querySelector('#total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.textContent = '0';

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if(restDays.value == '' || persons.value == ''){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    
    restDays.addEventListener('input', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if(persons.value == '' || restDays.value == ''){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if(persons.value == '' || restDays.value == ''){
            totalValue.innerHTML = 0;
        }else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});
