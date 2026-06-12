/* ==========================================================================
   CODE JAVASCRIPT POUR AFRITALENT - by NF
   ========================================================================== */

// On attend que toute la page HTML soit bien chargée avant de lancer notre code.
document.addEventListener("DOMContentLoaded", function () {
  
  /* ------------------------------------------------------------------------
     FONCTIONNALITÉ 1 & 2 : DARK / LIGHT MODE ET PERSISTANCE (LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  
  // 1. On sélectionne le bouton et l'icône dans le HTML grâce à leur identifiant (ID)
  const boutonTheme = document.getElementById("bouton-theme");
  const iconeTheme = document.getElementById("icone-theme");

  // 2. On vérifie si l'utilisateur est déjà venu et s'il avait choisi le thème sombre.
  // Le localStorage fonctionne comme une armoire avec des boîtes étiquetées (Clé / Valeur).
  // Ici, on regarde dans la boîte appelée "themeChoisi".
  const themeSauvegarde = localStorage.getItem("themeChoisi");

  // Si la boîte contenait le texte "sombre", alors on applique directement le thème sombre au démarrage
  if (themeSauvegarde === "sombre") {
    // classList.add permet d'ajouter une classe CSS à un élément (ici à la balise <body>)
    document.body.classList.add("theme-sombre");
    // On change l'icône de l'extension Bootstrap Icons pour mettre un soleil
    iconeTheme.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  // 3. On écoute le clic sur le bouton de changement de thème.
  // addEventListener veut dire : "Reste à l'écoute de l'événement 'click' sur ce bouton"
  boutonTheme.addEventListener("click", function () {
    
    // classList.toggle est magique : si la classe "theme-sombre" existe, il la supprime.
    // Si elle n'existe pas, il l'ajoute. Comme un interrupteur de lumière !
    document.body.classList.toggle("theme-sombre");

    // Maintenant, on vérifie si la classe a été ajoutée ou supprimée pour adapter l'icône et sauvegarder le choix
    if (document.body.classList.contains("theme-sombre")) {
      // Si le corps de la page a la classe sombre, on met l'icône du soleil
      iconeTheme.classList.replace("bi-moon-fill", "bi-sun-fill");
      // On écrit "sombre" dans notre boîte localStorage pour s'en souvenir la prochaine fois
      localStorage.setItem("themeChoisi", "sombre");
    } else {
      // Sinon, on remet l'icône de la lune
      iconeTheme.classList.replace("bi-sun-fill", "bi-moon-fill");
      // Et on écrit "clair" (ou on peut vider la boîte) dans le localStorage
      localStorage.setItem("themeChoisi", "clair");
    }
  });

  
  /* ------------------------------------------------------------------------
     FONCTIONNALITÉ 3 : NAVBAR DYNAMIQUE AU SCROLL (DÉFILEMENT)
     ------------------------------------------------------------------------ */
  
  // On sélectionne notre barre de navigation (qui possède la classe .site-navbar)
  const barreNavigation = document.querySelector(".site-navbar");

  // On écoute le défilement (scroll) de la fenêtre du navigateur (window)
  window.addEventListener("scroll", function () {
    
    // window.scrollY nous donne le nombre de pixels qui ont défilé vers le bas.
    // Si on a descendu de plus de 50 pixels :
    if (window.scrollY > 50) {
      // On ajoute la classe CSS qui réduit la taille et ajoute l'ombre
      barreNavigation.classList.add("navbar-defilement");
    } else {
      // Si on remonte tout en haut (moins de 50 pixels), on retire la classe
      barreNavigation.classList.remove("navbar-defilement");
    }
  });

  
  /* ------------------------------------------------------------------------
     FONCTIONNALITÉ 4 : BOUTON "RETOUR EN HAUT"
     ------------------------------------------------------------------------ */
  
  // On sélectionne le bouton de remontée par son ID
  const boutonRemonter = document.getElementById("bouton-remonter");

  // On utilise la même écoute de défilement pour afficher ou masquer le bouton
  window.addEventListener("scroll", function () {
    
    // Si l'utilisateur descend de plus de 300 pixels dans la page :
    if (window.scrollY > 300) {
      // On ajoute la classe "visible" définie dans notre CSS pour l'afficher en douceur
      boutonRemonter.classList.add("visible");
    } else {
      // Sinon, on lui retire la classe pour le masquer
      boutonRemonter.classList.remove("visible");
    }
  });

  // On écoute le clic sur ce bouton "Retour en haut"
  boutonRemonter.addEventListener("click", function () {
    
    // window.scrollTo permet de déplacer le défilement de la page.
    // On lui demande d'aller à la position top: 0 (le tout début de la page)
    // 'smooth' permet de faire une animation fluide et agréable au lieu d'un saut brusque.
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});