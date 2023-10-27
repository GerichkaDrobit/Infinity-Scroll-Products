function loadCustomItems(options) {
    var currentPage = parseInt($(options.currentPage).first().text());
    var pageEnd = parseInt($(options.paginationSelector + ' a:eq(' + ($(options.paginationSelector + ' a').length - 2) + ')').attr('href').match(/\d+/));
    
    var autoLoadButton = options.autoLoadButton;
    var getURL = options.getURL;

    var pageCount = parseInt($((options.paginationSelector) + ' a:last').attr('href').match(/\d+/));
    
    

    if (autoLoadButton){
        if (($(options.paginationSelector).length || !autoLoad) && (currentPage !== pageEnd || currentPage !== pageCount)) {
            $(options.containerSelector).after('<div id="loadMore">Загрузить</div>');
        }
    }
    
    if (autoLoad) {
        $(window).scroll(function () {
            if ($(options.containerSelector).scrollTop() + $(options.containerSelector).height() >= $(document).height()) {
                loadNextPage();
            }
        });
    }

    function loadNextPage() {
        currentPage++;
        var nextPageURL = getURL + currentPage + '.html';
        if (!autoLoad) {
            if (currentPage === pageCount || currentPage === pageEnd) {
                $(options.loadMoreButton).hide();
            }
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

    $(options.loadMoreButton).on('click', loadNextPage);
}

/*Вызов*/
loadCustomItems({
    containerSelector: '.custom-dc', //Контейнер с элементами
    itemSelector: '.custom-item', //Элемент
    paginationSelector: '.pager', //Контейнер с пагинацией
    pageCountElement: '.pager a, .pager span', //Подсчет всех элементов пагинации
    currentPage: '.pager .active', //Определение страницы нахождения
    autoLoad: false, //True - если хотите чтобы страница загружалась сама без кнопки, false - с кнопки
    autoLoadButton: true, //Вариант работы: true - кнопка добавляется сама, false - кнопка добавляется вручную
    loadMoreButton: '#loadMore', //ID или класс кнопки, делайте че хотите
    getURL: 'page=', //GET параметр пагинации
});
/*Конец вызова*/
