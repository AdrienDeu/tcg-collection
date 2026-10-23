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

### Q5.1
Avec une simple variable locale, le clic modifie la valeur pendant
l’exécution du handler, mais ne déclenche pas de nouveau rendu React : l’écran
ne se met donc pas à jour. De plus, lors d’un éventuel nouveau rendu, la
variable est recréée avec `initialQuantity` et la modification est perdue.
Le `state` est nécessaire pour conserver la valeur entre les rendus et
demander à React de mettre l’interface à jour.

### Q5.2
`console.log(quantity)` affiche l’ancienne valeur. La mise à jour demandée par
`setQuantity` est planifiée et React applique le nouvel état lors du rendu
suivant ; la variable `quantity` du rendu courant ne change pas.

### Q5.3
Avec deux appels directs à `setQuantity(quantity + 1)`, la quantité augmente
d’une seule unité : les deux appels calculent la même nouvelle valeur à partir
du même état. Avec
`setQuantity((q) => q + 1)` deux fois, chaque mise à jour fonctionnelle reçoit
la valeur issue de la mise à jour précédente, donc la quantité augmente de
deux unités.

### Q5.4
ESLint signale une violation de la règle des Hooks, et React peut produire un
avertissement ou une erreur indiquant que le nombre ou l’ordre des Hooks a
changé entre deux rendus. Les Hooks doivent être appelés au niveau supérieur
du composant, toujours dans le même ordre, afin que React puisse associer
chaque Hook au bon état.

### Q5.5
Le résumé du header ne peut pas connaître les quantités des compteurs car
chaque `QuantityControl` possède son propre état local. Cet état est isolé
dans les composants enfants et n’est pas remonté vers `App`, qui calcule le
résumé à partir de `SAMPLE_CARDS`.

### Q7.1
Le state `query` doit vivre dans `App` car il sert à la fois à contrôler
`SearchBar` et à calculer `visibleCards` pour `CardGrid`. S’il vivait seulement
dans `SearchBar`, `App` ne connaîtrait pas la recherche et la grille ne
pourrait pas être filtrée correctement.

### Q7.2
`visibleCards` est une donnée dérivée de `cards`, `query` et `rarity`, donc il
ne doit pas être stocké dans un `useState`. Sinon, après une modification d’un
de ces états, on pourrait afficher une ancienne liste filtrée pendant qu’un
nouveau rendu est calculé, ou devoir synchroniser plusieurs états et créer
des incohérences. Le calcul direct garantit qu’il est toujours à jour.

### Q7.3
`setQuery` est déjà une fonction qui reçoit la nouvelle valeur et met à jour
le state. `SearchBar` appelle `onQueryChange` avec `event.target.value`, ce
qui correspond exactement à la signature attendue par `setQuery`. Il est
donc possible de transmettre directement `onQueryChange={setQuery}`.

### Q7.4
La recherche porte sur `card.name` et `card.set`, après suppression des
espaces autour et conversion en minuscules. Ainsi, la recherche
« fossile » trouve les cartes dont l’extension est « Fossile », sans modifier
les données originales.

### Q7.5
Oui, le titre reste juste. `visibleCards` est recalculé à chaque rendu à
partir de `cards`, et le retrait d’une carte met à jour `cards` dans `App`.
La liste filtrée et les compteurs du titre sont donc automatiquement
recalculés ; aucun code spécifique au filtre n’est nécessaire.

### Q8.1
En développement, `StrictMode` de React simule un cycle supplémentaire pour
détecter les effets qui ne sont pas correctement nettoyés : l’effet est
installé, son cleanup est exécuté, puis l’effet est installé à nouveau. En
production, cette double vérification de montage ne se produit pas ; l’effet
est installé une seule fois.

### Q8.2
Sans le cleanup, chaque installation ajoute un nouvel écouteur sans retirer
l’ancien. Avec le cycle de développement de `StrictMode`, le message
« Échap » s’afficherait alors deux fois pour une seule touche. Le cleanup
évite l’accumulation d’écouteurs, les traitements en double et les fuites de
ressources.

### Q8.3
Avec un tableau de dépendances vide, le titre est défini seulement au
montage et ne suit plus les changements de `value`. ESLint signale que
`value` est utilisé dans l’effet mais absent de ses dépendances. Sans tableau
de dépendances, l’effet s’exécute après chaque rendu, ce qui resynchronise le
titre mais effectue du travail inutile.

### Q8.4
`value` est entièrement dérivée de `cards`, donc la stocker dupliquerait une
information déjà disponible. Un state mis à jour dans un effet introduirait
un rendu intermédiaire avec une valeur ancienne et pourrait devenir
désynchronisé si une mise à jour est oubliée ; le calcul direct est toujours
cohérent et plus simple.

### Q8.5
Modifier le titre directement dans le corps du composant est un effet de
bord exécuté pendant le rendu. Le rendu doit rester déclaratif et sans effet
externe ; React peut rendre plusieurs fois ou abandonner un rendu. `useEffect`
exécute cette synchronisation après le rendu, avec des dépendances explicites
et un comportement prévisible.

