// customize js
$(function() {
    if ($('.tag').length > 0) {
        $('.tag').each(function(index, el) {
            $(this).find('a').off().click(function(e) {
                $(this).parent().siblings('li').removeClass('active');
                $(this).parent('li').addClass('active');
                e.preventDefault();
            });
        });
    }
    var subStatus = false;
    $('.now_edit').find('.btn_change').off().click(function(e) {
        if (!subStatus) {
            $('.sub_nav').addClass('show_subNav');
            subStatus = true;
        } else {
            $('.sub_nav').removeClass('show_subNav');
            subStatus = false;
        }
        e.preventDefault();
    });
    $('.sub_nav').find('.close').off().click(function(e) {
        $('.sub_nav').removeClass('show_subNav');
        subStatus = false;
        e.preventDefault();
    });
    $(window).on('load scroll', function() {
        // var HEIGHT = $(window).scrollTop() + $('.title').innerHeight();
        var windowH = $(window).height(),
            intDis = Math.floor($('.content_block').offset().top),
            contentH = windowH - intDis,
            scrollDis = Math.floor($(window).scrollTop() - $('.title').offset().top + 10),
            blockHeight = Math.floor($('.publish_block').height());
        // console.log(windowH+','+scrollDis+','+blockHeight);
        if ($(window).scrollTop() + contentH > blockHeight && blockHeight > contentH) {
            $(".publish_block").stop().stop().delay(200).animate({ top: $(window).scrollTop() + contentH - blockHeight }, 800, 'easeOutQuint');
        } else if ($(window).scrollTop() + contentH > blockHeight && blockHeight < contentH && $(window).scrollTop() > 100) {
            $(".publish_block").stop().stop().delay(200).animate({ top: scrollDis }, 400, 'easeOutQuint');
        } else {
            $(".publish_block").stop().stop().delay(200).animate({ top: 'auto' }, 400, 'easeOutQuint').removeAttr('style');
        }
    });
    // password_toggle
    var passShow = false;
    $('.password_toggle').each(function(index, el) {
        $(this).find('.btn-icon').off().click(function(e) {
            if (!passShow) {
                $(this).children('i').removeClass().addClass('i_show');
                $(this).parents('.password_toggle').find('input[type="password"]').attr('type', 'text');
                passShow = true;
                // console.log(passShow);
            } else {
                $(this).children('i').removeClass().addClass('i_hide');
                $(this).parents('.password_toggle').find('input[type="text"]').attr('type', 'password');
                passShow = false;
                // console.log(passShow);
            }
            e.preventDefault();
        });
    });
    // sortable
    $('.sortable_list').each(function(index, el) {
        $(this).find('.btn-dropdown').off().click(function(e) {
            e.preventDefault();
            $(this).siblings('.dropdown-content').toggleClass('show');
            $(this).blur();
            e.preventDefault();
        });
    });
    // hot_tag
    $('.hot_tag .btn').off().click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault();
    });
    //upload
    $('.upload_content').hide();
    $('.btn-addfile').off().click(function(e) {
        $('.upload_content').stop().slideDown('400', 'easeOutQuint');
        e.preventDefault();
    });
    $('.upload_content').find('a.close').off().click(function(e) {
        $('.upload_content').stop().hide();
        e.preventDefault();
    });
    // photo_list
    $('.photo_list').find('.item').each(function(index, el) {
        $(this).find('input[type="checkbox"]').click(function() {
            if ($(this).prop("checked") == true) {
                $(this).parents('.item').find('.img-container').addClass('active');
                $(this).parents('.check_grp').addClass('show');
            } else if ($(this).prop("checked") == false) {
                $(this).parents('.item').find('.img-container').removeClass('active');
                $(this).parents('.check_grp').removeClass('show');
            }
        });
    });
    // folder_list
    $('.folder_list ul ul').hide();
    $('.folder_list ul li').each(function(index, el) {
        if ($(this).children('ul').length > 0) {
            $(this).addClass('li_hasChild');
        }
    });
    var lihasChildStatus = false;
    $('.li_hasChild>a').each(function(index, el) {
        $(this).off().click(function(e) {
            if (!lihasChildStatus) {
                $(this).parent('li').addClass('active open');
                $(this).next('ul').stop(true, true).slideDown('400', 'easeOutQuint');
                lihasChildStatus = true;
            } else {
                $(this).parent('li').removeClass('active open');
                $(this).next('ul').stop(true, true).slideUp('400', 'easeOutQuint');
                lihasChildStatus = false;
            }
            e.preventDefault();
        });
    });
    var folderStatus = false;
    $('.toggleOpen').off().click(function(e) {
        if (!folderStatus) {
            $(this).text('收合所有分類');
            $('.folder_list').find('.li_hasChild>a').next('ul').stop(true, true).slideDown('400', 'easeOutQuint');
            folderStatus = true;
        } else {
            $(this).text('展開所有分類');
            $('.folder_list').find('.li_hasChild>a').next('ul').stop(true, true).slideUp('400', 'easeOutQuint');
            folderStatus = false;
        }
        e.preventDefault();
    });
    //
    $('input[type="text"]').each(function(index, el) {
        if ($(this).val() !== '') {
            $(this).addClass('used');
        }
    });
    $('textarea').each(function(index, el) {
        if ($(this).val() !== '') {
            $(this).addClass('used');
        }
    });
    $('.flex-form .error').each(function(index, el) {
        $(this).find('input').addClass('used');
        $(this).find('textarea').addClass('used');
    });
    // form style
    function _labelAni(obj) {
        var $this = $(obj);
        if ($this.val()) $this.addClass('used');
        else $this.removeClass('used');
    }
    $('input').blur(function() {
        _labelAni($(this));
    });
    $('textarea').blur(function() {
        _labelAni($(this));
    });
    $('textarea').focus(function() {
        if ($(this).parents('.error').length > 0) {
            $(this).parents('.error').removeClass('error');
        }
    });
    $('.labelEffect').each(function(index, el) {
        $(this).find('select').blur(function() {
            var $this = $(this);
            $(this).find('option').first().attr('disabled', 'true');
            if ($(this).find(':selected').val() != '') {
                $this.addClass('used');
            } else {
                $this.removeClass('used');
                $(this).find(':selected').text('');
            }
        });
        $(this).find('select').focus(function() {
            var item = $(this).find('option').first();
            $(item).text('請選擇');
            $(item).removeAttr('disabled');
            $(this).removeClass('used');
        });
    });
    $(window, document, undefined).ready(function() {
        var $ripples = $('.ripples');
        $ripples.on('click.Ripples', function(e) {
            var $this = $(this);
            var $offset = $this.parent().offset();
            var $circle = $this.find('.ripplesCircle');
            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;
            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });
            $this.addClass('is-active');
        });
        $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
            $(this).removeClass('is-active');
        });
    });
    // adv_search
    if ($('.adv_search').length > 0) {
        $('.adv_search').hide();
        $('.btn-adv').off().click(function(e) {
            $('.adv_search').stop().slideToggle(400, 'easeOutCubic');
            e.preventDefault();
        });
    }
    // ripple
    var links = document.querySelectorAll('.btn');
    for (var i = 0, len = links.length; i < len; i++) {
        links[i].addEventListener('click', function(e) {
            var targetEl = e.target;
            var inkEl = targetEl.querySelector('.ink');
            if (inkEl) {
                inkEl.classList.remove('animate');
            } else {
                inkEl = document.createElement('span');
                inkEl.classList.add('ink');
                inkEl.style.width = inkEl.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
                targetEl.appendChild(inkEl);
            }
            inkEl.style.left = (e.offsetX - inkEl.offsetWidth / 2) + 'px';
            inkEl.style.top = (e.offsetY - inkEl.offsetHeight / 2) + 'px';
            inkEl.classList.add('animate');
        }, false);
    }
    var menulis = document.querySelectorAll('nav ul li a');
    for (var i = 0, len = menulis.length; i < len; i++) {
        menulis[i].addEventListener('click', function(e) {
            var targetEl = e.target;
            var inkEl = targetEl.querySelector('.ink');
            if (inkEl) {
                inkEl.classList.remove('animate');
            } else {
                inkEl = document.createElement('span');
                inkEl.classList.add('ink');
                inkEl.style.width = inkEl.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
                targetEl.appendChild(inkEl);
            }
            inkEl.style.left = (e.offsetX - inkEl.offsetWidth / 2) + 'px';
            inkEl.style.top = (e.offsetY - inkEl.offsetHeight / 2) + 'px';
            inkEl.classList.add('animate');
        }, false);
    }
    //----------------------------------------------------------版頭-----//
    var dropdownStatus = false;
    $('.dropdown-btn').each(function(index, el) {
        $(this).click(function(e) {
            $(this).siblings('.dropdown-content').addClass('show');
            dropdownStatus = true;
            $(this).blur();
            e.preventDefault();
        });
    });
    $(document).mouseup(function(e) {
        var target = e.target,
            container = $('.dropdown-content');
        if ((!container.is(e.target) && container.has(e.target).length === 0) && (!$('.dropdown-btn').is(e.target) || !$('.btn-dropdown').is(e.target))) {
            if (!(($('.dropdown-btn').is(e.target) || $('.btn-dropdown').is(e.target)) && ($(target).siblings('.show').length > 0))) {
                container.removeClass('show');
            }
        }
    });
    //----------------------------------------------------------選單控制-----//
    // 手機版關閉左側選單
    function _CLOSEMENU() {
        $('aside').removeClass('open');
        $('.overlay').removeClass('show');
        $('.wrapper').removeClass('noscroll');
        $(this).blur();
    }
    //
    $('body').append('<div class="overlay"></div>');
    $('.toggle_menu_btn').off().click(function(e) {
        $('aside').toggleClass('open');
        $('.overlay').toggleClass('show');
        $('.wrapper').toggleClass('noscroll');
        $(this).blur();
        e.preventDefault();
    });
    $('.overlay').off().click(function(e) {
        _CLOSEMENU();
        e.preventDefault();
    });
    var sideStatus = false;
    $('header').find('.toggle_menu_btn').off().click(function(e) {
        if (!sideStatus) {
            $('aside').addClass('hidden');
            $('header').addClass('full');
            $('.content').addClass('full');
            sideStatus = true;
        } else {
            $('aside').removeClass('hidden');
            $('header').removeClass('full');
            $('.content').removeClass('full');
            sideStatus = false;
        }
        if (subStatus = -true) {
            $('.sub_nav').removeClass('show_subNav');
            subStatus = false;
        }
        $('.li_hasChild>a').find('.ink').remove();
        $(this).blur();
        e.preventDefault();
    });
    //----------------------------------------------------------選單控制-----//
    $('aside').prepend('<a href="#" class="close_btn"></a>');
    // $('aside').find('.toggle_menu_btn').clone().prependTo('header');
    $('aside').find('.close_btn').off().click(function(e) {
        _CLOSEMENU();
        e.preventDefault();
    });
    // 選單控制下拉
    $('aside nav ul li').each(function(index, el) {
        if ($(this).children('ul').length > 0) {
            $(this).addClass('li_hasChild');
        }
    });
    $('aside nav ul ul').hide();
    // 設定有副選單的a
    $('.li_hasChild>a').each(function(index, el) {
        $(this).off().click(function(e) {
            $(this).parent('li').toggleClass('active open');
            $(this).parents('li').siblings().find('.ink').remove();
            $(this).parents('li').siblings().removeClass('active open').find('ul').stop(true, true).slideUp('800', 'easeOutQuint');
            $(this).next('ul').stop(true, true).slideToggle('800', 'easeOutQuint');
            e.preventDefault();
        });
    });
});
$(function() {
    $('.mp_widget .counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
            duration: 5000,
            easing: 'linear',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
                //alert('finished');
            }
        });
    });
});
//tab
$(function() {
    // Variables
    var clickedTab = $(".tab_items > .active");
    var tabWrapper = $(".tab__content");
    var activeTab = tabWrapper.find(".active");
    var activeTabHeight = activeTab.outerHeight();
    activeTab.show();
    tabWrapper.height(activeTabHeight);
    // 按鈕事件
    $(".tab_items > button").on("click", function() {
        $(".tab_items > button").removeClass("active");
        $(this).addClass("active");
        clickedTab = $(".tab_items .active");
        activeTab.fadeOut(100, function() {
            $(".tab__content > div").removeClass("active");
            var clickedTabIndex = clickedTab.index();
            $(".tab__content > div").eq(clickedTabIndex).addClass("active");
            activeTab = $(".tab__content > .active");
            activeTabHeight = activeTab.outerHeight();
            tabWrapper.stop().delay(0).animate({ height: activeTabHeight }, 500, function() {
                activeTab.stop().delay(50).fadeIn(100);
            });
        });
    });
    if ($('.right_sidebar').length > 0) {
        $('.btn-module-choose').off().click(function(e) {
            $('.right_sidebar').removeClass('show');
            $('.template_choose').addClass('show');
            e.preventDefault();
        });
        $('.btn-grid-choose').off().click(function(e) {
            $('.right_sidebar').removeClass('show');
            $('.grid_choose').addClass('show');
            e.preventDefault();
        });
        $('.right_sidebar').find('._head a.close').off().click(function(e) {
            $(this).parents('.right_sidebar').removeClass('show');
            e.preventDefault();
        });
    }
});


