$(function () {
    //$('#').hide();
    $('#interactionMenu').hide();
    $('#audioMenuWrapper').hide();
    // Create an event handler.
    $('#mediaCarousel .kc-item').bind('mousemove', function (evt) {
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
        // image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
        // description div.
        $('#mediaName').text($img.attr('alt'));

    });

    /*$('#playlistCarousel .kc-item').bind('mousemove', function (evt) {
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
        // image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
        // description div.
        if ($img.attr('alt') === '') {
            $('#lectureName').text("- pas d'information -")
        } else {
            ($('#lectureName').text($img.attr('alt')));
        }

    });*/

    // Create an event handler.
    $('#mediaCarousel .kc-item').bind('touchmove', function (evt) {
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
        // image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
        // description div.
        $('#mediaName').text($img.attr('alt'));

    });

    /*$('#playlistCarousel .kc-item').bind('touchmove', function (evt) {
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
        // image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
        // description div.
        if ($img.attr('alt') === '') {
            $('#lectureName').text("- pas d'information -")
        } else {
            ($('#lectureName').text($img.attr('alt')));
        }

    });*/


    $('#mediaCarousel').KillerCarousel({
        // Default natural width of carousel.
        width: 850,
        // Item spacing in 3d (has CSS3 3d) mode.
        spacing3d: 280,
        // Item spacing in 2d (no CSS3 3d) mode.
        spacing2d: 100,
        showShadow: false,
        showReflection: true,
        infiniteLoop: true,
        autoScale: 100
    });

   /* $('#playlistCarousel').KillerCarousel({
        // Default natural width of carousel.
        width: 800,
        // Item spacing in 3d (has CSS3 3d) mode.
        spacing3d: null,
        renderer3d: null,
        renderer2d: 'render2dBasic',
        // Item spacing in 2d (no CSS3 3d) mode.
        spacing2d: 200,
        showShadow: false,
        showReflection: true,
        infiniteLoop: false,
        autoScale: 60,
        itemAlign: top,
        fadeEdgeItems: true
    });

    $('.playlist').children('.kc-wrap').css('background-image', 'none');
    $('.playlist').css('padding', '5px 5px 5px 5px');*/

    //media servers icons focus when hover and clicked on


    $('.icon').on('click', function () {
        $('.icon').css("opacity", "0.5");
        $(this).css("opacity", "1");
    });


    $('#audio').on('click', function () {
        $('#audioMenuWrapper').show();
        $('#audioMenu').animate({
            height: '45px'
        });
        $('.menu-item').animate({
            opacity: '0.6'
        }, "slow");
    });


    $('.menu-item').on('click', function () {
        $('#medias').css('display', 'none');
        $('.menu-item').css("opacity", "0.3");

        var top = $("#audioMenuWrapper").position().top;
        console.log(top);
        $('#medias').animate({
            opacity: 0
        });
        $("#medias").css("heigth", "0");
        $("#audioMenuWrapper").css("top", top);
        $('#audioMenuWrapper').animate({
            top: '200px'
        });
        $('.menu-item').animate({
            'margin-top': '0.7%'
        })

        $('.menu-item img').animate({
            'height': '50%',
            'width': '50%',
            'margin': '0',
            'background-color': 'green'
        })

        getToScreen($(this).attr('id'));
    });

    //function that displays the music browser by the right category
    function getToScreen(type) {
        $("#" + type).css("opacity", "1");


    }


});