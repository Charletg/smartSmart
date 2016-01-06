$(function () {
    //$('#').hide();
    $('#interactionMenu').hide();
    $('#audioMenuWrapper').hide();
    $('.icon').css("opacity", "0.5");
    $('.icon').first().css("opacity", "1");
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

    //media servers icons focus when hover and clicked on


    $('.icon').on('click', function () {

            $('.icon').removeClass('selection');
            $('.icon').css("opacity", "0.5");
            $(this).addClass('selection');
            $(this).css("opacity", "1");

        $('#toutesLesChansons').DataTable().clear();
        $('#parArtiste').DataTable().clear();
        $('#parAlbum').DataTable().clear();

            var item = new Array();

            for (var i = 0; i<20; i++)
            {
                item[i] = new Array('truc' + i, 'toto' + i, 'album du siecle' + i)

                $('#toutesLesChansons').dataTable().fnAddData([
                    item[i][0]+'<a href="#" class="btn btn-default btn-play pull-right"><i class="glyphicon glyphicon-play"></i></a>',
                    item[i][1],
                    item[i][2]
                ]);
                $('#parArtiste').dataTable().fnAddData([
                    item[i][0]+'<a href="#" class="btn btn-default btn-play pull-right"><i class="glyphicon glyphicon-play"></i></a>',
                    item[i][1]+'<a href="#" class="btn btn-default btn-play pull-right"><i class="glyphicon glyphicon-play"></i></a>',
                    item[i][2]
                ]);
                $('#parAlbum').dataTable().fnAddData([
                    item[i][0]+'<a href="#" class="btn btn-default btn-play pull-right"><i class="glyphicon glyphicon-play"></i></a>',
                    item[i][1],
                    item[i][2]+'<a href="#" class="btn btn-default btn-play pull-right"><i class="glyphicon glyphicon-play"></i></a>'
                ]);
            }
            $('#parArtiste_wrapper').hide();
            $('#parAlbum_wrapper').hide();

    });


    $('.kc-item').on('click', function () {
        if ($(this).attr('id') != "audio") {
            $('#audioMenuWrapper').animate({
                opacity: 0
            });
            //
            $('#audioMenu').css("height", "0px");
            $('#audioMenuWrapper').hide();
        }
    });

    $('#audio').on('click', function () {
        $('#audioMenu').css("height", '100px');
        $('#audioMenuWrapper').show();
        $('#audioMenuWrapper').animate({
            opacity: '0.8'
        });


    });




    $('.menu-item').on('click', function () {

        //   $('#medias').css('display', 'none');

        if (window.innerWidth < 768) {
            $('#logo').animate({
                opacity: 0
            });
        }

        $('#medias').animate({
            opacity: 0
        });
        $("#medias").animate({
            height: '0px',
            margin: 0,
            padding: 0
        });


        $("medias").hide();
        $('.menu-item').css("opacity", "0.3");

        $('.menu-item img').animate({
            'width': '20%',
            'margin': '0',
            'background-color': 'green'
        })
        $('#audioMenuWrapper').animate({
            'padding-top': '10px',
            'padding-bottom': '20x',
            'background-color': 'green',
            'height': '50px'
        })

        if ($("#back").css("opacity") == 0) {
            if (window.innerWidth >= 770) {
                var arrow_pos = $(".container").css('margin-left').replace("px", "") - 25;
                console.log(arrow_pos);
                $('#back').animate({
                    left: arrow_pos,
                    opacity: 0.6
                }, "slow");
            } else {
                $('#back').animate({
                    opacity: 0.6,
                    left: '20px'
                });
            }

        }
        $(this).css("opacity", "1");


    });

    window.addEventListener("resize", replaceArrow);

    function replaceArrow() {
        if (window.innerWidth >= 770) {
            if ($("#back").css("opacity") != 0) {
                var arrow_pos = $(".container").css('margin-left').replace("px", "") - 25;
                console.log(arrow_pos);
                $("#back").css("left", arrow_pos);
            }
        } else {
            $("#back").css("top", '50px');
            $("#back").css("left", '50px');
        }
    }


    $('#back').on('click', function () {
        if ($('#back').css("opacity") != 0) {
            getBackToAudio();
        }
    });

    function getBackToAudio() {
        $('.detail-media').hide();


        if (window.innerWidth < 768) {
            $('#logo').animate({
                opacity: 1
            });
        }
        $("#medias").removeAttr('style');
        $("#medias").show();
        $('#media').css("opacity", "0");
        $('#medias').animate({
            opacity: "1"
        });
        $('.menu-item').css("opacity", "1");

        $('.menu-item img').removeAttr('style');

        $('#audioMenuWrapper').removeAttr('style');
        $('#audioMenuWrapper').css("opacity", "0");
        $('#audioMenuWrapper').animate({
            opacity: "0.8"
        });

        $("#back").animate({
            opacity: 0,
            left: 0
        });



    }



});