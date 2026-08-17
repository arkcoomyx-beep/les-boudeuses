/**
 * Configuration centralisée des images du site.
 *
 * Pour changer une photo : modifiez le nom de fichier ici.
 * Pour changer le dossier : modifiez IMG_DIR.
 */
const IMG_DIR = 'img/';

const IMAGES = {
  logo:                 'logo.png',
  facade:               'facade.png',
  comptoir:             'comptoir.png',
  salle:                'salle.png',
  vitrinePatisseries:   'vitrine-patisseries.png',
  coinTropical:         'coin-tropical.png',
  flyerSaladeCompose:   'flyer-salade-compose.png',
  tartinesChaudes:      'tartines-chaudes.png',
  patesMaison:          'pates-maison.png',
  flyerMenuGaufres:     'flyer-menu-gaufres.png',
  dessertsAssortiment:  'desserts-assortiment.png',
  fondantChocolat:      'fondant-chocolat.png',
  latteGourmand:        'latte-gourmand.png',
  vinLaBoudeuse:        'vin-la-boudeuse.png',
  saladeBolThon:        'salade-bol-thon.png',
  cafeEspresso:         'cafe-espresso.png',
  bubbleTea:            'bubble-tea.png',
  cafeGourmand:         'cafe-gourmand.png',
  gaufresSalees:        'gaufres-salees.png',
  gaufreSucre:          'gaufre-sucre.png',
  coinDetente:          'coin-detente.png',
  saladeFraiche:        'salade-fraiche.png',
  formuleSalee:         'formule-salee.png',
};

function getImage(key) {
  const file = IMAGES[key];
  return file ? IMG_DIR + file : '';
}

function initImages() {
  document.querySelectorAll('[data-img]').forEach((el) => {
    const src = getImage(el.dataset.img);
    if (src) el.src = src;
  });

  const favicon = document.querySelector('link[data-img-favicon]');
  if (favicon) favicon.href = getImage('logo');
}
