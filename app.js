//// Configuration pour la carte////
////////////////////////////////////


const config = {
  centerMap: [43.638, 2.197],  // Coordonnées du centre de la carte [lat, lng]
  zoomLevel: 7,  // Niveau de zoom initial
  showScaleBar: true,  // Affichage de la barre d'échelle
  tileURL: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',  // URL des tuiles de la carte
  tileAttribution: '© OpenTopoMap Contributors',  // Attribution pour les tuiles
  AuthorAttribution : 'projet UsinePOP, Cartographie Thomas Maillard : <a href=www.arpentages.fr> ARPENTAGES </a>',
  geoJSONFile: 'points_cartoRegion_UsinePOP.geojson',  // Fichier GeoJSON pour afficher les marqueurs
  circleMarkerSize: 4,  // Taille des CircleMarkers (en pixels)
  markerColors: {  // Couleurs pour chaque catégorie
    Musée: 'red',
    Manufacture: 'blue',
    EPV: 'brown',
    FTT: 'pink'
  }
};


////Affichagege de la carte ////
////////////////////////////////

// Initialisation de la carte Leaflet
const map = L.map('map').setView(config.centerMap, config.zoomLevel);

// Ajout de la tuile (fond de carte) et rendu noir et blanc
const blackAndWhiteTileLayer = L.tileLayer(config.tileURL, {
  attribution: config.tileAttribution +' | ' + config.AuthorAttribution 
}).addTo(map);
blackAndWhiteTileLayer.getContainer().classList.add('black-and-white');  // Rend la tuile en noir et blanc

// Ajout de l'échelle si configuré
if (config.showScaleBar) {
  L.control.scale().addTo(map);
}

// Chargement du GeoJSON et création des marqueurs
fetch(config.geoJSONFile)
  .then(response => response.json())
  .then(data => {
    const markers = L.layerGroup();

    // Parcours des features du GeoJSON pour créer les marqueurs
    data.features.forEach(feature => {
      const coordinates = feature.geometry.coordinates;
      const properties = feature.properties;

      // Vérification des coordonnées
      if (coordinates && coordinates.length === 2) {
        const categoryColor = config.markerColors[properties.Catégories] || 'gray';

        // Création du marqueur
        const marker = L.circleMarker([coordinates[1], coordinates[0]], {
          radius: config.circleMarkerSize,
          color: categoryColor,
          fillColor: categoryColor,
          fillOpacity: 0.9,
        });

        // Construction du contenu de la popup avec toutes les propriétés
        let popupContent = '<strong>Informations</strong><br>';
        for (const [key, value] of Object.entries(properties)) {
          popupContent += `<strong>${key}:</strong> ${value}<br>`;
        }
        marker.bindPopup(popupContent);

        marker.addTo(markers);
      } else {
        console.error('Coordonnées invalides pour la feature :', feature);
      }
    });

    markers.addTo(map);  // Ajout des marqueurs à la carte
  })
  .catch(error => console.error('Erreur lors du chargement du GeoJSON :', error));



///// Légende de la carte /////
///////////////////////////////

// Récupération de l'élément de contenu de la légende
const legendContent = document.getElementById('legend-content');

// Remplissage du contenu de la légende
legendContent.innerHTML = `
  <div style="margin-bottom: 10px;">
    <div style="width: 20px; height: 20px; background-color: red; display: inline-block;"></div>
    <span>Musée</span>
  </div>
  <div style="margin-bottom: 10px;">
    <div style="width: 20px; height: 20px; background-color: blue; display: inline-block;"></div>
    <span>Manufacture</span>
  </div>
  <div style="margin-bottom: 10px;">
    <div style="width: 20px; height: 20px; background-color: brown; display: inline-block;"></div>
    <span>Entreprise du Patrimoine Vivant (EPV)</span>
  </div>
  <div style="margin-bottom: 10px;">
    <div style="width: 20px; height: 20px; background-color: pink; display: inline-block;"></div>
    <span>France Terre Textile : 70% fabriqué en France (FTT)</span>
  </div>
`;