window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item =>{ //Перебираем псевдомассив и скрываем контент на сайте
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); //У каждого из табов удаляем класс активности
        });
    }
    
    function showTabContent(i = 0) { //В объявлении аргументов можем сразу присвоить значнеие 0, так как оно по умолчанию
        tabsContent[i].classList.add('show', 'fade'); //Добавляем css анимации
        tabsContent[i].classList.remove('hide'); //Ранее мы ставили display none, и в противовес этому, делаем display block, чтобы отбразить на странице
        tabs[i].classList.add('tabheader__item_active'); //Добавляем класс 
    }
    //Т.е. мы скрываем все табы и отображаем только тот, который нас интересует

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //Чтобы сэкономить время и не писать везде event.target, можем просто перенести в переменную target

        if (target && target.classList.contains('tabheader__item')) { //Проверяем, кликнули ли в один из элементов в списке, а не на родителя
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); //Перебираются элементы на страницы, проверятся, куда был клик и тот элемент, на который был клик, подставляется
                    //В функцию showTabContent
                }
            });
        }
    });


    //Timer

    const deadline = '2023-08-12';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), //Получаем разницу в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //Делим миллисекунды и переводим в дни
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //Количество часов, делим % 24 это будет остаток от деления, чтобы получить от общего количества часов 
            minutes = Math.floor((t / 1000 / 60) % 60), //Получаем от общего кол-ва минут, минуты в 60
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t, //В будущем это значение также будем использовать, сравнивать, вдруг время уже закончилось
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) { //Чтобы на странице отображались цифры меньше 10, с 0, например, 09
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num
        }
    };

    function setClock(selector, endtime) { //Установка таймера
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'), //Получили все элементы со страницы
            timeInterval = setInterval(updateClock, 1000); //Чтобы время обновлялось каждую секунду, создаем интервал и вызываем функцию
        
        updateClock(); //Вызываем функцию, чтобы на странице не была отображена верстка со стандартными числами

        function updateClock() {
            const t = getTimeRemaining(endtime); //Здесь передается полученное время в виде объекта

            days.innerHTML = getZero(t.days); //Обращаемся к объекту и передаем информацию из него на страницу
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) { //Если разница между текущей датой и установленной даты уже меньше нуля
                clearInterval(timeInterval) //Останавливаем интервал, если время закончилось
            };
        }
    }

    setClock('.timer', deadline);




    /*----------------Modal---------------------*/
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //Убираем прокрутку
        clearInterval(modalTimerId); //Если пользователь сам нажмёт, таймер отключится
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function closeModal() { //Закрытие окна
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //Возвращаем
    }


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //При нажатии на div modal (тёмный фон) и также если элемент имеет атрибут data-close, вызывается функция закрытия
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //При нажатии на ESC
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 10000);


    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) //Видимая часть экрана складываем с полной длинной страницей
        {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll) //Открытие модального окна при прокрутки вниз до конца


// Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //В случае увеличения информации в карточке, будем передавать с помощью rest оператора ... новые значения в виде массива
            this.parent = document.querySelector(parentSelector)//Обращаемся к родительскому DOM элементу
            this.transfer = 78;
            this.changeToRUB(); //Вызываем метод 
        }
        changeToRUB() { //Поступает цена в долларах, мы переводим в рубли
            this.price = this.price * this.transfer;
        }
        render() { //Выстраиваем HTML структуру
            const element = document.createElement('div'); 

            if (this.classes.length === 0) { //Если в classes не передали значения для родительского элемента
                this.element = 'menu__item'; //По умолчанию будет добавляться родительский элемент menu__item
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); //Иначе, добавляем нужный класс
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element); //Помещаем в конец родителя элемент 
        }
    }

    const getResourse = async (url) => { // get запрос
        const res = await fetch(url);
        
        if(!res.ok) { //У fetch есть свойство ok, проверяет, все ли хорошо отрабатывает, если результат с ошибкой 
            throw new Error(`Could not fetch ${url}, status ${res.status}`); //Выкидываем новую ошибку с url и статусом 
        }

        return await res.json(); 
    };


    //ПЕРВЫЙ ВАРИАНТ
    getResourse("http://localhost:3000/menu") //С помощью запроса мы получили массив с меню (с объектами)
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //Конструктор будет создаваться столько раз, сколько  объектов в массиве (карточек) 
            });
        });
    
    //ВТОРОЙ ВАРИАНТ ФОРМИРОВАНИЯ КАРТОЧЕК
    // getResourse("http://localhost:3000/menu")
    //     .then(data => createCard(data));
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         price = price * 82;
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //         </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // ФОРМЫ В ОБЫЧНОМ ФОРМАТЕ

    // const forms = document.querySelectorAll('form');

    // const message = {
    //     loading: 'Загрузка',
    //     success: 'Спасибо! Скоро мы с вами свяжемся',
    //     failure: 'Что-то пошло не так...'
    // };

    // forms.forEach(item => {
    //     postData(item);
    // });

    // function postData(form) { //Функция принимает в себе форму, аргумент
    //     form.addEventListener('submit', (e) => { //На эту форму навешиваем обработчик события на submit, оно срабатывает, когда пытаемся отправить форму
    //         e.preventDefault(); //Отменяем стандартное поведение браузера, чтобы не перезагружался 

    //         const statusMessage = document.createElement('div'); //Чтобы создать новый див, в котором будет сообщение
    //         statusMessage.classList.add('status');
    //         statusMessage.textContent = message.loading; //Если загрузка
    //         form.append(statusMessage); // К форме будем добавлять сообщение


    //         const request = new XMLHttpRequest(); //Создаём объект 
    //         request.open('POST', 'server.php'); //Вызываем метод open(), чтобы настроить запрос и внутрь помещаем данные 
            

    //         const formData = new FormData(form); //Помещяем конструктор, внутри будет форма, с которой мы хотим собрать данные
    //         //В вёрстке, обязательно в теге input должен быть атрибут name="name", иначе input не сможет сработать

    //         request.send(formData); //Отправялем форму, которую запонили

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) { //Если статус "Все хорошо, данные ушли"
    //                 console.log(request.response);
    //                 statusMessage.textContent = message.success; //Если все хорошо
    //                 form.reset(); //Сброс формы 
    //                 setTimeout(() => {
    //                     statusMessage.remove();
    //                 }, 2000);
    //             } else {
    //                 statusMessage.textContent = message.failure //Иначе, что что-то пошло не так
    //             }
    //         })
    //     });
    // }



    //ФОРМЫ В ФОРМАТЕ JSON


    //ТРЕТИЙ ВАРИАНТ С ИСПОЛЬЗОВАНИЕМ БИБЛИОТЕКИ AXIOS
    // axios.get("http://localhost:3000/menu")
    //     .then(data => {
            //     data.forEach(({img, altimg, title, descr, price}) => {
            //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //Конструктор будет создаваться столько раз, сколько  объектов в массиве (карточек) 
            //     });
            // });

    // Формы
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) { //Функция принимает в себе форму, аргумент
        form.addEventListener('submit', (e) => { //На эту форму навешиваем обработчик события на submit, оно срабатывает, когда пытаемся отправить форму
            e.preventDefault(); //Отменяем стандартное поведение браузера, чтобы не перезагружался 

            const statusMessage = document.createElement('img'); //Создали изображение
            statusMessage.src = message.loading; //Подставили к нему путь
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage); //К форме будем добавлять сообщение

            //СТАРЫЙ ВАРИАНТ
            // const request = new XMLHttpRequest(); //Создаём объект 
            // request.open('POST', 'server.php'); //Вызываем метод open(), чтобы настроить запрос и внутрь помещаем данные 

            //request.setRequestHeader('Content-type', 'application/json');
            //const formData = new FormData(form); //Помещяем конструктор, внутри будет форма, с которой мы хотим собрать данные
            //В вёрстке, обязательно в теге input должен быть атрибут name="name", иначе input не сможет сработать

            // const object = {}; //Просто так перегнать из обычного формата в json нельзя, поэтому создаём объект
            // formData.forEach(function(value, key) {
            //     object[key] = value; //На основании значений, которые были в formData, мы сформируем объект, с помощью перебора
            // });

            // const json = JSON.stringify(object); //После перегонки значений через forEach и перемещения в объект, изменяем эти значения в вид JSON

            //request.send(json); //Отправялем форму, которую запонили

            // request.addEventListener('load', () => {
            //     if (request.status === 200) { //Если статус "Все хорошо, данные ушли"
            //         console.log(request.response);
            //         showThanksModal(message.success); //Если все хорошо
            //         form.reset(); //Сброс формы 
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure) //Иначе, что что-то пошло не так
            //     }
            // });


            //НОВЫЙ ВАРИАНТ

            //fetch мы берем данные, передаём их и с помощью then мы что-то выполняем, н-р, пишем, что все хорошо
            //Если что-то пошло не так, мы с помощью catch сообщаем об ошибке
            //В любом случае, хоть положительно или отрицательно пройдет запрос, мы что-то делаем в finally 

            const formData = new FormData(form); //Помещяем конструктор, внутри будет форма, с которой мы хотим собрать данныеь

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //С entries Получим данные в виде массива с массивами [['a', 23], ['b', 50], ['c', 1] ]
            //С помощью Object.fromEntries() массив с массивами переводим в обычный объект  

            //const object = {}; //Просто так перегнать из обычного формата в json нельзя, поэтому создаём объект - Старый вариант
            // formData.forEach(function(value, key) {
            //     object[key] = value; //На основании значений, которые были в formData, мы сформируем объект, с помощью перебора
            // });

            postData('http://localhost:3000/requests', json) //Ранее созданную переменную json отправляем на сервер
            .then(data => { //Что нужно выполнить
                console.log(data); //data - данные, которые нам вернулись из сервера 
                showThanksModal(message.success); //Если все хорошо 
                statusMessage.remove();
            }).catch(() => { //Если есть ошибка, но он не реагирует на ошибки http, например, если будет 404 (Не найдено), из-за нарушенного пути к серверу,
                // он все равно выполнит запрос, как обычно, только при сбое сети он выполнит действия
                showThanksModal(message.failure) //Информация, что что-то пошло не так
            }).finally(() => { //У нас есть действие, в независимости от того, запрос обработался или произошла ошибка, мы в любом случае делаем сброс формы
                form.reset(); //Сброс формы
            })
        });
    }

    
    function showThanksModal(message) { //Модальное окно с информацией, после отправки данных
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //Добавляет класс, чтобы скрыть модальное окно 
        openModal(); //Ранее создавали функцию, для открытия модального окна

        const thanksModal = document.createElement('div'); //Создаём див, где будет информация в модальном окне
        thanksModal.classList.add('modal__dialog'); //Добавляем класс этому диву
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `; //Создаём структуру, где будет информация в модальном окне

        document.querySelector('.modal').append(thanksModal); //Добавляем к селектору .modal нашу созданную HTML струтуру
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    fetch('http://localhost:3000/menu') //Подключение файла json с базой данных, перед началом работы нужно вводить npx json-server db.json
        .then(data => data.json())
        .then(res => console.log(res));



    // СЛАЙДЕР

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Оболочка
        slidesField = document.querySelector('.offer__slider-inner'), // Поле со слайдами
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



    // КАЛЬКУЛЯТОР

    const result = document.querySelector('.calculating__result span'); //Итоговая цифра

    let sex, height, weight, age, ratio; 

    if (localStorage.getItem('sex')) { //Если в значении пола, в Local Storage есть информация
        sex = localStorage.getItem('sex'); //Устанавливаем в переменную sex эту информацию из Local Storage
    } else { //Если никакой информации нет
        sex = 'female'; //Устанавливаем в переменную значение по умолчанию 
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {  //Делаем тоже самое с физической активностью 
        ratio = localStorage.getItem('ratio'); 
    } else { 
        ratio = 1.375; 
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) { //Для установки активных значений исходя из данных из Local Storage 
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) { //Если текущий атрибут id совпадает с информацией в Local Storage
                elem.classList.add(activeClass); //Добавляем активный класс 
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function caltTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'female') { 
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 *age)) * ratio); // Для девушек
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 *age)) * ratio); // Для мужчин
        }
    };

    caltTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => { //На каждый элемент навешиваем обработчик событий
            elem.addEventListener('click', (e) => { //Когда нажимаем на кнопки калькулятора
                if (e.target.getAttribute('data-ratio')) { //Если у блока есть атрибут data-ratio, то изменяем переменную ratio (физ. активность)
                    ratio = +e.target.getAttribute('data-ratio'); //Присваевыем переменной ratio то значение, которое находится в атрибуте кнопки (н-р 1.2, 1.375, 1.55 или 1.725)
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //Записываем эту информацию в Local Storage, чтобы при обновлении сохранить это 
                } else {
                    sex = e.target.getAttribute('id'); //Если это был клик не на физ. активность, значит отслеживаем клик на кнопку с полом 
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
    
                elements.forEach(elem => { //Берем все элементы
                    elem.classList.remove(activeClass); //Убираем активный класс со всех элементов
                })
    
                e.target.classList.add(activeClass); //Добавляем активный класс элементу, на который кликнули 
    
                caltTotal()
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); // Присваеваем блоку gender calculating__choose-item_active - класс активности
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // Присваемваем блоку из физ. активности - класс активности 

    function getDynamicInformation(selector) { //Получение информации для блоков с ростом, весом и возрастом 
        const input = document.querySelector(selector); //Получаем селектор с блоком

        input.addEventListener('input', () => { //Отслеживаем введенные значения в input

            if(input.value.match(/\D/g)) { //Если нашли НЕ число, в введенных input, значит некорректно
                input.style.boxShadow = '0 2px 15px rgb(250,128,114)'; //Меняем тень на красный, указывая, что ошибка ввода (введена буква)
            } else {
                input.style.boxShadow = '0 4px 15px rgba(0,0,0,.2)'; //Возвращаем обратно
            }

            switch(input.getAttribute('id')) { //Проверяем с помощью id, в какой из блоков ввели данные
                case 'height': //Если это в блок с ростом
                    height = +input.value; //Добавляем данные в переменную рост 
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            caltTotal()
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});

