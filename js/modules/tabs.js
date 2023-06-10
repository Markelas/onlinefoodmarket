function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);
    
    function hideTabContent() {
        tabsContent.forEach(item =>{ //Перебираем псевдомассив и скрываем контент на сайте
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); //У каждого из табов удаляем класс активности
        });
    }
    
    function showTabContent(i = 0) { //В объявлении аргументов можем сразу присвоить значнеие 0, так как оно по умолчанию
        tabsContent[i].classList.add('show', 'fade'); //Добавляем css анимации
        tabsContent[i].classList.remove('hide'); //Ранее мы ставили display none, и в противовес этому, делаем display block, чтобы отбразить на странице
        tabs[i].classList.add(activeClass); //Добавляем класс 
    }
    //Т.е. мы скрываем все табы и отображаем только тот, который нас интересует

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target; //Чтобы сэкономить время и не писать везде event.target, можем просто перенести в переменную target

        if (target && target.classList.contains(tabsSelector.slice(1))) { //Проверяем, кликнули ли в один из элементов в списке, а не на родителя, также, в contains вставляется класс без точки в начале, поэтому передаём аргумент tabsSelector и с помощью slice(1), убираем первый знак (точка)
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); //Перебираются элементы на страницы, проверятся, куда был клик и тот элемент, на который был клик, подставляется
                    //В функцию showTabContent
                }
            });
        }
    });
}

export default tabs; // Экспортируем функцию tabs