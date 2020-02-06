$(document).ready(function () {

    //#region SELECT OPTION

    $('.select .select_top').click(function () {
        $(this).parent().addClass('active');
    });

    $('.select .select_item').click(function () {
        $('.select_text').html($(this).html())
        $(this).parents('.select').removeClass('active');
    });

    $(".select .overlay").click(function () {
        $(this).parent().removeClass('active');
    });

    //#endregion

    //#region HEADER SEARCH 
    $('.search-form .search-input').keyup(function () {
        if ($(this).val().length > 0 && $(this).val().trim() != '') {
            OpenSearchList()
        }
        else {
            CloseSearchList()
        }
    })
    $('.search-form .search-input').blur(function () {
        CloseSearchList()
    })

    function CloseSearchList() {
        $('.search-result-list ').removeClass('active');
        $('.search-overlay').removeClass('active');
    }
    function OpenSearchList() {
        $('.search-overlay').addClass('active');
        $('.search-result-list ').addClass('active');
    }

    //#endregion 

    //#region NAV MANU

    $('.sub-categories .list').first().fadeIn();
    $('.categories-list li').click(function () {
        $(`.sub-categories .list`).fadeOut(200);
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        setTimeout(() => {
            $(`.sub-categories ${$(this).data("id")}`).fadeIn();
        }, 200);
    });

    //#endregion

    //#region 
    var previousScroll = 0;

    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > 600) {
            console.log('down');
            $('header').addClass('scroll-header')
        } else {
            console.log('up');
            $('header').removeClass('scroll-header')
        }
        // previousScroll = currentScroll;
    });
    //#endregion
});