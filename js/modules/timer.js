function timer (id, deadline) {
    //Timer


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

    setClock(id, deadline);
}

export default timer;