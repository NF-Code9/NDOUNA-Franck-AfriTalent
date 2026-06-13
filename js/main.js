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

  /* ------------------------------------------------------------------------
     ANIMATION 1 : LES COMPTEURS DE STATISTIQUES DYNAMIQUES
     ------------------------------------------------------------------------ */

  // Cette fonction s'occupe de faire grimper le chiffre d'un compteur de 0 à sa cible
  function lancerAnimationChiffre(baliseChiffre) {
    // On récupère la valeur finale stockée dans l'attribut HTML data-cible (ex: "1200")
    // Le parseInt permet de transformer du texte en un vrai nombre mathématique
    const valeurCible = parseInt(baliseChiffre.getAttribute("data-cible"));
    
    // On commence le compteur à 0
    let valeurActuelle = 0;
    
    // Vitesse de l'animation : plus le chiffre est grand, plus on augmente vite
    // On divise par 50 pour que l'animation dure environ la même durée pour tous
    const increment = Math.ceil(valeurCible / 50);

    // setInterval permet de répéter une action toutes les X millisecondes (ici toutes les 30ms)
    const minuteur = setInterval(function () {
      // On ajoute l'incrément à la valeur actuelle
      valeurActuelle = valeurActuelle + increment;

      // Si on a atteint ou dépassé la cible :
      if (valeurActuelle >= valeurCible) {
        valeurActuelle = valeurCible; // On force la valeur pile sur la cible
        clearInterval(minuteur); // On arrête définitivement le minuteur répété
      }

      // On met à jour le texte affiché sur la page HTML
      baliseChiffre.textContent = valeurActuelle;
    }, 30); // 30 millisecondes d'attente entre chaque étape
  }

  // Configuration du surveillant pour les chiffres
  const observateurChiffres = new IntersectionObserver(function (entrées, surveillant) {
    // Le surveillant nous donne une liste d'éléments qu'il a vus bouger
    entrées.forEach(function (entrée) {
      // Est-ce que l'élément est devenu visible à l'écran ?
      if (entrée.isIntersecting) {
        // On récupère la balise HTML exacte du chiffre
        const chiffreAAnimer = entrée.target;
        
        // On lance l'animation de défilement
        lancerAnimationChiffre(chiffreAAnimer);
        
        // Très important : On dit au surveillant d'arrêter de regarder ce chiffre.
        // Comme ça, l'animation ne se re-déclenche pas si on remonte et redescend.
        surveillant.unobserve(chiffreAAnimer);
      }
    });
  });

  // On sélectionne tous nos compteurs dans la page
  const tousLesCompteurs = document.querySelectorAll(".compteur-stat");
  
  // On donne chaque compteur à notre surveillant pour qu'il les guette
  tousLesCompteurs.forEach(function (compteur) {
    observateurChiffres.observe(compteur);
  });


  /* ------------------------------------------------------------------------
     ANIMATION 2 : LES FONDUS DE SECTIONS (FADE-IN AU SCROLL)
     ------------------------------------------------------------------------ */

  // Configuration du surveillant pour les apparitions de sections
  const observateurSections = new IntersectionObserver(function (entrées, surveillant) {
    entrées.forEach(function (entrée) {
      // Si la section arrive dans l'écran de l'utilisateur :
      if (entrée.isIntersecting) {
        // On lui ajoute la classe CSS ".visible" qui déclenche l'effet de transition CSS
        entrée.target.classList.add("visible");
        
        // On arrête de surveiller cette section puisqu'elle est affichée définitivement
        surveillant.unobserve(entrée.target);
      }
    });
  }, {
    // Option du surveillant : déclencher l'action dès que 15% de la section est visible
    threshold: 0.15 
  });

  // On sélectionne toutes les sections qui doivent s'animer
  const toutesLesSections = document.querySelectorAll(".section-animee");

  // On demande au surveillant de regarder chacune de ces sections
  toutesLesSections.forEach(function (section) {
    observateurSections.observe(section);
  });

});