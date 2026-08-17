# Les Boudeuses — Site web

Site vitrine du restaurant **Les Boudeuses**, bar à salades, pâtes & coffee shop à Saint-Lô.

## Structure

```
├── index.html          # Page principale (one-page)
├── css/style.css       # Styles et identité visuelle
├── js/
│   ├── images.js       # Configuration centralisée des images
│   └── main.js         # Navigation, onglets menu, galerie, statut ouverture
├── img/                # Photos (noms descriptifs, référencées dans images.js)
└── README.md
```

## Prévisualisation locale

Ouvrez `index.html` directement dans votre navigateur, ou lancez un serveur local :

```bash
# Avec Python
python -m http.server 8080

# Avec Node.js (npx)
npx serve .
```

Puis rendez-vous sur `http://localhost:8080`.

## Déploiement

Le site est statique (HTML/CSS/JS). Vous pouvez le déployer gratuitement sur :

- **Netlify** — glissez-déposez le dossier
- **GitHub Pages** — poussez le repo et activez Pages
- **Vercel** — importez le projet

## Changer une photo

1. Placez le nouveau fichier dans le dossier `img/`
2. Modifiez **uniquement** `js/images.js` :

```js
const IMG_DIR = 'img/';          // dossier des images
const IMAGES = {
  logo: 'logo.png',              // ← changez le nom de fichier ici
  facade: 'facade.png',
  // ...
};
```

Le HTML utilise `data-img="logo"` — pas besoin de toucher `index.html`.

## Personnalisation

- **Couleurs** : variables CSS dans `:root` (`css/style.css`)
- **Carte / prix** : section `#carte` dans `index.html`
- **Horaires** : section `#infos` et logique dans `js/main.js` (`initOpenStatus`)

## Contact restaurant

- 30 rue des Maréchaux, 50000 Saint-Lô
- [Instagram](https://www.instagram.com/les_boudeuses_stlo/)
- lesboudeuses.stlo@gmail.com
