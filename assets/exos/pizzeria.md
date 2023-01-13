# La pizzeria

L'objectif de cet exercice est de créer une api pour une pizzeria. Le but est simple :

- Créer des pizzas
- Modifier des pizzas
- Supprimer des pizzas
- Récupérer des pizzas

## 1. Le model

Créer ou de récupérer depuis le code existant le/les [models pour la pizzeria](../../src/models/pizzas.ts).

## 2. Récupérer des pizzas

Dans le fichier `src/routes/pizzas.ts` ajouter le route suivante :

| method | resource | description                                      |
| ------ | -------- | ------------------------------------------------ |
| GET    | /pizzas  | Retourne toutes les pizzas de la base de données |

> Attention à bien utilisé la base de données ainsi que Zod !

## 3. Modifier une pizza

Dans le fichier `src/routes/pizzas.ts` ajouter la route suivante :

| method | resource    | description                                                                                                                                            |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PATCH  | /pizzas/:id | Modifie une pizza. Vous allez devoir spécifier un schéma, type et model pour la modification d'une pizza. `zod.partial` devrait pouvoir vous aider ... |

> Attention à bien utilisé la base de données ainsi que Zod !

## 4. Supprimer une pizza

Dans le fichier `src/routes/pizzas.ts` ajouter la route suivante :

| method | resource    | description                                                                                                              |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| DELETE | /pizzas/:id | Supprime la pizza avec l'identifiant spécifier en paramètre. Attention retourne un code `404` sir la pizza n'éxiste pas. |

> Attention à bien utilisé la base de données ainsi que Zod !
