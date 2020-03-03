function initMap() {
  var shop = {lat: 59.938635, lng: 30.323118};
  var map = new google.maps.Map(
      document.querySelector('.contacts__gooogle-map'), {zoom: 18, center: shop, disableDefaultUI: true,zoomControl: true});
  var marker = new google.maps.Marker({
    position: shop,
    map: map,
    title: 'Магазин Мишка',
    icon: '../img/icon-map-pin.svg'
  });
}
