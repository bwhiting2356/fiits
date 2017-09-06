// 'use strict';
//
// const TILE_SIZE = { height: 256, width: 256 }; // google World tile size, as of v3.22
// const ZOOM_MAX = 21; // max google maps zoom level, as of v3.22
// const BUFFER = 15; // edge buffer for fitting markers within viewport bounds
//
// const mapOptions = {
//   zoom: 14,
//   center: {lat: 34.075328,lng: -118.330432},
//   options: {
//     mapTypeControl: false
//   }
// };
// const markers = [];
// let mapDimensions: MapDimensions;
// const mapOffset = {x: 0, y: 0};
// const mapEl = document.getElementById('gmap');
// const overlayEl = document.getElementById('overlay');
// const gmap = new google.maps.Map(mapEl, mapOptions);
//
// interface MapDimensions {
//   height: number,
//   width: number
// }
//
// const updateMapDimensions = () => {
//   mapDimensions.height = mapEl.offsetHeight;
//   mapDimensions.width = mapEl.offsetWidth;
// };
//
// const getBoundsZoomLevel = (bounds, dimensions) => {
//   const latRadian = lat => {
//     const sin = Math.sin(lat * Math.PI / 180);
//     const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
//     return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
//   };
//   const zoom = (mapPx, worldPx, fraction) => {
//     return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
//   };
//   const ne = bounds.getNorthEast();
//   const sw = bounds.getSouthWest();
//   const latFraction = (latRadian(ne.lat()) - latRadian(sw.lat())) / Math.PI;
//   const lngDiff = ne.lng() - sw.lng();
//   const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
//   const latZoom = zoom(dimensions.height, TILE_SIZE.height, latFraction);
//   const lngZoom = zoom(dimensions.width, TILE_SIZE.width, lngFraction);
//   return Math.min(latZoom, lngZoom, ZOOM_MAX);
// };
//
// const getBounds = locations => {
//   let northeastLat;
//   let northeastLong;
//   let southwestLat;
//   let southwestLong;
//   locations.forEach(function(location){
//     if (!northeastLat) {
//       northeastLat = southwestLat = location.lat;
//       southwestLong = northeastLong = location.lng;
//       return;
//     }
//     if (location.lat > northeastLat) {
//       northeastLat = location.lat;
//     } else if (location.lat < southwestLat) {
//       southwestLat = location.lat;
//     }
//     if (location.lng < northeastLong) {
//       northeastLong = location.lng;
//     } else if (location.lng > southwestLong) {
//       southwestLong = location.lng;
//     }
//   });
//   const northeast = new google.maps.LatLng(northeastLat, northeastLong);
//   const southwest = new google.maps.LatLng(southwestLat, southwestLong);
//   const bounds = new google.maps.LatLngBounds();
//   bounds.extend(northeast);
//   bounds.extend(southwest);
//   return bounds;
// };
//
// const zoomWithOffset = shouldZoom => {
//   const currentzoom = gmap.getZoom();
//   const newzoom = shouldZoom ? currentzoom + 1 : currentzoom - 1;
//   const offset = {
//     x: shouldZoom ? -mapOffset.x / 4 : mapOffset.x / 2,
//     y: shouldZoom ? -mapOffset.y / 4 : mapOffset.y / 2
//   };
//   const newCenter = offsetLatLng(gmap.getCenter(), offset.x, offset.y);
//   if(shouldZoom){
//     gmap.setZoom(newzoom);
//     gmap.panTo(newCenter);
//   } else {
//     gmap.setCenter(newCenter);
//     gmap.setZoom(newzoom);
//   }
// };
//
// const setMapBounds = locations => {
//   updateMapDimensions();
//   const bounds = getBounds(locations);
//   const dimensions = {
//     width: mapDimensions.width - mapOffset.x - BUFFER * 2,
//     height: mapDimensions.height - mapOffset.y - BUFFER * 2
//   };
//   const zoomLevel = getBoundsZoomLevel(bounds, dimensions);
//   gmap.setZoom(zoomLevel);
//   setOffsetCenter(bounds.getCenter());
// };
//
// const offsetLatLng = (latlng, offsetX, offsetY) => {
//   offsetX = offsetX || 0;
//   offsetY = offsetY || 0;
//   const scale = Math.pow(2, gmap.getZoom());
//   const point = gmap.getProjection().fromLatLngToPoint(latlng);
//   const pixelOffset = new google.maps.Point((offsetX/scale), (offsetY/scale));
//   const newPoint = new google.maps.Point(
//     point.x - pixelOffset.x,
//     point.y + pixelOffset.y
//   );
//   return gmap.getProjection().fromPointToLatLng(newPoint);
// };
//
// const setOffsetCenter = latlng => {
//   const newCenterLatLng = offsetLatLng(latlng, mapOffset.x/2, mapOffset.y/2);
//   gmap.panTo(newCenterLatLng);
// };
//
// const locations = [{
//   name: 'Wilshire Country Club',
//   lat: 34.077796,
//   lng: -118.331151
// },{
//   name: '301 N Rossmore Ave',
//   lat: 34.077146,
//   lng: -118.327805
// },{
//   name: '5920 Beverly Blvd',
//   lat: 34.070281,
//   lng: -118.331831
// }];
//
// locations.forEach(function(location) {
//   let marker = new google.maps.Marker({
//     position: new google.maps.LatLng(location.lat, location.lng),
//     title: location.name
//   })
//   marker.setMap(gmap);
//   markers.push(marker);
// });
//
// mapOffset.x = overlayEl.offsetWidth;
//
// document.zoom = bool => zoomWithOffset(bool);
// document.setBounds = () => setMapBounds(locations);
