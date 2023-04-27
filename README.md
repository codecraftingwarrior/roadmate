# **[HAI806I] Projet MEAN**

**RoadMate** une application de covoiturage. Les utilisateurs peuvent partager des trajets en voiture avec d'autres passagers, réduisant ainsi les coûts de transport et l'impact environnemental. 

## **Auteurs**

- GUEYE EL HADJI AHMADOU
- BRAHAM AHMAD

## **Backend Node.JS**

### **Route API**


> __Authentifications__

- __[POST]__ `/api/carpooling/register` - Permet à un internaute de s'inscrire.

- __[POST]__ `/api/carpooling/login` - Permet à un internaute de s'authentifier et d'obtenir un token JWT pour pouvoir faire des requêtes à l'API.

> __Covoiturage__

- __[GET]__ `/api/carpooling/:id/book` - Permet de faire une reservation.

- __[POST]__ `/api/carpooling/store` - Permet de creer un offre de covoiturage.
- __[POST]__ `/api/carpooling/search` - Permet de faire une recherche de trajets disponible sur la base de plusieurs critères.
- __[DELETE]__ `/api/carpooling/delete/:id` - Permet de surpprimer un objet covoiturage.
- __[GET]__ `/api/carpooling/user/:email/find` - Permet de récuperer les annonces de covoiturages posté par un conducteur.
- __[PUT]__ `/api/carpooling/find-cities` - Permet de récuperer toutes les villes ayant au moins un trajet.
- __[GET]__ `/api/carpooling/:userEmail/bookings` - Permet de récupérer les réservations d'un internautes

> __Internautes__

- __[GET]__ `/api/internautes/find/:id` - Permet de recuperer un internaute par son id

- __[PUT]__ `/api/internautes/update/:id` - Permet de mettre à jour les informations d'un internaute

### **Middleware**

- __`jwtTokenVerifier`__ - Permet d'authentifier les requêtes entrantes (verifie si le token est bien présent dans l'entête de toutes les requêtes entrantes devant être authentifié et verifie leur authenticité)

### **Modéle Mongoose**

- `Covoiturage`
- `Internautes`

## **Front End Angular**

### **Modules**

- `AuthModule`

- `SharedModule`

- `AppModule`

### **Composants**

> **Authentification**

- `login` - Connexion

- `register` - Inscription

> **Workspace**

Espace personnel d'un internaute ou d'un conducteur


> **Offre / Trajet**

- `offer-list` -- Liste des différentes offres

- `offer-add` -- Permet de poster une offre 

- `offer-detail` -- Voir les detail d'une offre

- `offer-map` -- Permet d'afficher la trajectoire d'une offre de covoiturage

- `offer-update` -- Permet de mettre à jour une offre

Tous ces composants sont les composant enfant de _workspace_

> **Internautes**

- `user-informations` -- Affiche les informations de l'utilisateur connecté

- `user-update-informations` -- Met à jour les informations de l'utilisateur connecté

> **Reservations**

- `booking-list` -- Permet d'afficher les reservations de l'utilisateur connecté

> **General**

- `home` - Page d'acceuil

- `journey` - Permet d'afficher le formulaire de recherche ainsi que les resultats.

### **Guards**

- `isAnonymous` - Gére la redirection au niveau des routes autorisées uniquement pour l'utilisateur non connecté.
- `isAuthenticated` - Gére la redirection au niveau des routes autorisées uniquement pour l'utilisateur  authentifié. 

### **HTTP Interceptor**

- `jwtInterceptor` - Attache le token de l'utilisateur authentifié à toutes les requêtes sortantes à direction de l'API.


### **API Externes**

- **Google Place API** - Permet à l'utilisateur de bénéficier d'une autocomplétion d'adresse afin qu'il puisse saisir son adresse exacte nous récupérons ensuite les coordonnées GPS.
- **Leaflet** - Nous permet d'afficher une carte avec la trajectoire d'un covoiturage donnée.

## **Contenu du zip**

```bash
backend-app/
├── .env
├── data
│   ├── covoiturages.json
│   ├── import-data.sh
│   └── internautes.json
├── middleware
│   └── auth.js
├── models
│   ├── Covoiturage.js
│   └── Internaute.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.routes.js
│   ├── covoiturage.routes.js
│   └── internaute.routes.js
└── server.js
front-end-app/src
├── app
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── auth
│   │   ├── auth-routing.module.ts
│   │   ├── auth.component.html
│   │   ├── auth.component.scss
│   │   ├── auth.component.spec.ts
│   │   ├── auth.component.ts
│   │   ├── auth.module.ts
│   │   ├── login
│   │   └── register
│   ├── core
│   │   ├── booking
│   │   ├── offer
│   │   ├── user
│   │   └── workspace
│   ├── home
│   │   ├── home.component.html
│   │   ├── home.component.scss
│   │   └── home.component.ts
│   ├── journey
│   │   ├── journey.component.html
│   │   ├── journey.component.scss
│   │   ├── journey.component.spec.ts
│   │   └── journey.component.ts
│   ├── models
│   │   ├── Covoiturage.model.ts
│   │   └── Internaute.model.ts
│   ├── shared
│   │   ├── globals.ts
│   │   ├── interceptors
│   │   ├── services
│   │   └── shared.module.ts
│   └── theme
│       ├── footer
│       └── menu
├── assets
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── about.png
│   │   ├── apple-touch-icon.png
│   │   ├── cta-bg.jpg
│   │   ├── favicon.png
│   │   ├── hero-bg.jpg
│   │   ├── hero-img.png
│   │   └── search.png
│   ├── js
│   ├── scss
│   └── vendor
├── environments
│   ├── environment.development.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
├── styles.scss
└── theme.less
```

## **Installation**

Le fichier zippé ne contient pas toutes les dépendances nécessaire à l'execution du projet.


### Peuplement de la base de donnée

```bash
cd backend-app/data
mongosh --port 27017
use covoiturage_db
exit
mongoimport --db covoiturage_db --collection internautes --file internautes.json --jsonArray --drop
mongoimport --db covoiturage_db --collection covoiturages --file covoiturages.json --jsonArray --drop
```

### Paramétrage du backend

Dans le fichier `.env` paramétrer la variable `DB_URL` à votre guise

```bash
cd backend-app/
npm i
```

### Paramétrage du projet front-end

```bash
npm i -g nodemon
cd front-end-app/
ng new co-roadmate
rm -rf co-roadmate/src co-roadmate/package.json
mv src package.json co-roadmate/
cd co-roadmate/
npm i
```

## **Exécution**

### Lancement du serveur back-end

```bash
cd backend-app/
nodemon server
```

### Lancement front-end

```bash
cd front-end-app/co-roadmate/
ng serve -o
```

## **Aperçu du projet**

Accéder à l'url http://localhost:4200/

### Connexion et inscription
> Connexion
<img src="images/login.png" alt="login" width="750"/>

>Inscription
<img src="images/register.png" alt="register" width="750"/>

### Accueil

<img src="images/home.png" alt="homepage" width="750"/>

### Liste des offres

<img src="images/travels.png" alt="add" width="750"/>

### Espace personnel - client
> Mes informations
<img src="images/client1.png" alt="login" width="750"/>

> Mes Reservations 
<img src="images/client2.png" alt="register" width="750"/>



### Espace personnel - conducteur
> Mes informations
<img src="images/conducteur1.png" alt="login" width="750"/>

>Mes Trajets
<img src="images/conducteur2.png" alt="register" width="750"/>

>Ajout d'offre
<img src="images/ajout-offre.png" alt="register" width="750"/>


