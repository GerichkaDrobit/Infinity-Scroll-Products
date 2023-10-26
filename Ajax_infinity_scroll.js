function loadCustomItems(options) {
    var currentPage = parseInt($(options.currentPage).first().text());
    var pageEnd = parseInt($(options.paginationSelector + ' a:eq(' + ($(options.paginationSelector + ' a').length - 2) + ')').attr('href').match(/\d+/));
    
    var showButton = $(options.autoLoadButton);
    var pageCount = parseInt($((options.paginationSelector) + ' a:last').attr('href').match(/\d+/));
    if (showButton === true){
        if (($(options.paginationSelector).length) && (currentPage !== pageEnd && currentPage !== pageCount)) {
            $(options.containerSelector).after('<div id="loadMore">Загрузить</div>');
        }
    }

    function loadNextPage() {
        currentPage++;
        var nextPageURL = '?page=' + currentPage;
        if (currentPage === pageCount || currentPage === pageEnd) {
            $(options.loadMoreButton).hide();
        }
        $.ajax({
            url: nextPageURL,
            type: 'GET',
            success: function (data) {
                var $nextCustomItems = $(data).find(options.itemSelector);
                $(options.containerSelector).append($nextCustomItems);
            }
        });
    }

    showButton.on('click', loadNextPage);
}
/*Вызов*/
loadCustomItems({
    containerSelector: '.custom-dc', //Контейнер с элементами
    itemSelector: '.custom-item', //Элемент
    paginationSelector: '.pager', //Контейнер с пагинацией
    pageCountElement: '.pager a, .pager span', //Подсчет всех элементов пагинации
    currentPage: '.pager .active', //Определение страницы нахождения
    autoLoadButton: true, //Вариант работы: true - кнопка добавляется сама, false - кнопка добавляется вручную
    loadMoreButton: '#loadMore', //ID или класс кнопки, делайте че хотите
});
/*Конец вызова*/