// Lize 
$(function(){
    // 最新消息
    $('#switch_news').click(function(event) {
        $('#news').slideDown(200);
    });
    $('#close').click(function(event) {
        $(this).parents('#news').slideUp(200);
    });

    // 字級
    $('.font_size').find('.medium').addClass('active');

    $('.font_size').find('.small').click(function(event) {
        $('.font_size').find('a').removeClass('active');
        $(this).addClass('active');
        $('.main').removeClass('large_size').addClass('small_size');
    });

    $('.font_size').find('.medium').click(function(event) {
        $('.font_size').find('a').removeClass('active');
        $(this).addClass('active');
        $('.main').removeClass('large_size').removeClass('small_size');
    });

    $('.font_size').find('.large').click(function(event) {
        $('.font_size').find('a').removeClass('active');
        $(this).addClass('active');
        $('.main').removeClass('small_size').addClass('large_size');
    });

    // 當._head 內，只有一個div && classname = .quick_btn
    var $item = $('._content > ._head div').length,
        $btn = $('.quick_btn');
    if ( $item == 1 && $('div').hasClass('quick_btn') ) {
        // alert('符合');
        $('._content > ._head').css("flex-flow", "row-reverse wrap");
    }

    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    // $('.tabSet2 .tabItem').find('h2:first-child').addClass('active');
    // $('.tabContent').find('.box:first-child').addClass('show');
    // $('.tabSet2 .tabItem h2').click(function(){
    //     // 提取被點選的 .tabItem h2 的 index
    //     // 把 .show 丟到對應的 .tabContent 的 index
    //     // alert('有');
    //     var $index = $( ".tabItem h2" ).index( this ),
    //         $now = $index +1;
    //     // $( ".tabSet2 span" ).text( "That was div index #" + index );
    //     $('.tabItem h2').removeClass('active');
    //     $('.tabContent .box').removeClass('show')
    //     $(this).addClass('active');
    //     // 第 index 個 div 塞入 show
    //     $('.tabContent .box:nth-child('+$now+')').addClass('show');
    // });
    
    $('.tabs').find('h2:first-child').addClass('active');
    $('.tabs').find('.box:first-child').addClass('show');

    $('.tabItem h2').on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).siblings('h2').removeClass('active');
            $(this).addClass('active');
        }

        if(!$(this).parent().next('.tabContent').find('.box').eq($(this).index()).hasClass('show')) {
            $(this).parent().next('.tabContent').find('.box').removeClass('show');
        } 
        $(this).parent().next('.tabContent').find('.box').eq($(this).index()).addClass('show');
    });

    
    /*-----------------------------------*/
    /////////////modal設定/////////////
    /*-----------------------------------*/
    $(function() {
        $('.modal').hide();                                                                //先隱藏視窗
        $('.modal').after('<div class="modal_overlay"></div>');                             //新增透明底
        $('.modal').prepend('<button type="button" class="close">關閉</button>');            //新增關閉按鈕
        $('.modal_overlay').hide();                                                         //隱藏透明底
        //按鈕動作
        $('.openModal').click(function(e) {
            $('.modal_overlay').fadeIn(100);
            $('.modal').fadeIn(100);
            $('body').addClass('noscroll');
            e.preventDefault();
        });
        //關閉function
        function closeModal(){
            $('.modal').hide();
            $('.modal_overlay').hide();
            $('body').removeClass('noscroll');
        }
        //點選關閉按鈕及透明底都可關閉
        $('.modal_overlay').click(closeModal);
        $('.modal .close').click(closeModal);

    });

    /*-----------------------------------*/
    /////////////展開收合/////////////
    /*-----------------------------------*/
    $('.add_form .switch').click(function() {
        // alert('有');
        $(this).parents('.result').siblings('.form_box').toggle();
    });

    $('.quick_btn .switch').click(function(){
        // alert('有');
        $(this).parents('.quick_btn').siblings('.show_box').toggle();
    });

    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop').click(function(e) {
        $('html, body').animate({ scrollTop: 0 }, 400, 'easeOutExpo');
        e.preventDefault();
    });
    $('.scrollToTop').keydown(function(e) {
        _body.find('a:first').focus();
        e.preventDefault();
    });

    /*--------------------------------------------*/
    ///////////////燈箱slick+lightBox組合////////////
    /*--------------------------------------------*/
    $('.cp_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        lazyLoad: 'ondemand',
        ease: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
    $('.cp_slider').slickLightbox({
        caption: 'caption',
        lazyLoad: 'ondemand',
        useHistoryApi: 'true',
        ease: 'ease',
        lazy: true
    });
})








