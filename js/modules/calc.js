function calc () {
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
};

export default calc;