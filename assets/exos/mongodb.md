# Exercice MongoDB

## Enregistrer et mémoriser les résultat de notre calculatrice !

Dans le plugin des calculatrice `src/routes/calculatrice.ts`

> Il vous faut au préalable une base de données mongodb ATLAS

1. Installer et le plugin mongodb
2. Enregistrer et configurer le plugin mongodb dans `src/index.ts`
3. Dans toutes les routes du plugin `src/routes/calculatrice.ts`, enregistré le retour de la fonction dans une collection
   mongodb nommé `calculatrices`
4. (BONUS) Créer une routes `/calculatrice/results` qui retourne tout les résultats enregistré dans mongodb

## La pizzeria

L'objectif de l'exercice est de créer une petite API Rest pour des pizzas (créer, modifier, supprimer et récupérer).

### La mise en place

1. Créer un plugin dans `src/routes` nommé `pizzeria.ts`
2. Exporter une fonction plugin
3. Brancher le plugin dans le fichier `src/index.ts`

### La création de pizza

1. Créer une route `post /pizzas`.
2. Cette route accépte un `body` de la forme suivante :

```json
{
  "nom": "nom de la pizza",
  "price": 12.8,
  "description": "Description de la pizza",
  // Bonus :
  "image": "url d'une image de pizza ?"
}
```

> Il faut donc typer le `Body` de votre route ...

3. Récupérer le body de le requête en enregistré le dans mongodb, dans une collection `pizzas`
4. Retourner la pizza tout juste inséré et surtout le code HTTP `201` !
5. Tester votre requête avec le fichier `request.http`

> Il vous faudra envoyé la pizza que vous souhaitez créé dans le body de la requête

### La mise à jour de la pizza

1. Créer une route `patch /pizzas/:id`.
2. Cette route accépte un `body` de la forme suivante :

```json
{
  "nom": "nom de la pizza",
  "price": 12.8,
  "description": "Description de la pizza",
  // Bonus :
  "image": "url d'une image de pizza ?"
}
```

> Il faut donc typer le `Body` de votre route ...

3. Récupérer le body de le requête et modifier la pizza de la base de données de la collection `pizzas`
4. Retourner la pizza tout juste inséré
5. Tester votre requête avec le fichier `request.http`

> Il vous faudra envoyé la modification de la pizza dans le body de la requête

### La suppression de la pizza

1. Créer une route `delete /pizzas/:id`.
2. Supprimer la pizza correspondant à l'identifiant
3. Retourner la pizza supprimé
4. Tester votre requête avec le fichier `request.http`

### Récupérer des pizzas

1. Créer une route `get /pizzas`.
2. Récupérer toutes les pizzas de la collection `pizzas`
3. Retourner les pizzas
4. Tester votre requête avec le fichier `request.http`

### Bonus

1. Dans la route `get /pizzas`, ajouter la possibilité de filtrer par :

| filtre | desription                          | exemple   |
| ------ | ----------------------------------- | --------- |
| limit  | Définie le nombre de pizzas maximum | 10        |
| page   | Définie la page que l'on souhaite   | 1         |
| nom    | Recherche une pizza par son nom     | margarita |

> Il faudra utiliser les query string ! (Elles sont facultatives)
