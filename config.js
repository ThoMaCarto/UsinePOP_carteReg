const config = {
  // Coordonnées du centre de la carte [lat, lng]
  centerMap: [43.638, 2.197],

  // Niveau de zoom initial
  zoomLevel: 9,

  // Affichage de la barre d'échelle
  showScaleBar: true,

  // URL des tuiles de la carte
  tileURL: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',//'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',

  // Attribution pour les tuiles
  tileAttribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors & <a href="http://stamen.com">Stamen Design</a>',

  // Fichier GeoJSON pour afficher les marqueurs
  geoJSONFile:'points_cartoRegion_UsinePOP.geojson',


  // Taille des CircleMarkers (en pixels)
  circleMarkerSize: 10,

  // Couleurs pour chaque catégorie
  categoryColors: {
    Musée: 'red',
    Manufacture: 'blue',
    EPV: 'brown',
    FTT: 'pink'
  }
};

// Exportez la configuration pour l'utiliser dans d'autres parties de votre application
export default config;