### Q9.1
`useEffect` attend une fonction d’effet qui peut éventuellement renvoyer une
fonction de nettoyage, pas une promesse. Une fonction `async` renvoie toujours
une promesse ; React ne pourrait donc pas l’interpréter comme le cleanup.
Il faut appeler la fonction asynchrone dans l’effet et gérer la promesse avec
`.then()`/`.catch()`, ou avec une fonction interne `async`.

### Q9.2
Avec l’URL `/cardz`, le serveur répond normalement avec une erreur HTTP 404,
qui est affichée par l’application sous la forme `HTTP 404`. Sans le test
`!response.ok`, `fetch` considérerait quand même la réponse comme réussie,
puis `response.json()` pourrait échouer ou fournir une structure inattendue
au lieu de signaler clairement l’échec HTTP.

### Q9.3
En développement avec `StrictMode`, deux requêtes `cards` peuvent partir au
chargement : React monte l’effet, exécute son cleanup, puis le remonte pour
détecter les effets mal nettoyés. Ce n’est pas un bug et ce comportement de
vérification ne concerne pas la production. Le drapeau `ignore` empêche la
première requête de mettre à jour l’état après son cleanup.

### Q9.4
Supposons qu’une recherche ou un identifiant change alors qu’une première
requête est encore en vol. Si la requête la plus ancienne répond après la
nouvelle, elle pourrait écraser l’état avec des données obsolètes. Le cleanup
met `ignore` à `true` pour l’ancien effet ; sa réponse est alors ignorée et
seule la requête correspondant aux paramètres actuels peut mettre à jour
l’état.

### Q9.5
ESLint signale une violation des règles des Hooks, car le `useEffect` serait
appelé après un `return` conditionnel. Selon le chemin d’exécution, les Hooks
ne seraient pas appelés dans le même ordre à chaque rendu. React exige qu’ils
restent au niveau supérieur du composant, avant les retours anticipés.

### Q9.6
Un state unique avec `status` représente explicitement les états valides de la
requête et associe les données nécessaires à chacun. Trois states séparés
pourraient produire des combinaisons incohérentes, par exemple
`isLoading === true` avec `error !== null` et une ancienne liste `cards`
simultanément. La forme discriminée rend ces états absurdes impossibles.

### Q11.1
Sans Context, il faudrait faire descendre `favoriteIds` et `toggleFavorite`
depuis `App` jusqu’à `CardGrid`, puis jusqu’à `CardTile`, et transmettre
ensuite `cardId` ainsi que ces données à `FavoriteButton`. Il faudrait aussi
faire remonter l’intention de bascule du bouton jusqu’à `App` par plusieurs
callbacks. Cette transmission de props à travers des composants qui ne les
utilisent pas directement constitue du *prop drilling*.

### Q11.2
Si `<FavoritesCount />` est rendu en dehors de
`<FavoritesProvider>`, `useFavorites()` lève l’erreur explicite :
« useFavorites doit être appelé sous `<FavoritesProvider>` ». Cette erreur
vaut mieux qu’un `undefined` silencieux, car elle indique immédiatement la
cause et l’emplacement du mauvais assemblage de l’arbre des composants.

### Q11.3
Le Context ne possède pas lui-même les favoris. Il fournit une valeur aux
composants descendants. Les favoris vivent réellement dans le state
`favoriteIds` de `FavoritesProvider`; le Context permet de partager ce state et
la fonction `toggleFavorite`.

### Q11.4
Quand un favori change, les composants consommateurs de `FavoritesContext`,
notamment le `FavoriteButton` concerné et `FavoritesCount`, sont rendus à
nouveau. Les autres consommateurs peuvent également être réévalués selon
l’arbre et la valeur fournie. On réserve donc le Context aux données qui
changent peu : un changement de sa valeur peut invalider et rerendre de
nombreux consommateurs, ce qui rendrait son usage coûteux pour des données
très fréquemment modifiées.

### Q10.1
Ces fichiers contiennent uniquement du JavaScript et des Hooks personnalisés :
ils ne contiennent pas de JSX. L’extension `.js` décrit donc correctement
leur contenu, contrairement à un composant qui rend directement du JSX et
pourrait utiliser `.jsx`.

### Q10.2
Deux appels indépendants à `useCards()` déclenchent deux requêtes, car chaque
appel possède son propre state et son propre effet. Modifier une quantité dans
la première instance ne modifie pas la seconde. Un Hook personnalisé partage
sa logique, pas son state : chaque appel crée une instance indépendante.

### Q10.3
Si le Hook s’appelait `loadCards`, ESLint ne le reconnaîtrait pas comme un
Hook personnalisé. Il pourrait alors signaler que les Hooks appelés à
l’intérieur ne respectent pas les règles, et ne garantirait pas leur appel
uniquement au niveau supérieur d’un composant ou d’un autre Hook. Le préfixe
`use` permet aux outils de détecter cette convention.

### Q10.4
`useDocumentTitle` ne renvoie rien car son objectif est son effet secondaire :
il synchronise le titre du document et restaure l’ancien titre lors du
cleanup. Le composant appelant n’a pas besoin de recevoir une valeur en retour.