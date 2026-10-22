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

### Q3.1
Sans la prop `card`, le composant est bien accepté par JavaScript et JSX, mais
`CardTile` tente ensuite de lire `card.rarity`, `card.name`, etc. sur
`undefined`. Une erreur apparaît donc au moment de l’affichage, lors de
l’exécution du composant, et non pendant l’écriture du code ni simplement au
lancement de l’application. La console indique généralement qu’une propriété
ne peut pas être lue sur `undefined`.

### Q3.2
Dans `RarityBadge`, `label = rarity` est une valeur par défaut appliquée lors
de la déstructuration des props. Si aucune prop `label` n’est fournie, le
badge affiche donc la valeur de `rarity`. Si l’on écrit
`label="Légendaire"`, cette valeur remplace la valeur par défaut et le badge
affiche « Légendaire ».

### Q3.3
`card` est une prop reçue par le composant et les données de la collection
doivent être traitées comme immuables. Modifier `card.name` directement
modifie l’objet partagé, peut produire des effets de bord et contourne le
modèle de mise à jour de React. Il faut créer une nouvelle valeur ou mettre à
jour l’état avec les mécanismes prévus par React.

### Q3.4
`children` est une prop spéciale qui contient le contenu placé entre la balise
ouvrante et la balise fermante d’un composant, ici le contenu de
`<Panel>...</Panel>`. Cela permet à `Panel` d’être un conteneur réutilisable
pour n’importe quel JSX : une grille, un formulaire ou plusieurs éléments,
sans devoir prévoir une prop spécifique comme `body` ni limiter le contenu à
une structure prédéfinie.

### Q4.1
Sans `key`, React affiche un avertissement indiquant que chaque élément d’une
liste doit avoir une prop `key` unique. La `key` permet à React d’identifier
chaque élément entre deux rendus et de déterminer efficacement lesquels ont
été ajoutés, supprimés ou déplacés.

### Q4.2
`key={card.id}` est préférable à `key={index}` car l’identifiant appartient à
la carte et reste stable lorsque la liste est filtrée, triée ou réordonnée.
L’index peut alors désigner une autre carte et provoquer des réutilisations
incorrectes dans le rendu. L’index est acceptable pour une liste statique qui
ne sera jamais réordonnée, ajoutée ou supprimée.

### Q4.3
Avec `{card.quantity && <p>...</p>}`, la tuile de Ptéra affiche `0` à
l’endroit où l’on attendait le nombre d’exemplaires. En JavaScript, `0 &&
element` renvoie `0`, et React affiche cette valeur. Il faut tester
explicitement `card.quantity > 0`, ou utiliser un ternaire, afin que le cas
zéro rende le message « Plus aucun exemplaire ».

### Q4.4
Avec `cards={[]}`, `CardGrid` effectue son early return et affiche :
« Aucune carte à afficher. »

### Q4.5
Il faut utiliser `filter`, par exemple
`SAMPLE_CARDS.filter((card) => isRare(card))`. Cette méthode crée un nouveau
tableau contenant uniquement les cartes rares et ne modifie pas le tableau
`SAMPLE_CARDS` d’origine.