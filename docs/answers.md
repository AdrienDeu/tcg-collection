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