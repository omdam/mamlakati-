$(window).on("load", function () {
    var location = [24.774255, 46.737586534];
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: new google.maps.LatLng(24.774265, 46.738586),
    });
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[0], location[1]),
        map,
        icon: "assets/images/pin.png",
    });
});
