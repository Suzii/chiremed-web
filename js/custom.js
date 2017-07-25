jQuery(document).ready(function() {
  // initialize carousel
  $('#carouselDental').carousel();

  // initialize lightbox
  if(lightbox) {
    lightbox.option({
      alwaysShowNavOnTouchDevices: true,
      albumLabel: 'Obrázok %1 z %2',
      disableScrolling: true,
      positionFromTop: 120
    });

  }

  // initilaize gmaps
  Wrap.initializeMaps();

  // initialize smooth scroll and nav selector
  $(document).on("scroll", onScroll);

  //smoothscroll
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function () {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var target = this.hash,
    menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-75
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.navbar-default .navbar-nav>li>a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.navbar-default .navbar-nav>li>a').removeClass("active");
        currLink.addClass("active");
      }
      else{
        currLink.removeClass("active");
      }
    });
  }


  //this code is for animation nav
  jQuery(window).scroll(function() {
    var windowScrollPosTop = jQuery(window).scrollTop();

    if(windowScrollPosTop >= 150) {
      jQuery(".top-header img.logo").css({"margin-top": "5px", "margin-bottom": "5px"});
      jQuery(".navbar-default").css({"margin-top": "-12px",});
    }
    else{
      jQuery(".top-header img.logo").css({"margin-top": "8px", "margin-bottom": "8px"});
      jQuery(".navbar-default").css({"margin-top": "0px", "margin-bottom": "0"});
    }
  });
});

var Wrap = Wrap || {};

Wrap.initializeMaps = function() {
  var coordinates, title, content;
  var $mapStomatologia = document.getElementById('map-stomatologia');
  if($mapStomatologia) {
    coordinates = {lat: 49.404459, lng: 18.624745};
    title = 'Chiremed - Stomatologická ambulancia';
    content = '<div class="mapInfoWindow"><h1> '+ title + '</h1> <p><strong>MDDr. Marek Janík</strong></p><p>Rudolfa Jašíka 55, 02354, Turzovka</p></div>';
    Wrap.createMapWithMarker(coordinates , $mapStomatologia , title, content);
  }

  var $mapReumatologia = document.getElementById('map-reumatologia');
  if($mapReumatologia) {
    coordinates = {lat: 49.129449, lng: 18.323611};
    title = 'Chiremed - Reumatologická a interná ambulancia';
    content = '<div class="mapInfoWindow"><h1> '+ title + '</h1> <p><strong> MUDr. Daniela Janíková</strong></p><p>Pod Lachovcom 1727/55, 020 01, Púchov</p></div>';
    Wrap.createMapWithMarker(coordinates , $mapReumatologia, title, content);
  }

  var $mapChirurgia = document.getElementById('map-chirurgia');
  if($mapChirurgia) {
    coordinates = {lat: 49.404459, lng: 18.624745};
    title = 'Chiremed - Chirurgická ambulancia';
    content = '<div class="mapInfoWindow"><h1> '+ title + '</h1> <p><strong>MUDr. Tibor Janík</strong></p><p>Stred 41, 02354, Turzovka</p></div>';
    Wrap.createMapWithMarker( coordinates, $mapChirurgia, title, content);
  }
}

Wrap.createMapWithMarker = function(latLng, elem, title, infoWindowContent) {

  if(!latLng || !latLng.lat || !latLng.lng || !elem) {
    console.warn('Map initialization failed...', latLng, elem, title);
    return;
  }

  var map = new google.maps.Map(elem, {
    center: {lat: latLng.lat+0.0025, lng: latLng.lng},
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: latLng,
    title: title,
    map: map
  });

  if(infoWindowContent) {
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: $(elem).width() * 0.8
    });

    infoWindow.open(map, marker);
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
  }
}
