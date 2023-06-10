import { closeModal, openModal } from "./modal"; //Импортируем эти два модуля из modal.js
import { postData } from "../services/services"; //Импортируем сервисом для обработки базы данных в этот файл

function forms (formSelector, modalTimerId) {
    // Формы
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


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
        openModal('.modal', modalTimerId); //Ранее создавали функцию, для открытия модального окна

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
            closeModal('.modal');
        }, 4000);
    }


    fetch('http://localhost:3000/menu') //Подключение файла json с базой данных, перед началом работы нужно вводить npx json-server db.json
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;