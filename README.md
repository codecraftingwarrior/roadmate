# **RoadMate**

**RoadMate** is a web application built with Angular and Node.js that allows users to book and manage their travel itineraries. The app uses Mapbox to display maps and search for locations, and allows users to select travel dates, routes, and transportation options. Users can also manage their profile information, view their travel history. The backend is built with Node.js and MongoDB, and includes RESTful APIs for user authentication and data management. The frontend is built with Angular and includes components for displaying maps, search results, and travel information. 

## Features
- Search for destinations using the Google Place API and ability to view the results on a map using MapBoxAPI
- Ability to create driver or customer account
- Create and manage trip itineraries with multiple destinations
- Get directions and estimated travel times using the Leaflet Routing API

## Technologies

- Angular framework for building the frontend
- Node.js and Express for building the backend API
- MongoDB as the database
- Google Place API for location search
- MapBox API for map display, routing and directions

## **Setup**

### Populating the datebase

```bash
cd backend-app/data
mongosh --port 27017
use carpooling_db
exit
mongoimport --db carpooling_db --collection internautes --file internautes.json --jsonArray --drop
mongoimport --db carpooling_db --collection covoiturages --file covoiturages.json --jsonArray --drop
```

### Configure backend application

Update the `DB_URL` variable in the `.env` file.

```bash
npm i -g nodemon
cd backend-app/
npm i
```

### Configure front-end application

```bash
cd front-end-app/
npm i
```

## **Execution**

### Run back-end application

```bash
cd backend-app/
nodemon server
```

### Run front-end application

```bash
cd front-end-app
ng serve -o
```

## **Screenshots**

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


