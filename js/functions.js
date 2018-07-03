if (typeof Object.create !== 'function') {
    Object.create = function (a) {
        function F() {
        };F.prototype = a;
        return new F()
    }
}

/*========================================================================================
 * AvertaScroll2top v1.02. | Copyright (c) averta | http://averta.net
 *========================================================================================*/
;(function ($) {
    var Scroll = {
        init: function (el, options) {
            //cache this
            var self = this;
            self.options = $.extend({}, $.fn.avertaScroll2top.defaultOptions, options || {});
            // Access to jQuery and DOM versions of element
            self.$el = $(el);
            self.el = el;

            self.setup();
        },
        setup: function () {
            var self = this;
            if (self.options.autoFade && (self.$el.data("autofade") != false)) self.autofade();
            self.$el.on("click", function () {
                $('body,html').animate({scrollTop: 0}, self.options.speed, self.options.ease);
                return false;
            });
        },
        autofade: function () {
            var self = this;
            //hide btn on init
            if (window.scrollY < self.options.offset) {
                self.$el.fadeOut(0);
            }
            $(window).scroll(function () {
                if ('pageXOffset' in window) {  // all browsers, except IE before version 9
                    var topOffset = window.pageYOffset;
                }
                else {      // Internet Explorer before version 9
                    var topOffset = document.documentElement.scrollTop;
                }
                if (topOffset > self.options.offset) {
                    self.$el.fadeIn(self.options.fadeDuration);
                } else {
                    self.$el.fadeOut(self.options.fadeDuration);
                }
            });
        }
    };

    $.fn.avertaScroll2top = function (options) {
        return this.each(function () {
            var scroll = Object.create(Scroll);
            scroll.init(this, options);
        });
    };

    $.fn.avertaScroll2top.defaultOptions = {
        speed: 200,                   // scroll duration in millisecond
        fadeDuration: 400,            // btn fade duration in millisecond
        ease: 'linear',              // scroll easing
        offset: 100,                  // the distance in pixel to autoFade the btn
        autoFade: true                // specify whether fade the element when scroll offset passed
    };
})(jQuery);

/* ================== init.superfish.js =================== */
;(function ($) {
    /*--------------------------------------------
     *   superfish menu init
     *--------------------------------------------*/
    function init_superfish(speed, delay, fade) {
        var animEff = {opacity: 'show', height: 'show'};
        if (fade) animEff.opacity = 'show';
        $('ul.sf-menu').superfish({
            delay: delay,    // one second delay on mouseout
            animation: animEff,  // fade-in and slide-down animation
            speed: speed,    // faster animation speed
            autoArrows: true,     // disable generation of arrow mark-up
            dropShadows: false     // disable drop shadows
        });
    }

    init_superfish('fast', 100, true);
})(jQuery);

/* ================== init.averta.js =================== */
;(function ($) {
    /*--------------------------------------------
     *  Averta plugins
     *--------------------------------------------*/
    $(".scroll2top").avertaScroll2top({ease: 'easeInOutQuint', speed: 800});
})(jQuery);

/* ================== click.js =================== */
;(function ($) {
    $('.nav-toggle').unbind('click')
        .bind('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $('nav#access .sf-menu').animate({height: 'toggle'});
        });
})(jQuery);

// position callout button in safari
;(function ($) {
    if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) return;
    var $callout = $('div.callout');
    var $btn = $callout.find('.featured_btn');
    var $label = $btn.find('span');

    function updateCalloutBtnPosition() {
        var topPos = ($btn.height() - $label.height()) * 0.5;
        $label.css('top', topPos);
    }

    updateCalloutBtnPosition();
    $(window).bind("resize", updateCalloutBtnPosition);
})(jQuery);

//提示消息框
function tip(options) {
    var conf = {
        html: "<div class=\"wj-tips\" id=\"__ID__\"><div class=\"box\"><div class=\"shade\"><\/div><p>__TEXT__<\/p><\/div><\/div>",
        text: '提示',
        url: '',
        reload: false,
        time: 3000,
        id: new Date().valueOf()
    };
    if (typeof options == "string") {
        conf.text = options;
    } else {
        conf = $.extend(conf, options);
    }

    $('body').append(conf.html.replace('__TEXT__', conf.text).replace('__ID__', conf.id));
    $('#' + conf.id).fadeIn(500);
    if (conf.url) {
        $.URL.url(conf.url);
        conf.reload = true;
    }
    setTimeout(function () {
        if (conf.reload) {
            $.URL.reload();
        } else {
            $('#' + conf.id).fadeOut(1000, null, function () {
                $(this).remove();
            });
        }
    }, conf.time);
}

//对浮点数格式化，防止出现0.99999998的现象(f为浮点数，size中保留小数位数)
function formatfloat(f, size) {
    var tf = f * Math.pow(10, size);
    tf = Math.round(tf + 0.000000001);
    tf = tf / Math.pow(10, size);
    return tf;
}

function currentNenu(id) {
    $('.sf-menu li').removeClass('current-menu-item');
    $('#' + id).addClass('current-menu-item');
}



