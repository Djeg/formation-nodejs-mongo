# Les petites annonces de vente de chaussures

L'objectif c'est de pouvoir ajouter, lister, modifier et récupérer des annonces pour vendre des chaussures.

## La création d'une annonce

L'objectif de cette fonctionnalité est de pouvoir créer une annonce de vente de chaussures.

### 1. Création des modèles

Créer les modèles suivant en utilisant zod, dans le fichier `src/models/shoes.model.ts` :

#### NewShoesModel

| champ       | type                                            | description                 |
| ----------- | ----------------------------------------------- | --------------------------- |
| title       | string                                          | Le titre de l'annonce       |
| price       | number (entre 2€ et 300€)                       | Le prix de la chaussure     |
| model       | string                                          | Modèle de la chaussure      |
| brand       | string                                          | Marque de la chaussure      |
| pictures    | array de string (placer à l'intérieur des urls) | Les images de la chaussure  |
| description | string                                          | Description de l'annonce    |
| couleur     | string                                          | La couleur en héxadecimal   |
| condition   | enum "neuf", "semi neuve", "usé", "très usé"    | L'état de la chaussure      |
| size        | number/string                                   | La pointure de la chaussure |

#### ShoesModel

| champs      | type                                            | description                         |
| ----------- | ----------------------------------------------- | ----------------------------------- |
| \_id        | string                                          | Identifiant de l'annonce            |
| title       | string                                          | Le titre de l'annonce               |
| price       | number (entre 2€ et 300€)                       | Le prix de la chaussure             |
| model       | string                                          | Modèle de la chaussure              |
| brand       | string                                          | Marque de la chaussure              |
| pictures    | array de string (placer à l'intérieur des urls) | Les images de la chaussure          |
| description | string                                          | Description de l'annonce            |
| couleur     | string                                          | La couleur en héxadecimal           |
| condition   | enum "neuf", "semi neuve", "usé", "très usé"    | L'état de la chaussure              |
| size        | number/string                                   | La pointure de la chaussure         |
| user        | UserModel                                       | L'utilisateur qui vend la chaussure |

### 2. Création d'un annonce de vente de chassure

Dans le fichier `src/routes/shoes.route.ts` créé un plugin fastify, dans ce plugin ajouter la route suivante :

| Method | Resource | Schéma                                          | Description                                                                                                             |
| ------ | -------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| POST   | `/shoes` | body: NewShoesSchema, response 201: ShoesSchema | Créé une nouvelle annonce de chaussure (**Attention, cette route est uniquement disponible aux utilisateurs connécté**) |

Dans cette route, placer le code correspondant aux instructions suivante :

1. Créer un NewShoesModel à partir du `request.body`
2. Vérifier que le jeton de connexion soit valide et présent `await request.jwtVerify()`
3. Récupérer l'utilisateur connécté en utilisant mongodb et `request.user?._id` (Attention à bien utiliser les modèles zod)
4. En utilisant la nouvelle chaussure et l'utilisateur connécté, créé un `ShoesModel`
5. Enregistrer cette chaussure dans la base de données en utilisant mongodb
6. Récupérer la chaussure tout juste enregistré en utilisant mongodb
7. Retourner le code http 201 avec la chaussure tout juste créé

## Lister les annonces de vente de chaussure

L'objéctif est de pouvoir lister des annonces de vente de chaussure

### Création des modèles

#### 1. Les SearchShoesCriteriaModel

| champ                | type                                                             | description                                                  |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| limit (optional)     | number                                                           | Définie le nombre de chaussure que nous souhaitons retourner |
| page (optional)      | number                                                           | Définie la page que nous souhaitons                          |
| orderBy (optional)   | enum: \_id, price, title, model, brand, couleur, size, condition | Définie l'ordre de trie                                      |
| direction (optional) | number                                                           | -1 pour décroissant, et 1 pour croissant                     |
| minPrice (optional)  | number                                                           | Prix minimum                                                 |
| maxPrice (optional)  | number                                                           | Prix Maximum                                                 |
| couleur (optional)   | string                                                           | La couleur                                                   |
| minSize (optional)   | string/number                                                    | La pointures minimum                                         |
| maxSize (optional)   | string/number                                                    | La pointures maximum                                         |
| condition (optional) | string                                                           | état de la chaussure                                         |
| user (optional)      | string                                                           | email de l'utilisateur qui vend la chassure                  |

#### 2. ShoesCollectionModel

C'est un tableaux de `ShoesModel`

### Créer la routes permettant de lister des chaussures

Il faut créer la route suivante :

| Method | Resource | Schéma                                                                      | Description                                                                                           |
| ------ | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| GET    | `/shoes` | querystring: SearchShoesCriteriaSchema, response 200: ShoesCollectionSchema | Liste les chaussures (**Attention, cette route est uniquement disponible aux utilisateurs connécté**) |

Dans le fichier `src/routes/shoes.route.ts`, ajouter une route pour la route au dessus avec le code suivant à l'intérieur :

0. Assurez-vous d'avoir un jeton de connexion valide avec `await request.jwtVerify()`
1. Récupérer les `SearchShoesCriteriaModel` depuis `request.query`
2. Utiliser mongodb pour récupérer les chaussures correspondant aux critères de recherche
3. retourner le code http 200 avec les chaussures (ShoesCollectionModel)

## Modifier et supprimer une chaussure

L'objectif est de ouvoir modifier l'une de ses annonces et de la supprimer si besoin.

### Les Modèles

Ajouter les modèles suivant dans `src/models/shoes.model.ts`

#### UpdateShoesModel

Ce modèle reprend le `NewShoesModel` mais avec tout les champs non requis (cf: zod : `partial`)

#### IdOwnedModel

Ce modèle est un simple modèle utilisé pour les params de la route :

| champ | type   | description                            |
| ----- | ------ | -------------------------------------- |
| id    | string | Contient l'identifiant de la chaussure |

### Les routes

#### Modfier une chaussure

Dans le fichier `src/routes/shoes.route.ts` ajouter la route suivante :

| Method | Resource     | Schéma                                                                    | Description                                                                                          |
| ------ | ------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| PATCH  | `/shoes/:id` | params: IsOwnedSchema, body: UpdateShoesSchema, response 200: ShoesSchema | Modifie une annonce (**Attention, cette route est uniquement disponible aux utilisateurs connécté**) |

Dans cette route placé le code suivant :

1. Assurez-vous que le jeton de connexion soit valide
2. Récupérer l'utilisateur connécté en utilisant mongodb et `request.user?._id`
3. Récupérer la chaussure en utilisant les params de la request et le model `IdOwnedModel`
4. Récupérer les modification en utilisant le `UpdateShoesModel` et les `request.body` (Attention, assuerez-vous que l'utilisateur de la chaussure soit le même que l'utilisateur connécté)
5. Utiliser mongodb pour mettre à jour la chaussure
6. Retourner la chaussure mise à jour

#### Supprimer une chaussure

Dans le fichier `src/routes/shoes.route.ts` ajouter la route suivante :

| Method | Resource     | Schéma                                           | Description                                                                                           |
| ------ | ------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| DELETE | `/shoes/:id` | params: IsOwnedSchema, response 200: ShoesSchema | Supprime une annonce (**Attention, cette route est uniquement disponible aux utilisateurs connécté**) |

Dans cette route placé le code suivant :

1. Assurez-vous que le jeton de connexion soit valide
2. Récupérer l'utilisateur connécté en utilisant mongodb et `request.user?._id`
3. Récupérer la chaussure en utilisant les params de la request et le model `IdOwnedModel`
4. Assurez-vous que l'utilisateur de la chaussure soit le même que l'utilisateur connécté
5. Supprimer la chaussure en utilisant mongodb
6. Retourner la chaussure supprimé
