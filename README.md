## Code Info
Code Info est une plateforme de questions-réponses qui explore divers sujets techniques grâce à des fonctionnalités modernes et une interface utilisateur intuitive.

## Technologies utilisées
## Front-end :
Angular : Framework pour des interfaces dynamiques et modulaires.
Bootstrap : Pour un design responsive et élégant.
TinyMCE : Éditeur riche pour la gestion des contenus textuels.

## Back-end :
Laravel : Framework PHP pour un développement back-end rapide et sécurisé.
MySQL : Base de données relationnelle utilisée pour stocker les données des utilisateurs, posts, et commentaires.

## Fonctionnalités principales
## Front-end :
Gestion des utilisateurs : inscription, connexion (avec validation des formulaires via ng-input-validation).
Création des posts et créateurs.
Création des commentaires liés à un post.
Récupération des posts et créateurs.
Récupération des commentaires liés à un post.
Editeur TinyMCE pour rédiger et modifier du contenu riche.
Responsive design testé sur plusieurs appareils avec LT Browser.

## Back-end :
API Laravel pour gérer les requêtes front-end :
Création des posts et créateurs.
Création des commentaires liés à un post.
Récupération des posts et créateurs.
Récupération des commentaires liés à un post.
Pagination Laravel pour optimiser la navigation.

## Structure du projet
## Front-end :
src/
├── app/
│   ├── components/
│   │   ├── auth/           # Composants pour l'inscription/connexion
│   │   ├── posts/          # Gestion des posts
│   │   └── comments/       # Gestion des commentaires
│   │   └── home/           # les differentes pages du site
│   ├── services/           # Services Angular pour les appels API
│   └── models/             # model pour representer les differents objets
├── auth.guard/             # guard d'authentification
├── assets/                 # Images et ressources statiques
└── environments/           # Configurations des environnements

## Back-end :
app/
├── Http/
│   ├── Controllers/        # Contrôleurs pour gérer les routes
│   ├── Middleware/         # Middleware pour la sécurité et les validations
├── Models/                 # Modèles Eloquent pour les données
├── Routes/
│   ├── api.php             # Routes API pour le projet
└── Database/
│     ├── migrations/         # Fichiers pour la gestion des tables
│     ├── seeders/            # Seeders pour les données initiales          
└── Public/
    ├── Storage/         # Dossiers pour le stockage des photo de profil des utilistateurs


## Installation
Pré-requis :
Node.js et Angular CLI pour le front-end.
Composer et PHP 8 pour le back-end.
MySQL ou tout autre gestionnaire de base de données compatible avec Laravel.

## Étapes :
## Cloner le projet :
bash
git clone https://github.com/vinnyyanel/codeInfo.git
cd codeInfo
Installation du front-end :
bash
cd front-end
npm install
ng serve
Installation du back-end :
bash
cd back-end
composer install
php artisan migrate
php artisan serve

## Configuration de l’environnement :
Ajouter un fichier .env pour Laravel avec vos configurations MySQL.

##  Contribution
Les contributions sont les bienvenues !

## Contact
Auteur : Vinny Yanel
Email : Assembeenghot@gmail.com
