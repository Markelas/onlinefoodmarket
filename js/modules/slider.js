function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        
    // СЛАЙДЕР

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper), // Оболочка
        slidesField = document.querySelector(field), // Поле со слайдами
        width = window.getComputedStyle(slidesWrapper).width; //Окошко, через скоторое будем смотреть на слайды

    let slideIndex = 1;
    let offset = 0;


    //ПРОСТОЙ ВАРИАНТ
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }


    //     if (n < 1) {
    //         slideIndex = slideIndex.length; // Присваиваем граничное значение
    //     }
        
    //     slides.forEach(item => item.style.display = 'none'); //Скрываем карточки

    //     slides[slideIndex - 1].style.display = 'block'; //Так как вначале он был 1, а отсчёт начинается с 0

    //     if (slides.length < 10) { //Изменяем счетчик в слайдере
    //         current.textContent = `0${slideIndex}`; //Если меньше 10, то добавляем 0
    //     } else {
    //         current.textContent = slideIndex; //Если больше 10, то просто число
    //     }
        
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n); //Вызывает функцию и увеличивает на значение n, например, +1 когда вперед, и -1 когда назад
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //Все слайды мы помещаем на странице, в slidesField, чтобы они помещались полностью. Пишем '%', так как это стили css
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden'; //Скрываем все остальные картинки, которые не попадают в это "окошко", область видимости

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // Для нормального отображения абсолютно спозиционированных стилей 

    const indicators = document.createElement('ol'), //Создаём стили для контейнера индикаторов
        dots = [];

    indicators.classList.add('carousel-indicators'); // Добавляем класс и стили 
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators); //Добавляем в конец 

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); //Создаём элемент точки и даём стили
        dot.setAttribute('data-slide-to', i + 1); // Каждой точке будем устанавливать атрибут data-slide-to и давать нумерацию, начиная с единицы 
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transform: opacity .6s ease;
        `;
        if (i == 0) { 
            dot.style.opacity = 1; //Когда первая точка активна, она белая 
        }
        indicators.append(dot); // Когда цикл сработает будет определенное количество точек 
        dots.push(dot);
    };

    // next.addEventListener('click', () => { //При нажатии на стрелочку "вправо"
    //     if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { //Если это последний слайд, то мы сдвигаем на первый
    //         //Используем унарный +, чтобы перевести в число, затем метод slice, чтобы разбить значение "500px" на 500 и px, для этого мы выделяем начало строки и оставляем
    //         //сиволы до последних двух элементов, затем полученное число умножаем на количество слайдов 
    //         offset = 0; //Если слайд последний, то сдвигается все на 0
    //     } else { //Если слайд не последний
    //         offset += +width.slice(0, width.length - 2); //Двигаем вправо, т.е. прибавляем к текущему значению картинок, еще одну ширину картинки
    //     } //Н-р если 1 картинка 500px + вторая картинка 500px = 1000px, затем еще третья и будет 1500px 

    //МОЖЕМ СДЕЛАТЬ ЛЕГЧЕ С РЕГУЛЯРНЫМИ ВЫРАЖЕНИЯМИ

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //Ищем НЕ числа и заменяем на пустоту, они удаляются
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); //Изначально у каждой точки полупрозрачный стиль
        dots[slideIndex - 1].style.opacity = 1; //При изменении, точка становится белой
    });


    prev.addEventListener('click', () => { //При нажатии на стрелочку "влево", делаем все наоборот
        if (offset == 0) { //Если это первый слайд, то мы сдвигаем на последний
            offset = deleteNotDigits(width) * (slides.length - 1); //Если слайд последний, то сдвигается все на 0
        } else { //Если слайд не последний
            offset -= deleteNotDigits(width); //Отнимаем ширину слайда, на которую смещаем
        } 

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5'); //Изначально у каждой точки полупрозрачный стиль
        dots[slideIndex - 1].style.opacity = 1; //При изменении, точка становится белой
    });



    dots.forEach(dot => { // Берём каждую точку 
        dot.addEventListener('click', (e) => { //Навешиваем обработчик событий 
            const slideTo = e.target.getAttribute('data-slide-to'); //Ловим событие, на каждой точке

            slideIndex = slideTo; //Если нажмём на одну из точек, присвоется нужный индекс 
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            
            dots.forEach(dot => dot.style.opacity = '.5'); //Изначально у каждой точки полупрозрачный стиль
            dots[slideIndex - 1].style.opacity = 1; //При изменении, точка становится белой
        });
    });

}

export default slider;