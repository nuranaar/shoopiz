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

    //#region HEAHER ON SCROLL
    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > 600) {
            $('header').addClass('scroll-header');
            $('#home-page').addClass('page-onscroll')
        } else {
            $('header').removeClass('scroll-header')
            $('#home-page').removeClass('page-onscroll')
        }
    });
    //#endregion

    //#region MODAL
    $('.multiple-select').click(function () {
        $('#multiple-select').addClass('show');
    });
    $('.fixed_modal .modal_close').click(function () {
        $(this).parents(".fixed_modal").removeClass('show');
        resetMultipleSelectModal()
    })
    //#endregion

    //#region SELECTED FILTER LIST

    let head_filter_select_items = [];
    let multiple_select_items = [];
    $('#property-list input').change(function () {
        const value = $(this).val();
        if ($(this).is(":checked")) {
            multiple_select_items.push(value);
            AddItemToFilterList(multiple_select_items, '.modal-bottom .selected_filter_list')
        }
        else {
            multiple_select_items = DeleteFromArray(value, multiple_select_items);
            AddItemToFilterList(multiple_select_items, '.modal-bottom .selected_filter_list')
        }
    })

    $(document).on('click', '.item .delete', function () {
        const value = $(this).prev().text().trim();
        multiple_select_items = DeleteFromArray(value, multiple_select_items, '.modal-bottom .selected_filter_list');
        head_filter_select_items = DeleteFromArray(value, head_filter_select_items, '.head_filter .selected_filter_list');
        $('#property-list input').map((index, item) => {
            item.value == value ?
                $(item).prop('checked', false)
                : true
        }
        )

    })

    $('.btn-apply').click(function () {
        head_filter_select_items = [...multiple_select_items];
        // resetMultipleSelectModal();
        AddItemToFilterList(head_filter_select_items, '.head_filter .selected_filter_list');
        $('.fixed_modal .modal_close').click();
    })

    function AddItemToFilterList(array, selector) {
        $(selector).empty();
        array.map(item => {
            const new_filter_item = ` <li class="item">
                                       <p>${item}</p>
        <div class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8.379"
                viewBox="0 0 8 8.379">
                <defs>
                    <style>
                        .cls-1 {
                            fill: #fff
                        }
                    </style>
                </defs>
                <g id="Group_756" data-name="Group 756" transform="translate(-445 -699.658)">
                    <path id="Path_253"
                        d="M8.165 7.141L1.6.574a.733.733 0 0 0-1.037 0L.215.92a.733.733 0 0 0 0 1.037l6.567 6.567a.733.733 0 0 0 1.037 0l.346-.346a.732.732 0 0 0 0-1.037zm0 0"
                        class="cls-1" data-name="Path 253" transform="translate(445 699.299)" />
                    <path id="Path_254"
                        d="M6.782.577L.215 7.144a.733.733 0 0 0 0 1.037l.346.346a.733.733 0 0 0 1.037 0L8.165 1.96a.733.733 0 0 0 0-1.037L7.819.578A.733.733 0 0 0 6.782.577zm0 0"
                        class="cls-1" data-name="Path 254" transform="translate(445 699.296)" />
                </g>
            </svg></div>
    </li>`;
            $(new_filter_item).appendTo(selector);
        }
        )
    }

    function DeleteFromArray(value, array, selector) {
        const new_array = array.filter(item => item !== value);
        AddItemToFilterList(new_array, selector);
        return new_array;
    }

    function resetMultipleSelectModal() {
        multiple_select_items = [];
        $('.modal-bottom .selected_filter_list').empty();
        $('#multiple-select input').prop('checked', false);
    }
    //#endregion

    //#region PRODUCT VIEW
    $('.view .product-view').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('#product-list').removeClass()
        $('#product-list').addClass($(this).data('id'));
        $('#product-list .product').parent().removeClass();
        $('.list_view .product').parent().addClass('col-lg-12');
        $('.table_view .product').parent().addClass('col-lg-3 col-md-6 col-sm-12');
    })
    //#endregion

    //#region SINGLE PRODUNCT PAGE CONTENT
    // $(`.page-content`).first().fadeIn();
    $(`.page-content#price_history`).first().fadeIn();
    $('.page-list .page-item').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(`.page-content`).fadeOut(300);
        setTimeout(() => {
            $(`.page-content${$(this).data('id')}`).fadeIn();
        }, 300);
    })
    //#endregion

});