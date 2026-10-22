### Q0.1
Uncaught Error: Target container is not a DOM element.
    at exports.createRoot (react-dom_client.js?v=8f483027:15805:44)
    at main.jsx:6:1

La div `#root` est le point de montage de l’application React : `createRoot` la
cherche pour y afficher le composant `App`. Sans elle, React ne trouve aucun
conteneur DOM et l’application ne peut pas démarrer.

### Q0.2
Le rechargement à chaud (HMR, *Hot Module Replacement*) est assuré par Vite
pendant le développement. Vite détecte la modification du fichier et demande
à React de mettre à jour le composant sans recharger toute la page. React est
responsable du rendu, mais c’est Vite qui détecte la sauvegarde et déclenche
cette mise à jour à chaud.

### Q0.3
L’application contient un seul fichier HTML : `index.html`.

SPA signifie *Single-Page Application* (« application monopage »). Le
navigateur charge une seule page HTML, puis JavaScript/React met à jour son
contenu dynamiquement sans recharger un nouveau document HTML à chaque
navigation.

### Q2.1
L’objet affiché dans la console est un élément React. Sa propriété `type`
contient le composant `CardTile` et sa propriété `props` contient un objet vide
(`{}`), car aucune prop n’est encore transmise. Il ne contient pas de HTML :
il s’agit d’une description JavaScript de ce que React devra rendre.

### Q2.2
À l’écran, il y a :

- un composant `CardTile` (la définition du composant) ;
- trois éléments React `<CardTile />` (les descriptions produites par le JSX) ;
- trois instances rendues de `CardTile` (les trois tuiles affichées).

Un composant est une fonction réutilisable qui décrit une partie de
l’interface. Un élément React est l’objet JavaScript créé par JSX pour décrire
un élément ou un composant. Une instance est une occurrence concrète d’un
composant dans l’interface rendue.

### Q2.3
Avec un nom commençant par une minuscule, `<cardTile />` est interprété comme
un élément HTML personnalisé, et non comme le composant React. Le composant
`CardTile` n’est donc pas exécuté comme prévu ; aucun affichage de la tuile
n’apparaît, et React signale généralement un avertissement concernant la
balise inconnue ou personnalisée.

Cela montre que la majuscule initiale permet à JSX de distinguer les
composants React des balises HTML.

### Q2.4
`{CardTile()}` appelle directement la fonction et son affichage peut sembler
identique. C’est toutefois une mauvaise pratique : React ne traite plus
`CardTile` comme un composant dans l’arbre de rendu. On perd notamment la
gestion normale du cycle de vie, des hooks et des erreurs ; les composants
doivent être utilisés avec la syntaxe JSX `<CardTile />`.