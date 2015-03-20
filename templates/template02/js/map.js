
function initialize() {

    //Map parametrs
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.143, -73.341),
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
    styles:[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#00b2ff"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
    }

    //map
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    //category
    var cook = 'img/icon/01.png';
    var sport = 'img/icon/02.png';
    var game = 'img/icon/03.png';
    var eco = 'img/icon/04.png';
    var shop = 'img/icon/05.png';
    var study = 'img/icon/06.png';
    var drink = 'img/icon/07.png';
    var money = 'img/icon/08.png';
    var bus = 'img/icon/09.png';

    //positions
    var point1 = new google.maps.LatLng(41.154, -73.328);
    var point2 = new google.maps.LatLng(41.148, -73.345);
    var point3 = new google.maps.LatLng(41.135, -73.324);
    var point4 = new google.maps.LatLng(41.158, -73.349);
    var point5 = new google.maps.LatLng(41.149, -73.356);
    var point6 = new google.maps.LatLng(41.144, -73.342);
    var point7 = new google.maps.LatLng(41.141, -73.349);
    var point8 = new google.maps.LatLng(41.147, -73.360);
    var point9 = new google.maps.LatLng(41.136, -73.362);
    var point10 = new google.maps.LatLng(41.156, -73.351);
    var point11 = new google.maps.LatLng(41.162, -73.339);
    var point12 = new google.maps.LatLng(41.167, -73.349);
    var point13 = new google.maps.LatLng(41.161, -73.359);
    var point14 = new google.maps.LatLng(41.178, -73.349);
    var point15 = new google.maps.LatLng(41.173, -73.331);
    var point16 = new google.maps.LatLng(41.176, -73.306);
    var point17 = new google.maps.LatLng(41.164, -73.311);
    var point18 = new google.maps.LatLng(41.158, -73.378);
    var point19 = new google.maps.LatLng(41.149, -73.372);
    var point20 = new google.maps.LatLng(41.137, -73.366);
    var point21 = new google.maps.LatLng(41.138, -73.375);
    var point22 = new google.maps.LatLng(41.135, -73.367);
    var point23 = new google.maps.LatLng(41.129, -73.366);
    var point24 = new google.maps.LatLng(41.140, -73.337);
    var point25 = new google.maps.LatLng(41.147, -73.347);
    var point26 = new google.maps.LatLng(41.174, -73.334);
    var point27 = new google.maps.LatLng(41.185, -73.349);
    var point28 = new google.maps.LatLng(41.177, -73.352);
    var point29 = new google.maps.LatLng(41.180, -73.367);
    var point30 = new google.maps.LatLng(41.172, -73.364);
    var point31 = new google.maps.LatLng(41.169, -73.348);
    var point32 = new google.maps.LatLng(41.161, -73.348);
    var point33 = new google.maps.LatLng(41.156, -73.341);
    var point34 = new google.maps.LatLng(41.149, -73.345);
    var point35 = new google.maps.LatLng(41.146, -73.354);
    var point36 = new google.maps.LatLng(41.142, -73.345);
    var point37 = new google.maps.LatLng(41.141, -73.358);
    var point38 = new google.maps.LatLng(41.152, -73.321);
    var point39 = new google.maps.LatLng(41.163, -73.337);
    var point40 = new google.maps.LatLng(41.131, -73.323);
    var point41 = new google.maps.LatLng(41.136, -73.342);
    var point42 = new google.maps.LatLng(41.151, -73.300);
    var point43 = new google.maps.LatLng(41.149, -73.311);
    var point44 = new google.maps.LatLng(41.156, -73.338);
    var point45 = new google.maps.LatLng(41.146, -73.358);
    var point46 = new google.maps.LatLng(41.126, -73.346);
    var point47 = new google.maps.LatLng(41.132, -73.325);
    var point48 = new google.maps.LatLng(41.144, -73.345);
    var point49 = new google.maps.LatLng(41.156, -73.353);
    var point50 = new google.maps.LatLng(41.163, -73.333);

    //markers
    var marker1 = className = 'dick';
    var marker1 = new google.maps.Marker({
        position: point1,
        map: map,
        category: cook,
        icon: cook,
        title: "point1"
    });
    var marker2 = new google.maps.Marker({
        position: point2,
        map: map,
        category: sport,
        icon: sport,
        title: "Uluru (Ayers Rock)"
    });
    var marker3 = new google.maps.Marker({
        position: point3,
        map: map,
        category: game,
        icon: game,
        title: "Uluru (Ayers Rock)"
    });
    var marker4 = new google.maps.Marker({
        position: point4,
        map: map,
        category: eco,
        icon: eco,
        title: "Uluru (Ayers Rock)"
    });
    var marker5 = new google.maps.Marker({
        position: point5,
        map: map,
        category: shop,
        icon: shop,
        title: "Uluru (Ayers Rock)"
    });
    var marker6 = new google.maps.Marker({
        position: point6,
        map: map,
        category: study,
        icon: study,
        title: "Uluru (Ayers Rock)"
    });
    var marker7 = new google.maps.Marker({
        position: point7,
        map: map,
        category: drink,
        icon: drink,
        title: "Uluru (Ayers Rock)"
    });
    var marker8 = new google.maps.Marker({
        position: point8,
        map: map,
        category: money,
        icon: money,
        title: "Uluru (Ayers Rock)"
    });
    var marker9 = new google.maps.Marker({
        position: point9,
        map: map,
        category: bus,
        icon: bus,
        title: "Uluru (Ayers Rock)"
    });
    var marker10 = new google.maps.Marker({
        position: point10,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker11 = new google.maps.Marker({
        position: point11,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker12 = new google.maps.Marker({
        position: point12,
        map: map,
        category: sport,
        icon: sport,
        title: "Uluru (Ayers Rock)"
    });
    var marker13 = new google.maps.Marker({
        position: point13,
        map: map,
        category: game,
        icon: game,
        title: "Uluru (Ayers Rock)"
    });
    var marker14 = new google.maps.Marker({
        position: point14,
        map: map,
        category: eco,
        icon: eco,
        title: "Uluru (Ayers Rock)"
    });
    var marker15 = new google.maps.Marker({
        position: point15,
        map: map,
        category: shop,
        icon: shop,
        title: "Uluru (Ayers Rock)"
    });
    var marker16 = new google.maps.Marker({
        position: point16,
        map: map,
        category: study,
        icon: study,
        title: "Uluru (Ayers Rock)"
    });
    var marker17 = new google.maps.Marker({
        position: point17,
        map: map,
        category: drink,
        icon: drink,
        title: "Uluru (Ayers Rock)"
    });
    var marker18 = new google.maps.Marker({
        position: point18,
        map: map,
        category: money,
        icon: money,
        title: "Uluru (Ayers Rock)"
    });
    var marker19 = new google.maps.Marker({
        position: point19,
        map: map,
        category: bus,
        icon: bus,
        title: "Uluru (Ayers Rock)"
    });
    var marker20 = new google.maps.Marker({
        position: point20,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker21 = new google.maps.Marker({
        position: point21,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker22 = new google.maps.Marker({
        position: point22,
        map: map,
        category: sport,
        icon: sport,
        title: "Uluru (Ayers Rock)"
    });
    var marker23 = new google.maps.Marker({
        position: point23,
        map: map,
        category: game,
        icon: game,
        title: "Uluru (Ayers Rock)"
    });
    var marker24 = new google.maps.Marker({
        position: point24,
        map: map,
        category: eco,
        icon: eco,
        title: "Uluru (Ayers Rock)"
    });
    var marker25 = new google.maps.Marker({
        position: point25,
        map: map,
        category: shop,
        icon: shop,
        title: "Uluru (Ayers Rock)"
    });
    var marker26 = new google.maps.Marker({
        position: point26,
        map: map,
        category: study,
        icon: study,
        title: "Uluru (Ayers Rock)"
    });
    var marker27 = new google.maps.Marker({
        position: point27,
        map: map,
        category: drink,
        icon: drink,
        title: "Uluru (Ayers Rock)"
    });
    var marker28 = new google.maps.Marker({
        position: point28,
        map: map,
        category: money,
        icon: money,
        title: "Uluru (Ayers Rock)"
    });
    var marker29 = new google.maps.Marker({
        position: point29,
        map: map,
        category: bus,
        icon: bus,
        title: "Uluru (Ayers Rock)"
    });
    var marker30 = new google.maps.Marker({
        position: point30,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker31 = new google.maps.Marker({
        position: point31,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker32 = new google.maps.Marker({
        position: point32,
        map: map,
        category: sport,
        icon: sport,
        title: "Uluru (Ayers Rock)"
    });
    var marker33 = new google.maps.Marker({
        position: point33,
        map: map,
        category: game,
        icon: game,
        title: "Uluru (Ayers Rock)"
    });
    var marker34 = new google.maps.Marker({
        position: point34,
        map: map,
        category: eco,
        icon: eco,
        title: "Uluru (Ayers Rock)"
    });
    var marker35 = new google.maps.Marker({
        position: point35,
        map: map,
        category: shop,
        icon: shop,
        title: "Uluru (Ayers Rock)"
    });
    var marker36 = new google.maps.Marker({
        position: point36,
        map: map,
        category: study,
        icon: study,
        title: "Uluru (Ayers Rock)"
    });
    var marker37 = new google.maps.Marker({
        position: point37,
        map: map,
        category: drink,
        icon: drink,
        title: "Uluru (Ayers Rock)"
    });
    var marker38 = new google.maps.Marker({
        position: point38,
        map: map,
        category: money,
        icon: money,
        title: "Uluru (Ayers Rock)"
    });
    var marker39 = new google.maps.Marker({
        position: point39,
        map: map,
        category: bus,
        icon: bus,
        title: "Uluru (Ayers Rock)"
    });
    var marker40 = new google.maps.Marker({
        position: point40,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker41 = new google.maps.Marker({
        position: point41,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });
    var marker42 = new google.maps.Marker({
        position: point42,
        map: map,
        category: sport,
        icon: sport,
        title: "Uluru (Ayers Rock)"
    });
    var marker43 = new google.maps.Marker({
        position: point43,
        map: map,
        category: game,
        icon: game,
        title: "Uluru (Ayers Rock)"
    });
    var marker44 = new google.maps.Marker({
        position: point44,
        map: map,
        category: eco,
        icon: eco,
        title: "Uluru (Ayers Rock)"
    });
    var marker45 = new google.maps.Marker({
        position: point45,
        map: map,
        category: shop,
        icon: shop,
        title: "Uluru (Ayers Rock)"
    });
    var marker46 = new google.maps.Marker({
        position: point46,
        map: map,
        category: study,
        icon: study,
        title: "Uluru (Ayers Rock)"
    });
    var marker47 = new google.maps.Marker({
        position: point47,
        map: map,
        category: drink,
        icon: drink,
        title: "Uluru (Ayers Rock)"
    });
    var marker48 = new google.maps.Marker({
        position: point48,
        map: map,
        category: money,
        icon: money,
        title: "Uluru (Ayers Rock)"
    });
    var marker49 = new google.maps.Marker({
        position: point49,
        map: map,
        category: bus,
        icon: bus,
        title: "Uluru (Ayers Rock)"
    });
    var marker50 = new google.maps.Marker({
        position: point50,
        map: map,
        category: cook,
        icon: cook,
        title: "Uluru (Ayers Rock)"
    });

    //information block 
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="point_description"><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-6"><img src="img/icon/01.png" class="point"><h2>Stadion Dinamo</h2></div><div class="col-md-6"><a href="" class="btn btn-default btn-sm buttons_head"><i class="icon-user"></i>Invite a friend</a><a href="" class="btn btn-danger btn-sm buttons_head"><i class="icon-automobile-car"></i></a></div></div><div class="row"><div class="col-md-12"><span class="descr_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </span></div></div><div class="row"><div class="col-md-12"><img src="img/placeholder1.png"></div></div><div class="row"><div class="col-md-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div></div><div class="row"><div class="col-md-12"><ul id="tabs_point"><li><a href="#" class="active">Comments <span>2</span></a></li><li><a href="#">Photo <span>23</span></a></li><li><a href="#">Was here <span>2</span></a></li></ul></div></div><div class="row"><div class="col-md-12 tabs_block_point"><div id="point_tab1" class="active">33</div><div id="point_tab2">0</div><div id="point_tab3">0</div></div></div>аллилуйа блеать</div></div></div>'
    });

    //information for
    function goToLink() {
        document.location.href = '3.html';
    }
    google.maps.event.addListener(marker1, 'click', goToLink);

    google.maps.event.addListener(marker2, 'click', goToLink);
    google.maps.event.addListener(marker3, 'click', goToLink);
    google.maps.event.addListener(marker4, 'click', goToLink);
    google.maps.event.addListener(marker5, 'click', goToLink);
    google.maps.event.addListener(marker6, 'click', goToLink);
    google.maps.event.addListener(marker7, 'click', goToLink);
    google.maps.event.addListener(marker8, 'click', goToLink);
    google.maps.event.addListener(marker9, 'click', goToLink);
    google.maps.event.addListener(marker10, 'click', goToLink);
    google.maps.event.addListener(marker11, 'click', goToLink);
    google.maps.event.addListener(marker12, 'click', goToLink);
    google.maps.event.addListener(marker13, 'click', goToLink);
    google.maps.event.addListener(marker14, 'click', goToLink);
    google.maps.event.addListener(marker15, 'click', goToLink);
    google.maps.event.addListener(marker16, 'click', goToLink);
    google.maps.event.addListener(marker17, 'click', goToLink);
    google.maps.event.addListener(marker18, 'click', goToLink);
    google.maps.event.addListener(marker19, 'click', goToLink);
    google.maps.event.addListener(marker20, 'click', goToLink);
    google.maps.event.addListener(marker21, 'click', goToLink);
    google.maps.event.addListener(marker22, 'click', goToLink);
    google.maps.event.addListener(marker23, 'click', goToLink);
    google.maps.event.addListener(marker24, 'click', goToLink);
    google.maps.event.addListener(marker25, 'click', goToLink);
    google.maps.event.addListener(marker26, 'click', goToLink);
    google.maps.event.addListener(marker27, 'click', goToLink);
    google.maps.event.addListener(marker28, 'click', goToLink);
    google.maps.event.addListener(marker29, 'click', goToLink);
    google.maps.event.addListener(marker30, 'click', goToLink);
    google.maps.event.addListener(marker31, 'click', goToLink);
    google.maps.event.addListener(marker32, 'click', goToLink);
    google.maps.event.addListener(marker33, 'click', goToLink);
    google.maps.event.addListener(marker34, 'click', goToLink);
    google.maps.event.addListener(marker35, 'click', goToLink);
    google.maps.event.addListener(marker36, 'click', goToLink);
    google.maps.event.addListener(marker37, 'click', goToLink);
    google.maps.event.addListener(marker38, 'click', goToLink);
    google.maps.event.addListener(marker39, 'click', goToLink);
    google.maps.event.addListener(marker40, 'click', goToLink);
    google.maps.event.addListener(marker41, 'click', goToLink);
    google.maps.event.addListener(marker42, 'click', goToLink);
    google.maps.event.addListener(marker43, 'click', goToLink);
    google.maps.event.addListener(marker44, 'click', goToLink);
    google.maps.event.addListener(marker46, 'click', goToLink);
    google.maps.event.addListener(marker47, 'click', goToLink);
    google.maps.event.addListener(marker48, 'click', goToLink);
    google.maps.event.addListener(marker49, 'click', goToLink);
    google.maps.event.addListener(marker50, 'click', goToLink);



    //Map parametrs
    var mapOptions2 = {
        zoom: 14,
        center: new google.maps.LatLng(41.154, -73.328),
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        styles:[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#00b2ff"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
    
    }

    //map
    var map2 = new google.maps.Map(document.getElementById("map2"), mapOptions2);

    //category
    var cook2 = 'img/icon/01.png';
    var sport2 = 'img/icon/02.png';
    var game2 = 'img/icon/03.png';
    var eco2 = 'img/icon/04.png';
    var shop2 = 'img/icon/05.png';
    var study2 = 'img/icon/06.png';
    var drink2 = 'img/icon/07.png';
    var money2 = 'img/icon/08.png';
    var bus2 = 'img/icon/09.png';

    //positions
    var point122 = new google.maps.LatLng(41.154, -73.328);


    //markers

    var marker122 = new google.maps.Marker({
        position: point122,
        map: map2,
        category: cook2,
        icon: cook2,
        title: "point122"
    });



    //information for
    function goToLink() {
        document.location.href = '3.html';
    }
    google.maps.event.addListener(marker122, 'click', goToLink);




    //Map parametrs
    var mapOptions3 = {
        zoom: 14,
        center: new google.maps.LatLng(41.163, -73.337),
        mapTypeId: google.maps.MapTypeId.ROADMAP,

        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        styles:[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#00b2ff"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
    
    }

    //map
    var map3 = new google.maps.Map(document.getElementById("map3"), mapOptions3);

    //category
    var cook3 = 'img/icon/01.png';
    var sport3 = 'img/icon/02.png';
    var game3 = 'img/icon/03.png';
    var eco3 = 'img/icon/04.png';
    var shop3 = 'img/icon/05.png';
    var study3 = 'img/icon/06.png';
    var drink3 = 'img/icon/07.png';
    var money3 = 'img/icon/08.png';
    var bus3 = 'img/icon/09.png';

    //positions
    var point123 = new google.maps.LatLng(41.163, -73.337);


    //markers

    var marker122 = new google.maps.Marker({
        position: point123,
        map: map3,
        category: shop3,
        icon: shop3,
        title: "point123"
    });



    //information for
    function goToLink() {
        document.location.href = '3.html';
    }
    google.maps.event.addListener(marker123, 'click', goToLink);

}