$('#kc-song').on('click', function () {
    $('.detail-media').not($('#kc-song')).hide();
    $('#toutesLesChansons').show();
    if ($('#toutesLesChansons_wrapper').size() == 0) {
        $('#toutesLesChansons').DataTable({
            responsive: true
        });
        $('#toutesLesChansons_wrapper').addClass('detail-media');
    } else {
        $('#toutesLesChansons_wrapper').show();
    }
    $('#toutesLesChansons').animate({
        opacity: '0.6'
    }, "slow");
});

$('#kc-artist').on('click', function () {
    $('.detail-media').not($('#kc-artist')).hide();
    $('#parArtiste').show();
    if ($('#parArtiste_wrapper').size() == 0) {
        $('#parArtiste').dataTable({
            "bLengthChange": false,
            "bPaginate": false
        }).rowGrouping({
            bExpandableGrouping: true,
            asExpandedGroups: [],
            iGroupingColumnIndex: 1,
            sGroupingColumnSortDirection: "asc"
        });

    } else {
        $('#parArtiste_wrapper').show();
    }
    $('#parArtiste_wrapper').addClass('detail-media');
    $('#parArtiste').animate({
        opacity: '0.6'
    }, "slow");
});

$('#kc-album').on('click', function () {
    $('.detail-media').not($('#kc-album')).hide();
    $('#parAlbum').show();
    if ($('#parAlbum_wrapper').size() == 0) {
        $('#parAlbum').dataTable({
            "bLengthChange": false,
            "bPaginate": false
        }).rowGrouping({
            bExpandableGrouping: true,
            asExpandedGroups: [],
            iGroupingColumnIndex: 2,
            sGroupingColumnSortDirection: "asc"
        });

    } else {
        $('#parAlbum_wrapper').show();
    }
    $('#parAlbum_wrapper').addClass('detail-media');
    $('#parAlbum').animate({
        opacity: '0.6'
    }, "slow");
});

$('#kc-playlist').on('click', function () {
    $('.detail-media').not($('#kc-playlist')).hide();
});

$('#kc-equalizer').on('click', function () {
    $('.detail-media').not($('#kc-equalizer')).hide();
});

$('.btn-play').on('click', function () {
    var enCours = $('.invisible').not($(this).children());
    enCours.removeClass('invisible').addClass('glyphicon-play');
    enCours.parent().show();
    if ($(this).children().hasClass('glyphicon-pause')) {
        $(this).children().removeClass('glyphicon-pause')
        $(this).children().addClass('glyphicon-play')
    } else {
        $(this).children().removeClass('glyphicon-play')
        $(this).hide();
        $(this).children().addClass('invisible')
    }
});

$('.container').on('click', function (e) {
    console.log(e.target);

});