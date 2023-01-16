# NodeJS Mongo Projet

Dans cette formation vous apprendrez à créer une api rest compléte avec nodejs et mongodb.

Ce repository est organisé en session, chaque session correspond à une semaine de formation, choisisez
la votre afin de retrouver l'intégralité des cours, codes et supports

## Cahier des charges

Votre objectif est de développer une API Rest pour un site de vente de chaussures entre particulier. L'api devra pouvoir se connécter à une application frontend React qui sera développé par le fomateur en parrallèle :).

Voici les différentes étapes et instructions pour la création de l'api :

- [Les utilisateurs](./assets/project/users.md)

## Installer et démarrer ce projet

Pour installer ce projet commencer par le télécharger ou le cloner. Une fois extrait sur votre machine, ouvrez VSCode à la racine du projet et suivez les étapes suivantes :

- Copier/Coller le fichier `.env.dist` dans `.env` et éditer les valeurs de configuration avec celle de votre choix
- Lancer les commandes suivantes :

```bash
# Installe les node_modules
npm i
# Démarre le serveur :
npm run start:demon
```

## Les supports

- [Lien vers les slides de la formation](https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen)

## Le plan

- [Présentation et installation](./assets/cours/presentation.md)
- [Configuration avec nodemon & dotenv](./assets/cours/nodemon-dotenv.md)
- [Découvrir fastify](./assets/cours/fastify.md)
- [Model, Schéma et Validaion](./assets/cours/zod.md)
- [Découvrir mongodb](./assets/cours/mongo.md)
- [Créer des api rest avec fastify](./assets/cours/rest.md)
- Faire des tests
- Architecture d'une application fastify
- Sécurité : JWT et CORS
- Déployer son application nodejs / mongodb avec heroku

## La pratique

- [Créer son projet nodejs](./assets/exos/installation.md)
- [Configurer nodemon et dotenv](./assets/exos/nodemon-dotenv.md)
- [Exercice de calculatrice](./assets/exos/calculator.md)
- [Exercice manipulation de fastify](./assets/exos/manipuler-fastify.md)
- [Exercice : Le calculatrix](./assets/exos/calculatrix.md)
- [Exercice : La pizzeria](./assets/exos/pizzeria.md)
