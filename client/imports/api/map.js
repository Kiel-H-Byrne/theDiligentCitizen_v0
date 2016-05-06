// dburles meteor package
// https://atmospherejs.com/dburles/google-maps

// Goole Maps example from: 
// https://developers.google.com/maps/documentation/javascript/fusiontableslayer#fusion_table_styles

// Google County Border Data from: 
// https://support.google.com/fusiontables/answer/1182141?hl=en
// https://www.google.com/fusiontables/DataSource?docid=1PN6pyJfH57KXWI5GOeilVxfFykcKLElbip-Xxw#rows:id=1



// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -25, lng: 133},
//     zoom: 4
//   });

//   var layer = new google.maps.FusionTablesLayer({
//     query: {
//       select: 'geometry',
//       from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ'
//     },
//     styles: [{
//       polygonOptions: {
//         fillColor: '#00FF00',
//         fillOpacity: 0.3
//       }
//     }, {
//       where: 'birds > 300',
//       polygonOptions: {
//         fillColor: '#0000FF'
//       }
//     }, {
//       where: 'population > 5',
//       polygonOptions: {
//         fillOpacity: 1.0
//       }
//     }]
//   });
//   layer.setMap(map);
// }