# UsinePOP_carteReg
Carte régionale pour les projet Usine pop
# Carte Interactive avec Leaflet


## Fonctionnalités

- Affiche une carte centrée à une position spécifiée avec un niveau de zoom initial.
- Utilise des tuiles de carte provenant d'une source en ligne.
- Charge des marqueurs depuis un fichier GeoJSON et les affiche sous forme de CircleMarkers.
- La couleur des marqueurs dépend de la catégorie des lieux.
- La carte peut être rendue en noir et blanc.
- Affiche une légende des catégories à droite de la carte.

## Configuration

La configuration de la carte se fait via le fichier `config.js`. Vous pouvez ajuster les paramètres suivants :

- `centerMap`: Coordonnées du centre de la carte.
- `zoomLevel`: Niveau de zoom initial.
- `showScaleBar`: Afficher la barre d'échelle (`true` ou `false`).
- `tileURL`: URL des tuiles de la carte.
- `tileAttribution`: Attribution pour les tuiles de la carte.
- `geoJSONFile`: Fichier GeoJSON contenant les marqueurs.
- `circleMarkerSize`: Taille des CircleMarkers.
- `markerColors`: Couleurs des marqueurs en fonction des catégories.

## Utilisation

1. Clonez ce dépôt.
2. Ouvrez `index.html` dans un navigateur web.
3. La carte interactive sera affichée avec les marqueurs et la légende.

## Auteur
[Thomas Maillard](https://github.com/ThoMaCarto)
à partir des données compilé et sélectionné par l'équipe du projet USINE POP

## Licence

Ce projet est sous licence [MIT License](LICENSE).
