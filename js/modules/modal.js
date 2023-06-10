
function closeModal(modalSelector) { //Закрытие окна
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //Возвращаем
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //Убираем прокрутку

    console.log(modalTimerId);
    if (modalTimerId){ //Если есть таймер, то включаем очистку таймера 
        clearInterval(modalTimerId); //Если пользователь сам нажмёт, таймер отключится
    }
}
function modal (triggerSelector, modalSelector, modalTimerId) {
    /*----------------Modal---------------------*/
    
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //Функция openModal не вызывается сразу, а с помощью ()=> вызывается после клика 
    });



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //При нажатии на div modal (тёмный фон) и также если элемент имеет атрибут data-close, вызывается функция закрытия
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { //При нажатии на ESC
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });




    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) //Видимая часть экрана складываем с полной длинной страницей
        {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll) //Открытие модального окна при прокрутки вниз до конца
}

export default modal;
export {closeModal}; //Передаём эти две функции, чтобы использовать их в forms.js  
export {openModal};