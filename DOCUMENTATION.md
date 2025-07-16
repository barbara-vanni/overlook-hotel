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
1. Navigation vers la page des chambres (`/rooms`)
2. Sélection d'une chambre disponible
3. Ajout au panier avec dates et nombre de personnes
4. Révision dans le panier (`/cart`)
5. Confirmation de la réservation → **Enregistrement automatique en base de données**

### Système de panier
- **Ajout d'éléments** : Via le modal de réservation dans `/rooms`
- **Gestion des données** : Contexte React (`CartContext`) avec localStorage
- **Validation** : Vérification des dates et données avant finalisation
- **Sauvegarde** : Création automatique des réservations en base via l'API
- **Mise à jour des statuts** : Les chambres passent automatiquement en statut "reserved"

#### Processus de finalisation (Cart.tsx → handleCheckout)
1. **Validation utilisateur** : Vérification de l'authentification JWT
2. **Validation des données** : Contrôle des dates et informations de réservation
3. **Appels API simultanés** : 
   - `POST /api/reservations` pour chaque chambre du panier
   - `PUT /api/rooms/{id}` pour mettre à jour le statut en "reserved"
4. **Gestion d'erreurs** : Rollback en cas d'échec partiel
5. **Confirmation** : Notification utilisateur et redirection vers `/reservations`

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

### Variables d'environnement (.env)
```properties
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:8080/overlook_hotel
```

## 🖼️ Système d'images dynamiques

### Association type de chambre → image
Le système associe automatiquement les images aux chambres selon leur type :

| Type de chambre | Image utilisée | Fichier | Priorité |
|-----------------|----------------|---------|----------|
| **Royal Suite**, Suite Royale | Chambre5 | `Chambre5.webp` | 🔥 Très haute |
| **Jasmin Suite** | JasminSuitePicture | `JasminSuitePicture.jpg` | 🔥 Très haute |
| **Deluxe Suite**, Suite Deluxe | Chambre2 | `Chambre2.webp` | 🔥 Très haute |
| **Premium Suite**, Suite Premium | Chambre4 | `Chambre4.webp` | 🔥 Très haute |
| **Royal**, Royale | Chambre5 | `Chambre5.webp` | ⭐ Haute |
| **Jasmin** | JasminSuitePicture | `JasminSuitePicture.jpg` | ⭐ Haute |
| **Deluxe**, Luxury | Chambre2 | `Chambre2.webp` | ⭐ Haute |
| **Standard**, Classique | Chambre3 | `Chambre3.jpg` | ⭐ Haute |
| **Premium**, Supérieur | Chambre4 | `Chambre4.webp` | ⭐ Haute |
| **Familial**, Family | Chambre6 | `Chambre6.jpg` | ⭐ Haute |
| **Sahara**, Désert | Sahara | `sahara.jpg` | ⭐ Haute |
| **Oasis** | SaharaOasis | `sahara_oasis.jpg` | ⭐ Haute |
| **Palais**, Palace | Palais | `palais.jpg` | ⭐ Haute |
| **Suite** (générique) | JasminSuitePicture | `JasminSuitePicture.jpg` | 🔍 Fallback |
| **Par défaut** | JasminSuitePicture | `JasminSuitePicture.jpg` | 🔍 Fallback |

### Fonctionnement
La fonction `getRoomImage(roomType)` dans `Rooms.tsx` :
1. Convertit le type en minuscules
2. Recherche des mots-clés dans le type **par ordre de priorité**
3. Retourne l'image correspondante
4. Utilise une image par défaut si aucune correspondance

### ⚠️ **Ordre des conditions important !**
Le système vérifie les conditions **du plus spécifique au plus général** :

```typescript
// ✅ CORRECT : Spécifique d'abord
if (type.includes('royal suite')) {
    return Chambre5; // Royal Suite → Chambre5
} else if (type.includes('suite')) {
    return JasminSuitePicture; // Suite générique → JasminSuite
}

// ❌ INCORRECT : Générique d'abord
if (type.includes('suite')) {
    return JasminSuitePicture; // "Royal Suite" → JasminSuite (ERREUR!)
} else if (type.includes('royal suite')) {
    return Chambre5; // Ne sera jamais atteint!
}
```

**Pourquoi ça marche maintenant :**
- `"Royal Suite"` → vérifie `'royal suite'` d'abord → ✅ `Chambre5.webp`
- `"Suite Standard"` → ne match pas les suites spécifiques → vérifie `'suite'` → ✅ `JasminSuitePicture.jpg`

### Ajout de nouveaux types
Pour ajouter un nouveau type de chambre :
1. Importer la nouvelle image
2. Ajouter une condition dans `getRoomImage()`
3. Définir les mots-clés de correspondance

## 🔧 Configuration de production
- Configurer les profils Spring (`dev`, `prod`)
- Optimiser les connexions base de données
- Activer le cache si nécessaire
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


