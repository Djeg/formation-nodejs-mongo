# Partie 1 : Les utilisateurs

Dans cette partie nous allons développer toutes les resources nescessaire pour gérer des utilisateur sur notre API de ventes de chaussures.

## Création d'un utilisateur

L'object de l'éxercice est de créer la route suivante :

| Method | Resource | Description                                                                                                                                                                                                                              |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/users` | Cette route reçoit un nouvelle utilisateur et enregistre dans la base l'utilisateur (attention, il faudra crypter le [mot de passe](https://stackoverflow.com/questions/7480158/how-do-i-use-node-js-crypto-to-create-a-hmac-sha1-hash)) |

Pour pouvoir fonctionner cette route utilises les models suivants :

### NewUserModel

| Champ             | type   | description              |
| ----------------- | ------ | ------------------------ |
| email             | string | L'email de l'utilisateur |
| firstname         | string | prénom                   |
| lastname          | string | nom                      |
| password          | string | Mot de passe             |
| repeated_password | string | Mot de passe répété      |

### UserModel

| Champ     | type   | description              |
| --------- | ------ | ------------------------ |
| \_id      | string | id de l'utilisateur      |
| email     | string | L'email de l'utilisateur |
| firstname | string | prénom                   |
| lastname  | string | nom                      |
| password  | string | Mot de passe             |

### Les étapes :

1. Déclarer une variable d'environement (API_SECRET) et lui donné un chaine de caractére aléatoire.
2. Créer un fichier `src/models/users.model.ts` et utiliser [`zod`](https://zod.dev/) afin de metre en place les schèmas pour le `NewUserModel` et `UserModel`.
3. Créer un fichier `src/routes/users.route.ts` et créer un plugin fastify avec la route : `POST /users`. Cette route accépte en schèma un `NewUserModel` dans le `body` de la request et un `UserModel` dans se réponse http 201 ! L'objectif de la route est de créer un utilisateur dans la base de données en utilisant mongodb et de retourner l'utilisteur tout juste créer avec le code http 201. Il faudra aussi crypter son mot de passe.
4. Vous pouvez tester cette route HTTP avec le fichier `request.http` sinon vous pouvez utiliser postman ou autre ...

## Lister les utilisateurs

L'objectif est de développer la route suivante :

| Method | Resource | Description                                       |
| ------ | -------- | ------------------------------------------------- |
| GET    | `/users` | Cette route retourne la collection d'utilisateurs |

Pour pouvoir fonctionner, cette route accépte des filtres (qui peuvent être facultatif, envoyé en QueryString). Il faudra créer les modèles suivant :

### UserSearchCriteriaModel

| Champ     | type   | description                                                                                  |
| --------- | ------ | -------------------------------------------------------------------------------------------- |
| limit     | number | la limite de résultat que l'on souhaite, ficé à 20 si non présente                           |
| orderBy   | enum   | Nom du champs par laquel on souhaite trier un utilisateur (\_id, email, firstname, lastname) |
| direction | string | Peut être 1 pour croissant -1 pour décroissant                                               |
| email     | string | La possibilité de pouvoir filtrer par email                                                  |

### UserCollectionModel

Contient un tableaux de `UserModel`.

### les étapes :

1. Créer dans le fichier `src/models/users.model.ts` les modèle `UserSearchCriteriaModel` et `UserModel` en utilisant zod
2. Dans le fichier `src/routes/users.route.ts` ajouter la route `GET /users`, qui accépte les schèmas suivant : le `UseerSearchCriteriaModel` pour les query et le `UserCollectionModel` pour la réponse http 200.
3. En utilisant vos modèle et mongodb exécuter la recherche et retournes les bon documents.
4. Vous pouvez tester avec le fichier `request.http`.
