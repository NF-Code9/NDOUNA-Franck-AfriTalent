/* ==========================================================================
   AFRITALENT JAVASCRIPT - by NF
   ========================================================================== */

// CE GROS BLOC REGROUPE TOUT : Il attend que le HTML soit complètement prêt 
// et chargé par le navigateur avant de lancer notre code.
document.addEventListener("DOMContentLoaded", function () {
  
  /* ------------------------------------------------------------------------
     1. DARK / LIGHT MODE ET PERSISTANCE (LOCALSTORAGE)
     ------------------------------------------------------------------------ */
  const boutonTheme = document.getElementById("bouton-theme");
  const iconeTheme = document.getElementById("icone-theme");

  // On vérifie s'il y a un thème déjà sauvegardé dans la mémoire "localStorage" du navigateur
  const themeSauvegarde = localStorage.getItem("themeChoisi");

  if (themeSauvegarde === "sombre") {
    document.body.classList.add("theme-sombre");
    if (iconeTheme) {
      iconeTheme.classList.replace("bi-moon-fill", "bi-sun-fill");
    }
  }

  // Si le bouton existe sur la page, on écoute le clic de l'utilisateur
  if (boutonTheme) {
    boutonTheme.addEventListener("click", function () {
      document.body.classList.toggle("theme-sombre");

      if (document.body.classList.contains("theme-sombre")) {
        if (iconeTheme) iconeTheme.classList.replace("bi-moon-fill", "bi-sun-fill");
        localStorage.setItem("themeChoisi", "sombre"); // On s'en rappelle pour la prochaine fois
      } else {
        if (iconeTheme) iconeTheme.classList.replace("bi-sun-fill", "bi-moon-fill");
        localStorage.setItem("themeChoisi", "clair"); // On s'en rappelle pour la prochaine fois
      }
    });
  }


  /* ------------------------------------------------------------------------
     2. NAVBAR DYNAMIQUE AU SCROLL (EFFET SHRINK & OMBRE)
     ------------------------------------------------------------------------ */
  const barreNavigation = document.querySelector(".site-navbar");

  window.addEventListener("scroll", function () {
    if (barreNavigation) {
      if (window.scrollY > 50) {
        barreNavigation.classList.add("navbar-defilement"); // On applique le style CSS
      } else {
        barreNavigation.classList.remove("navbar-defilement"); // On l'enlève tout en haut de la page
      }
    }
  });


  /* ------------------------------------------------------------------------
     3. BOUTON "RETOUR EN HAUT"
     ------------------------------------------------------------------------ */
  const boutonRemonter = document.getElementById("bouton-remonter");

  window.addEventListener("scroll", function () {
    if (boutonRemonter) {
      if (window.scrollY > 300) {
        boutonRemonter.classList.add("visible"); // Rend le bouton visible à l'écran
      } else {
        boutonRemonter.classList.remove("visible"); // Cache le bouton
      }
    }
  });

  if (boutonRemonter) {
    boutonRemonter.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Remontée fluide et douce vers le haut
      });
    });
  }


  /* ------------------------------------------------------------------------
     4. COMPTEURS DE STATISTIQUES DYNAMIQUES (IntersectionObserver)
     ------------------------------------------------------------------------ */
  function lancerAnimationChiffre(baliseChiffre) {
    // On récupère la valeur cible (ex: data-cible="1200") et on la convertit en vrai nombre mathématique
    const valeurCible = parseInt(baliseChiffre.getAttribute("data-cible"));
    let valeurActuelle = 0;
    
    // On calcule un incrément pour que les grands et les petits chiffres grimpent à la même vitesse
    const increment = Math.ceil(valeurCible / 50);

    // setInterval crée un minuteur répétitif (toutes les 30 millisecondes)
    const minuteur = setInterval(function () {
      valeurActuelle = valeurActuelle + increment;
      
      // Si on atteint ou dépasse la valeur cible finale :
      if (valeurActuelle >= valeurCible) {
        valeurActuelle = valeurCible; // On force sur le chiffre pile
        clearInterval(minuteur); // On détruit le minuteur pour économiser la mémoire
      }
      
      // On affiche la valeur en cours sur le site
      baliseChiffre.textContent = valeurActuelle;
    }, 30);
  }

  // L'observateur guette le moment où le compteur apparaît à l'écran
  const observateurChiffres = new IntersectionObserver(function (entrees, surveillant) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        lancerAnimationChiffre(entree.target); // On démarre l'animation du chiffre visible
        surveillant.unobserve(entree.target); // On arrête de le surveiller pour ne plus la relancer
      }
    });
  });

  const tousLesCompteurs = document.querySelectorAll(".compteur-stat");
  tousLesCompteurs.forEach(function (compteur) {
    observateurChiffres.observe(compteur); // On donne chaque compteur à guetter au surveillant
  });


  /* ------------------------------------------------------------------------
     5. FONDUS DE SECTIONS AU DÉFILEMENT (FADE-IN EFFECT)
     ------------------------------------------------------------------------ */
  // L'observateur guette quand une grande section entre dans l'écran de l'utilisateur
  const observateurSections = new IntersectionObserver(function (entrees, surveillant) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add("visible"); // On ajoute la classe CSS qui déclenche la transition douce
        surveillant.unobserve(entree.target); // On arrête de la surveiller une fois visible
      }
    });
  }, { threshold: 0.15 }); // Se déclenche dès que 15% de la section est visible dans l'écran

  const toutesLesSections = document.querySelectorAll(".section-animee");
  toutesLesSections.forEach(function (section) {
    observateurSections.observe(section); // On abonne chaque section à la surveillance
  });


  /* ------------------------------------------------------------------------
     6. FILTRAGE DYNAMIQUE DES FREELANCES (freelances.html)
     ------------------------------------------------------------------------ */
  const tousLesBoutonsFiltre = document.querySelectorAll(".btn-filtre");
  const toutesLesCartesFreelances = document.querySelectorAll(".carte-freelance-item");

  tousLesBoutonsFiltre.forEach(function (boutonClicke) {
    boutonClicke.addEventListener("click", function () {
      // On regarde la valeur de "data-categorie" sur le bouton cliqué (ex: "web", "design")
      const categorieCible = boutonClicke.getAttribute("data-categorie");

      // Gestion graphique active/inactive des boutons de filtrage
      tousLesBoutonsFiltre.forEach(function (bouton) {
        bouton.classList.remove("btn-brand");
        bouton.classList.add("btn-outline-brand");
      });
      boutonClicke.classList.remove("btn-outline-brand");
      boutonClicke.classList.add("btn-brand");

      // Tri intelligent et instantané des profils
      toutesLesCartesFreelances.forEach(function (carte) {
        // On récupère la catégorie propre à ce freelance précis
        const categorieFreelance = carte.getAttribute("data-categorie");
        
        // Si on a cliqué sur "tous" OU si la catégorie de la carte correspond au filtre choisi :
        if (categorieCible === "tous" || categorieCible === categorieFreelance) {
          carte.classList.remove("masquer-element"); // On montre le profil
        } else {
          carte.classList.add("masquer-element"); // On cache le profil (via display: none !important)
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
     7. VALIDATION COMPLÈTE DU FORMULAIRE DE CONTACT (contact.html)
     ------------------------------------------------------------------------ */
  const formulaire = document.getElementById("formulaire-contact");

  // Sécurité essentielle : on vérifie que le formulaire existe bien sur la page courante
  if (formulaire) {
    formulaire.addEventListener("submit", function (evenement) {
      
      // EXPLICATION CRUCIALE DE MR ROBERT : event.preventDefault() bloque le rechargement forcé de la page.
      // Cela nous donne la main pour inspecter les entrées en JavaScript d'abord !
      evenement.preventDefault();

      // Sélection de tes cases de saisie HTML (inputs)
      const champNom = document.getElementById("nom");
      const champPrenom = document.getElementById("prenom");
      const champEmail = document.getElementById("email");
      const champSujet = document.getElementById("sujet");
      const champMessage = document.getElementById("message");

      // Sélection précise de tes zones de messages d'erreurs et de succès
      const zoneErreurNom = document.getElementById("erreur-nom");
      const zoneErreurPrenom = document.getElementById("erreur-prenom");
      const zoneErreurEmail = document.getElementById("erreur-email");
      const zoneErreurSujet = document.getElementById("erreur-sujet");
      const zoneErreurMessage = document.getElementById("erreur-message");
      const zoneSuccesGlobal = document.getElementById("message-succes");

      // Réinitialisation globale : On efface les anciens textes avant de refaire l'analyse
      zoneErreurNom.textContent = "";
      zoneErreurPrenom.textContent = "";
      zoneErreurEmail.textContent = "";
      zoneErreurSujet.textContent = "";
      zoneErreurMessage.textContent = "";
      zoneSuccesGlobal.classList.add("d-none"); // On cache l'alerte verte de succès

      // On crée un interrupteur logique. Si une seule erreur est croisée, il basculera sur "false".
      let formulaireValide = true;

      // --- VALIDATION 1 : LE NOM ---
      // .trim() retire les espaces vides involontaires tapés au début ou à la fin du texte
      if (champNom && champNom.value.trim() === "") {
        zoneErreurNom.textContent = "Le nom est obligatoire.";
        formulaireValide = false; // Formulaire invalide !
      }

      // --- VALIDATION 2 : LE PRÉNOM ---
      if (champPrenom && champPrenom.value.trim() === "") {
        zoneErreurPrenom.textContent = "Le prénom est obligatoire.";
        formulaireValide = false;
      }

      // --- VALIDATION 3 : L'EMAIL AVEC REGEX ---
      // C'est un gabarit textuel standard qui contrôle la structure (présence du @, du point et de l'extension)
      const modeleEmailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (champEmail) {
        if (champEmail.value.trim() === "") {
          zoneErreurEmail.textContent = "L'adresse email est obligatoire.";
          formulaireValide = false;
        } else if (modeleEmailValide.test(champEmail.value.trim()) === false) {
          // .test() renvoie 'false' si l'email écrit ne ressemble pas du tout au modèle attendu
          zoneErreurEmail.textContent = "Veuillez entrer une adresse email valide.";
          formulaireValide = false;
        }
      }

      // --- VALIDATION 4 : LE SUJET SELECTIONNÉ ---
      if (champSujet && champSujet.value === "") {
        zoneErreurSujet.textContent = "Veuillez sélectionner un sujet dans la liste.";
        formulaireValide = false;
      }

      // --- VALIDATION 5 : LE MESSAGE ---
      if (champMessage) {
        if (champMessage.value.trim() === "") {
          zoneErreurMessage.textContent = "Le message ne peut pas être vide.";
          formulaireValide = false;
        } else if (champMessage.value.trim().length < 20) {
          // .length compte les lettres saisies. On exige un minimum de 20 caractères.
          zoneErreurMessage.textContent = "Votre message doit contenir au moins 20 caractères.";
          formulaireValide = false;
        }
      }

      // --- ENVOI REUSSI ---
      // Si après tous les examens l'interrupteur est resté sur true, tout est parfait !
      if (formulaireValide === true) {
        zoneSuccesGlobal.classList.remove("d-none"); // On affiche ton bandeau vert Bootstrap
        formulaire.reset(); // On réinitialise et vide proprement toutes les cases du formulaire
      }
    });
  }

});