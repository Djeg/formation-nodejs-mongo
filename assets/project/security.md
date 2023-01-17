# La sécurité

L'objectif de cette partie et de mettre en place de l'authentification, et l'authorization sur notre api rest.

## Prérequis

Assurez-vous de bien avoir installer et brancher le plugin `@fastify/jwt`.

## La création de jeton

L'objectif est de pouvoir fournir des jetons de connexion aux utilisateurs de notre api. Voici la requête à éfféctué :

```http
POST http://127.0.0.1:5353/token
Content-Type: application/json

{
  "email": "mail@user.com",
  "password": "password"
}
```

Et voici la réponse que doit renvoyer l'api :

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "<tokenJwt>"
}
```

Pour réaliser cette route nous avons besoin de modèle

### UserCredentialModel

Ce modèle correspond au données envoyé pout créer un jeton. Placé ce model dans le fichier `src/models/users.model.ts` :

| Champ    | type   | description                                                   |
| -------- | ------ | ------------------------------------------------------------- |
| email    | string | Contient l'email de l'utilisateur faisant la demande de jeton |
| password | string | mot de passe de l'utilisateur                                 |

### UserTokenModel

Créer le model suivant :

| Champ | type   | description       |
| ----- | ------ | ----------------- |
| token | string | Contient le jeton |

### Création de la route

Dans le fichier `src/routes/users.route.ts`, ajouter une route pour la méthode `POST /token`. Cette route reçoit un `UserCredentialModel` dans le `request.body`, il retourne un réponse avec le code `201` et le model `UserTokenModel` lorsque la génération c'est bien passé.

Il vous faudra dans cette route faire dans l'ordre :

1. « parser » le UserCredentialModel
2. « crypter » le mot de passe envoyé dans le UserCredenitalModel
3. « Récupérer » depuis mongodb l'utilisateur correspondant à l'email et au mot de passe
4. Générer et retourner un `UserTokenModel` en utilisant `app.jwt.sign({ .. })`
