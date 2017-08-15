$.jribbble.setToken('06cf95687ae5bf5ea006aa0a1046f10561f68c2de1c6eb5be4a5b8bc298df717');

$.jribbble.users(dribbbleUsername).then(function(user) {
    var htmlProfile = [];
    var htmlFooter = [];

    htmlProfile.push('<a class="user-link" href="' + user.html_url + '" target="_blank">');
    htmlProfile.push('<img class="avatar" src="' + user.avatar_url + '"></a>');
    htmlProfile.push('<h2>' + user.name + '</h2>');
    htmlProfile.push('<p>' + user.bio + '</p>');
    htmlProfile.push('<p>' + user.location + '</p>');

    htmlFooter.push('<p> &copy; Copyright ' + user.name + ' / ' + new Date().getFullYear() + ' / Powered by <a href="http://benched.site">Benched</a></p>' )

    $('.profile').html(htmlProfile.join(''));
    $('footer').html(htmlFooter.join(''));

});

$.jribbble.users(dribbbleUsername).shots({per_page: shotsOnPage}).then(function(shots) {
    var htmlShots = [];

    shots.forEach(function(shot) {
    	var images = shot.images;
    	// If a hidpi image is available use that, if not fall back to the normal image
		var img = (images.hidpi) ? images.hidpi : images.normal;
		
        // See the Dribbble docs for all available shot properties.
        htmlShots.push('<li class="shot-item">');
        htmlShots.push('<a href="' + shot.html_url + '">');
        htmlShots.push('<img class="item" src="' + img + '"/>')
        htmlShots.push('</a></li>');
    });

    $('.shots-container').html(htmlShots.join(''));
});

function showImages(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).addClass("fadeIn");
        }
    });
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
    showImages('.item');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
    showImages('.item');
});
