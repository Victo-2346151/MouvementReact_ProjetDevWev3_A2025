# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# MouvementExpress – Application Web

Application web développée avec React permettant de gérer des mouvements d’inventaire
via une API REST sécurisée.

L’application est responsive (mobile first), internationalisée (Français / Anglais)  
et nécessite une authentification pour accéder aux fonctionnalités principales.

---

## Technologies utilisées

- React (fonctionnel)
- TypeScript
- Vite
- React Router
- React Context (authentification)
- React-Intl (internationalisation)
- Axios
- Tailwind CSS

## Application publiée
https://thankful-tree-09266270f.3.azurestaticapps.net

## Authentification

L’accès aux fonctionnalités de gestion des mouvements nécessite une authentification.

Identifiants de test

Courriel : admin@test.com
Mot de passe : admin123
Un token JWT est généré par l’API et stocké dans le navigateur.

## Communication avec l’API

L’application communique avec l’API suivante :
https://mouvementapplication-a8eyh3dyhnfef2d2.canadacentral-01.azurewebsites.net/api

Toutes les méthodes HTTP suivantes sont utilisées :
- GET (liste, détail, filtres)
- POST
- PUT
- DELETE
- 
##Fonctionnalités principales

- Connexion / Déconnexion
- Affichage de la liste des mouvements
- Filtres par type d’opération et urgence
- Ajout d’un mouvement (formulaire)
- Modification d’un mouvement
- Suppression d’un mouvement
- Changement de langue (FR / EN)

---

## Décomposition en composants

L’application est décomposée en plusieurs composants :

- `LoginPage`
- `ListMouvementsPage`
- `AddMouvementPage`
- `EditMouvementPage`
- `Menu`
- `AuthContext`


## Internationalisation (Lang)

L’application est entièrement internationalisée en **Français** et **Anglais** à l’aide de **React-Intl**.

- Textes
- Messages d’erreur
- Boutons
- Labels de formulaire

Fichiers de traduction :

src/lang/fr.json
src/lang/en.json

Un sélecteur de langue permet de changer dynamiquement la langue de l’application.

## Validations côté interface

- Champs requis
- Valeurs numériques valides
- Date d’opération non future
- Messages d’erreur affichés à l’utilisateur
- Cohérence avec les validations serveur

## Design et responsivité

- Approche mobile first
- Interface responsive
- Affichage correct sur :
  - Mobile
  - Tablette
  - Ordinateur

##Installation locale:

### Cloner le projet

```bash
git clone <URL_DU_DEPOT_REACT>
cd MouvementReact

2️- Installer les dépendances

npm install

3️- Créer le fichier .env.production (si nécessaire)

VITE_API_URL=https://mouvementapplication-a8eyh3dyhnfef2d2.canadacentral-01.azurewebsites.net/api

4️- Lancer l’application

npm run dev

Compilation production

npm run build

Auteur:
Achraf Errihani
Projet intégrateur – Développement Web
Cégep de Victoriaville
