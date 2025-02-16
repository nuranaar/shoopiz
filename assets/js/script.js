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
    $('.search-form .search-input').focus(function () {
        if ($(document.body).width() < 1024) {
            closeMobileMenu();
        }
    });

    $('.search-form .search-input').keyup(function () {
        const value = $(this).val();
        if (value.length > 0 && value.trim() != '') {
            OpenSearchList();
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        }
        else {
            CloseSearchList()
        }
    })

    $('.search-form .search-input').blur(function () {
        CloseSearchList()
    })

    $('.search-show').click(function () {
        $('.search-form').toggleClass('show')
        $('#nav-menu').toggleClass('show')
    })

    function CloseSearchList() {
        $('.search-result-list ').removeClass('active');
        $('.search-overlay').removeClass('active');
    }
    function OpenSearchList() {
        $('.search-overlay').addClass('active');
        $('.search-result-list ').addClass('active');
    }
    $('.search').click(function () {
        $('.header-search').slideToggle()
    })
    //#endregion 

    //#region NAV MANU
    if (window.outerWidth > 1024) {
        $('.sub-categories .list').first().fadeIn();
        $('.categories-list li').click(function () {
            $(`.sub-categories .list`).fadeOut(200);
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            setTimeout(() => {
                $(`.sub-categories ${$(this).data("id")}`).fadeIn();
            }, 200);
        });
    }
    //#endregion

    //#region HEAHER ON SCROLL
    let scrollHeight;
    if (!$('header').hasClass('scroll-header')) {
        scrollHeight = $('header').innerHeight();
    }
    $(window).scroll(function () {
        const currentScroll = $(this).scrollTop();
        if (currentScroll > scrollHeight) {
            $('header').addClass('scroll-header');
            $('.page').addClass('page-onscroll')
        } else {
            $('header').removeClass('scroll-header')
            $('.page').removeClass('page-onscroll')
        }
    });

    //#endregion

    //#region MODAL
    $('.multiple_select_modal_show').click(function () {
        $('body').css('overflow', 'hidden')
        $($(this).data('id')).addClass('show');
        $($(this).data('id')).attr('data-prop_id', $(this).data('prop_id'));
    });
    $('.fixed_modal_show').click(function () {
        $('body').css('overflow', 'hidden')
        $($(this).data('id')).addClass('show');
    });
    $('.fixed_modal .modal_close').click(function () {
        $('body').css('overflow', 'auto')
        $(this).parents(".fixed_modal").removeClass('show');
        resetModalOnClose();
    })
    //#endregion

    //#region SELECTED FILTER LIST

    let head_filter_select_items = [];
    let multiple_select_items = [];

    function checkDisplayOrNot() {
        console.log(multiple_select_items.length);
    }
    $('#property-list input').change(function () {
        const value = $(this).val();
        if ($(this).is(":checked")) {
            multiple_select_items.push(value);
            AddItemToFilterList(multiple_select_items, '.modal_bottom .selected_filter_list')
        }
        else {
            multiple_select_items = DeleteFromArray(value, multiple_select_items, '.modal_bottom .selected_filter_list')
        }
    })

    $(document).on('click', '.item .delete', function () {
        const value = $(this).prev().text().trim();
        multiple_select_items = DeleteFromArray(value, multiple_select_items, '.modal_bottom .selected_filter_list');
        head_filter_select_items = DeleteFromArray(value, head_filter_select_items, '.head_filter .selected_filter_list');
        $('#property-list input').map((index, item) => {
            item.value == value ?
                $(item).prop('checked', false)
                : true
        }
        )
    })

    if ($('.filter').length) {
        $('.btn-apply').click(function () {
            head_filter_select_items = [...multiple_select_items];
            AddItemToFilterList(head_filter_select_items, '.head_filter .selected_filter_list');
            $('.fixed_modal .modal_close').click();
            $(`.property[data-prop_id='${$('.fixed_modal').data('prop_id')}'`).fadeOut();
        });
    }


    $('.add-filter').click(function () {
        $(".filter-mobile").slideDown('slow');
    })


    $('.property .property-value input[type="checkbox"]').change(function () {
        const value = $(this).val();
        if ($(this).is(":checked")) {
            head_filter_select_items.push(value);
            if ($(this).parents(".filter").length) {
                $(this).parents('.property-value').siblings().find('input[type="checkbox"]').prop('checked', false);
                AddItemToFilterList(head_filter_select_items, '.head_filter .selected_filter_list')
                $(this).parents('.property').fadeOut();
            }
        }
        else {
            head_filter_select_items = DeleteFromArray(value, head_filter_select_items, '.head_filter .selected_filter_list');
            $(this).prop('checked', false)
        }
        console.log('khsbc', head_filter_select_items)
    });

    $('.apply-filter').click(function () {
        $(".filter-mobile").slideUp('slow');
        AddItemToFilterList(head_filter_select_items, '.head_filter .selected_filter_list');
    });
    $('.close-filter').click(function () {
        $(".filter-mobile").slideUp('slow');
    })

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
    });
    if ($("#product-list").length) {
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                let row = $("<div></div>");
                row.addClass("row");

                for (var i = 0; i < 4; i++) {
                    row.append(`<div class="col-lg-3 col-md-6 col-6">
                                <div class="product">
                                    <div class="img">
                                        <img src="./assets/img/iphone.png" alt="">
                                    </div>

                                    <div class="product-title">
                                        <p class="brand">Apple</p>
                                        <p class="model">iPhone 11 Pro 64 GB - Dual SIM
                                            Midnight Green</p>
                                    </div>
                                    <ul class="price-list">
                                        <li>
                                            <a href='#' class="store">maxi.az</a>
                                            <p class="price">1.350 AZN</p>
                                        </li>
                                        <li>
                                            <a href='#' class="store">maxi.az</a>
                                            <p class="price">1.350 AZN</p>
                                        </li>
                                        <li>
                                            <a href='#' class="store">maxi.az</a>
                                            <p class="price">1.350 AZN</p>
                                        </li>
                                    </ul>
                                    <div class="product-info">
                                        <div class="price-range">
                                            <p class="store-count">6 mağazada var</p>
                                            <p class="range">
                                                599.00-1349.00 AZN</p>
                                        </div>
                                        <a href="/single-product.html" class="learn-more">
                                            ƏTRAFLI BAX
                                            <img src="./assets/img/icons/left.svg" alt="">
                                        </a>
                                    </div>
                                </div>
                            </div>`)
                }

                $("#product-list").append(row);
            }
        });
    }


    //#endregion

    //#region SINGLE PRODUNCT PAGE CONTENT

    $(`.page-content`).first().fadeIn();
    // $(`.page-content#price_history`).fadeIn();
    $('.page-list .page-item').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(`.page-content`).fadeOut(300);
        setTimeout(() => {
            $(`.page-content${$(this).data('id')}`).fadeIn();
        }, 300);
    })

    //#endregion

    //#region SELECT STARS

    $('.select-stars li').click(function () {
        $(this).siblings().removeClass('selected');
        $(this).prevAll().addClass('selected');
        $(this).addClass('selected');
        starCount()
    });


    //#endregion

    //#region FUNCTIONS
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

    function resetModalOnClose() {
        multiple_select_items = [];
        $('.modal_bottom .selected_filter_list').empty();
        $('.fixed_modal input').prop('checked', false);
        $('.fixed_modal input, .fixed_modal textarea').val('');
        $('.select-stars li').removeClass('selected');
        starCount();
    }

    function starCount() {
        let count = $('.select-stars li.selected').length;
        let label;
        switch (count) {
            case 1:
                label = 'Çox pis';
                break;
            case 2:
                label = 'Pis';
                break;
            case 3:
                label = 'Normal';
                break;
            case 4:
                label = 'Yaxşı';
                break;
            case 5:
                label = 'Çox yaxşı';
                break;
            default:
                label = '';
                break;
        }
        $('input[name="stars"]').val(count);
        $('.star-count span').text(count);
        $('.select-stars .label').text(label);

    }

    // FUNCTOIN FOR SEARCH LOADER
    // **data => true or false
    function SearchLoading(data) {
        if (data) {
            $('.search-loading').addClass('show')
        } else {
            $('.search-loading').removeClass('show')
        }
    }

    //#endregion

    //#region MOBILE MENU
    $('.menu').click(function () {
        openMobileMenu(this);
    });

    function openMobileMenu(elem) {
        $(elem).fadeOut(200);
        setTimeout(() => {
            $('.close_menu').fadeIn()
        }, 200);
        $('.mobile-menu').slideDown();
    }

    function closeMobileMenu() {
        $(".close_menu").fadeOut(200);
        setTimeout(() => {
            $('.menu').fadeIn()
        }, 200);
        $('.mobile-menu').slideUp()
    }

    $('.close_menu').click(function () {
        closeMobileMenu();
    });


    $('.mobile-menu .menu-item').click(function () {
        $(this).parent().siblings().find('.menu-item').removeClass('active');
        $(this).parent().siblings().find('.sub-menu').slideUp();
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    })
    //#endregion

    //#region SCROLL TOP
    $(window).scroll(function () {
        const currentScroll = $(this).scrollTop();
        if (currentScroll > 500) {
            $('.scroll-top').addClass('show')
        }
        else {
            $('.scroll-top').removeClass('show')
        }
        // console.log($(this).scrollTop(500))
    })
    $('.scroll-top').click(function () {
        $("html, body").animate({
            scrollTop: '0'
        });
    })

    //#endregion

    //#region CHART

    let ctx = $('#chart #chartCanvas');
    if (ctx.length) {
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4],
                datasets: [{
                    data: [30, 20, 40],
                    backgroundColor: [
                        'transparent'
                    ],
                    borderColor: [
                        '#ee9221'
                    ],
                    borderWidth: 5,
                    pointRadius: 0
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false,
                },

            },
        });
    }


    //#endregion

    //#region 

    if ($('#notify-me-form').length) {
        $.validate({
            form: '#notify-me-form',
            modules: 'security',
            onError: function ($form) {
                console.log($form);
                // alert('Validation of form ' + $form.attr('id') + ' failed!');
            },
            onSuccess: function ($form) {
                $('.fixed_modal .modal_close').click();
                Swal.fire(
                    'Təşəkkürlər!',
                    'Hər hansı mağaza axtardığınız qiyməti təklif etdikdə sizə məlumat veriləcəkdir',
                    'success'
                )
                return false;
            }
        });
    }

    if ($('#add-comment-form').length) {
        $.validate({
            form: '#add-comment-form',
            modules: 'security',
            onError: function ($form) {
                console.log($form);
                // alert('Validation of form ' + $form.attr('id') + ' failed!');
            },
            onSuccess: function ($form) {
                $('.fixed_modal .modal_close').click();
                Swal.fire(
                    '',
                    'Rəyiniz üçün təşəkkürlər!',
                    'success'
                )
                return false;
            }
        });
    }
    //#endregion

    if ($("#search-properties .more").length) {
        $("#search-properties .more").click(function () {
            $(this).prev().find(".with-more").slideToggle();
        });
    }

    if ($(".more-btn").length) {
        $(".more-btn").click(function (e) {
            e.preventDefault();
            $($(this).attr("href")).addClass("show");
            $(this).parent().hide();
            $(this).parent().parent().addClass("mb-2");
        });
    }
});