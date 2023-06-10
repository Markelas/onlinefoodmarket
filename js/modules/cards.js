import { getResourse } from "../services/services";

function cards () {
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

}

export default cards;