////////////////////////////////////
//// Configuration pour la carte////
////////////////////////////////////


const config = {
  centerMap: [43.638, 2.197],  // Coordonnées du centre de la carte [lat, lng]
  zoomLevel: 7,  // Niveau de zoom initial
  showScaleBar: true,  // Affichage de la barre d'échelle
  tileURL: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',  // URL des tuiles de la carte
  tileAttribution: '© OpenTopoMap Contributors',  // Attribution pour les tuiles
  tileOpacity: 0.6, //opacité des tuiles de la carte
  AuthorAttribution : 'projet UsinePOP, Cartographie Thomas Maillard : <a href=www.arpentages.fr> ARPENTAGES </a>',
  geoJSONFile: 'points_cartoRegion_UsinePOP.geojson',  // Fichier GeoJSON pour afficher les marqueurs
  circleMarkerSize: 4,  // Taille des CircleMarkers (en pixels)
  markerColors: {  // Couleurs pour chaque catégorie
    Musée: 'red',
    Manufacture: 'blue',
    EPV: 'brown',
    FTT: 'pink'
  },
  searchIGN:true,
};

////////////////////////////////
////Affichagege de la carte ////
////////////////////////////////

// Initialisation de la carte Leaflet
const map = L.map('map').setView(config.centerMap, config.zoomLevel);

// Ajout de la tuile (fond de carte) et rendu noir et blanc
const blackAndWhiteTileLayer = L.tileLayer(config.tileURL, {
  attribution: config.tileAttribution +' | ' + config.AuthorAttribution, opacity:config.tileOpacity, 
}).addTo(map);
blackAndWhiteTileLayer.getContainer().classList.add('black-and-white');  // Rend la tuile en noir et blanc

// Ajout de l'échelle si configuré
if (config.showScaleBar) {
  L.control.scale().addTo(map);
}
////////////////////////////////////////////////////////
//// Chargement du GeoJSON et création des marqueurs////
////////////////////////////////////////////////////////
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


/////////////////////////////////////////////
//// filtrage et mise à jour de la carte ////
/////////////////////////////////////////////

// Fonction pour mettre à jour la carte en fonction des catégories sélectionnées
function updateMap() {
  const selectedCategories = getSelectedCategories();

  // Effacer les marqueurs actuels
  map.eachLayer(layer => {
    if (layer instanceof L.CircleMarker) {
      map.removeLayer(layer);
    }
  });

  // Charger à nouveau les marqueurs en fonction des catégories sélectionnées
  fetch(config.geoJSONFile)
    .then(response => response.json())
    .then(data => {
      const markers = L.layerGroup();

      data.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const properties = feature.properties;

        if (coordinates && coordinates.length === 2) {
          const categoryColor = config.markerColors[properties.Catégories] || 'gray';

          if (selectedCategories.length === 0 || selectedCategories.includes(properties.Catégories)) {
            const marker = L.circleMarker([coordinates[1], coordinates[0]], {
              radius: config.circleMarkerSize,
              color: categoryColor,
              fillColor: categoryColor,
              fillOpacity: 0.9,
            });

            let popupContent = '<strong>Informations</strong><br>';
            for (const [key, value] of Object.entries(properties)) {
              popupContent += `<strong>${key}:</strong> ${value}<br>`;
            }
            marker.bindPopup(popupContent);

            marker.addTo(markers);
          }
        } else {
          console.error('Coordonnées invalides pour la feature :', feature);
        }
      });

      markers.addTo(map);
    })
    .catch(error => console.error('Erreur lors du chargement du GeoJSON :', error));
}

// Fonction pour obtenir les catégories sélectionnées
function getSelectedCategories() {
  const checkboxes = document.querySelectorAll('#categories input[type=checkbox]');
  const selectedCategories = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.value);
    }
  });
  return selectedCategories;
}


//////////////////////////////////////////////
//// recherche par adresses du géoportail si configuré ////
//////////////////////////////////////////////


if (config.searchIGN) {
	// ajout d'une couche
var lyrMaps = L.geoportalLayer.WMTS({
    layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
});
map.addLayer(lyrMaps) ;


// création et ajout du controle
var searchCtrl = L.geoportalControl.SearchEngine({
});
map.addControl(searchCtrl);
}

// Gérer le clic sur le bouton "Mettre à jour"
const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', updateMap);
