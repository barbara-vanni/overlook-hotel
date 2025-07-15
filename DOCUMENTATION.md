# 🏨 Aladdin's Hotel - Documentation

## 📋 Vue d'ensemble

Aladdin's Hotel est une application web complète de gestion hôtelière permettant aux clients de réserver des chambres et aux administrateurs de gérer les réservations. Le système comprend un backend Spring Boot avec PostgreSQL et un frontend React avec Material-UI.

## 🛠️ Technologies utilisées

### Backend
- **Java 21** avec Spring Boot 3.4.5
- **Spring Data JPA** pour l'accès aux données
- **PostgreSQL** comme base de données
- **Spring Security** pour l'authentification
- **Maven** pour la gestion des dépendances

### Frontend
- **React 19.1.0** avec TypeScript
- **Material-UI (MUI)** pour l'interface utilisateur
- **Vite** comme bundler de développement
- **React Router** pour la navigation
- **Axios** pour les appels API

### Authentification
- **Supabase** pour la gestion des utilisateurs
- **JWT** pour les tokens d'authentification

## 🏗️ Architecture du projet

```
overlook-hotel/
├── src/main/java/backend/overlook_hotel/     # Backend Spring Boot
│   ├── controller/                           # Contrôleurs REST
│   ├── model/                               # Entités JPA
│   ├── repository/                          # Repositories JPA
│   ├── service/                             # Services métier
│   ├── dto/                                 # Data Transfer Objects
│   └── config/                              # Configuration (CORS, Security)
├── frontend/                                # Frontend React
│   ├── src/
│   │   ├── components/                      # Composants réutilisables
│   │   ├── pages/                          # Pages principales
│   │   ├── context/                        # Contextes React
│   │   └── assets/                         # Images et ressources
│   └── public/                             # Fichiers statiques
└── src/main/resources/                     # Configuration backend
```

## 🔐 Système d'authentification

### Rôles utilisateurs
- **Client** : Peut consulter et réserver des chambres
- **Admin** : Peut gérer les clients et réserver pour eux
- **Employee** : Accès aux fonctionnalités employés

### Flux d'authentification
1. Connexion via Supabase
2. Récupération du token JWT
3. Validation du rôle côté backend
4. Redirection selon le rôle

## 🗄️ Modèle de données

### Entités principales

#### Client
```java
- id (UUID)
- firstName (String)
- lastName (String)
- email (String)
- phone (String)
- birth (LocalDate)
```

#### Room (Chambre)
```java
- id (UUID)
- type (String)
- capacity (Integer)
- status (String: "available", "reserved")
```

#### Reservation
```java
- id (UUID)
- client (Client)
- room (Room)
- enterDate (LocalDate)
- endDate (LocalDate)
- cancel (Boolean)
- stat (String: "pending", "confirmed", "active", "completed")
```

## 🌐 API REST

### Endpoints principaux

#### Chambres
- `GET /api/rooms` - Liste toutes les chambres
- `GET /api/rooms/available` - Chambres disponibles
- `GET /api/rooms/{id}/availability` - Vérifier disponibilité

#### Réservations
- `GET /api/reservations` - Liste des réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations/client/{clientId}` - Réservations d'un client

#### Clients
- `GET /api/clients` - Liste des clients
- `GET /api/clients/{id}` - Détails d'un client
- `POST /api/clients` - Créer un client

## 🎨 Interface utilisateur

### Pages principales

#### Pour les clients
- **Home** (`/`) - Page d'accueil avec présentation de l'hôtel
- **Rooms** (`/rooms`) - Catalogue des chambres disponibles
- **Reservations** (`/reservations`) - Formulaire de réservation
- **UserDashboard** (`/user-dashboard`) - Tableau de bord client

#### Pour les administrateurs
- **Admin** (`/admin`) - Gestion des clients
- **Employee** (`/employee`) - Interface employé

### Composants clés

#### Header
- Navigation adaptive selon le rôle
- Menu burger responsive
- Gestion de la déconnexion

#### RoomCard
- Affichage attrayant des chambres
- Informations sur la capacité et le type
- Boutons d'action contextuels

#### ClientReservations
- Liste des réservations d'un client
- Statuts visuels (chips colorés)
- Navigation vers nouvelles réservations

#### ReservationModal
- Formulaire de réservation avancé
- Sélection de dates et chambres
- Validation en temps réel

## 🔄 Workflow de réservation

### Pour un client
1. Sélection du nombre d'invités
2. Choix des dates d'arrivée et départ
3. Sélection d'une chambre disponible
4. Saisie des informations personnelles
5. Confirmation de la réservation

### Pour un admin (réservation pour un client)
1. Sélection d'un client depuis la liste admin
2. Affichage des informations détaillées du client
3. Accès au formulaire de réservation pré-rempli
4. Validation et création de la réservation

## 📱 Fonctionnalités spéciales

### Affichage client pour les admins
Quand un admin réserve pour un client, l'interface affiche :
- **Informations complètes du client** dans une carte dédiée
- **Nom complet**, email, téléphone, date de naissance
- **Bouton d'accès au profil complet** du client
- **Masquage des champs personnels** dans le formulaire

### Gestion des statuts
- **Chambres** : `available` ↔ `reserved`
- **Réservations** : `pending` → `confirmed` → `active` → `completed`

### Responsive Design
- Interface adaptative mobile/desktop
- Navigation optimisée tactile
- Composants Material-UI responsive

## 🚀 Installation et démarrage

### Prérequis
- Java 21+
- Node.js 18+
- PostgreSQL
- Maven

### Configuration

#### Backend
1. Configurer PostgreSQL dans `application.yml`
2. Ajuster les contraintes de base de données
3. Démarrer avec `mvn spring-boot:run`

#### Frontend
1. Installer les dépendances : `npm install`
2. Configurer `.env` avec les URLs Supabase et backend
3. Démarrer avec `npm run dev`



## 🔧 Configuration de production

### Backend
- Configurer les profils Spring (`dev`, `prod`)
- Optimiser les connexions base de données
- Activer le cache si nécessaire

### Frontend
- Build optimisé : `npm run build`
- Configuration du proxy pour l'API
- Optimisation des assets

## 🐛 Débogage courant

### Erreurs de contraintes base de données
- Vérifier les valeurs autorisées pour `room.status` et `reservation.stat`
- S'assurer que les contraintes CHECK sont respectées

### Erreurs de connexion
- Vérifier que l'URL de l'API correspond à la configuration backend
- Contrôler les paramètres CORS

### Problèmes d'authentification
- Vérifier la configuration Supabase
- Contrôler la validité des tokens JWT


---


