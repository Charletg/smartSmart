$(function() {
	
    // Create an event handler.
    $('#mediaCarousel .kc-item').bind('mousemove',function(evt){
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
		// image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
		// description div.
        $('#mediaName').text($img.attr('alt'));
        
    });
    
    $('#playlistCarousel .kc-item').bind('mousemove',function(evt){
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
		// image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
		// description div.
        if ($img.attr('alt')===''){$('#lectureName').text("- pas d'information -")} else {($('#lectureName').text($img.attr('alt')));}
        
    });
    
    // Create an event handler.
    $('#mediaCarousel .kc-item').bind('touchmove',function(evt){
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
		// image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
		// description div.
        $('#mediaName').text($img.attr('alt'));
        
    });
    
    $('#playlistCarousel .kc-item').bind('touchmove',function(evt){
        // Get a reference to the image in the carousel item.
        // Note, we look for one with alt attribute, as the shadow is also an
		// image.
        var $img = $(this).find('[alt]');
        // Pull the text out of the alt attribute and insert into text
		// description div.
        if ($img.attr('alt')===''){$('#lectureName').text("- pas d'information -")} else {($('#lectureName').text($img.attr('alt')));}
        
    });
    


	
    $('#mediaCarousel').KillerCarousel({
        // Default natural width of carousel.
        width: 800,
        // Item spacing in 3d (has CSS3 3d) mode.
        spacing3d: 280,
        // Item spacing in 2d (no CSS3 3d) mode.
        spacing2d: 100,
        showShadow: false,
        showReflection: true,
        infiniteLoop: true,
        autoScale: 100
    });
    
    $('#playlistCarousel').KillerCarousel({
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
        infiniteLoop: true,
        autoScale: 80,
        itemAlign: top,
        fadeEdgeItems: true
    });
    
    $('.playlist').children('.kc-wrap').css('background-image', 'none'); 
    $('.playlist').css('padding', '5px 5px 5px 5px');

});