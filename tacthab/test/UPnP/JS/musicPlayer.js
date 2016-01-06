$(function () {

    $("#playpause").attr("src", "./ASSETS/MUSICPLAYER/pause.png");

    $('#playpause').on('click', function () {
        if ($(this).attr('src') == "./ASSETS/MUSICPLAYER/pause.png") {
            pauseTheSong();
        } else {
            playTheSong();
        }
    });

    $('#stop').on('click', function () {
        stopTheSong();
    });

    $('.btn-play').on('click', function () {
        console.log("SIBLINGS");
        console.log($(this).parent().text());
        playSong($(this).parent().text(), $(this).parent().parent().children().eq(1).text());
    });

    function playSong(song, artist) {
        $('#musicPlayer').css({
            'border-style': 'inset',
            'border-color': 'blueviolet',
            'border-bottom-style': 'none'
        });
        $('#musicPlayer').animate({
            height: '50px'
        });
        $('#controlButtons').animate({
            opacity: 1
        });
        $("#song").empty();
        $("#artist").empty();
        $("#song").append(song);
        $("#artist").append(artist);
    };

    function pauseTheSong() {
        $("#playpause").attr("src", "./ASSETS/MUSICPLAYER/play.png");
    };

    function playTheSong() {
        $("#playpause").attr("src", "./ASSETS/MUSICPLAYER/pause.png");
    };

    function stopTheSong() {
        $('#controlButtons').animate({
            opacity: 0
        });
        $('#musicPlayer').animate({
            height: '0px'
        });
        $('#musicPlayer').css({
            'border-style': 'none',
            'border-color': 'none',
            'border-bottom-style': 'none'
        });
        var enCours = $('.invisible').not($(this).children());
        enCours.removeClass('invisible').addClass('glyphicon-play');
        enCours.parent().show();

    }

});