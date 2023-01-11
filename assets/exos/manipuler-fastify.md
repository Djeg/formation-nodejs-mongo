# Manipuler fastify

L'objectif de cette exercice et de créer votre première API Web : Une list de chose à faire.

## 1. Prérequis

À l'aide du bout de code suivant :

```ts
/**
 * Représente une chose de à faire
 */
type TodoItem = {
  id: string | number
  title: string
  done: boolean
}

/**
 * Réprésente une list de chose à faire
 */
type TodoList = TodoItem[]

/**
 * Contient la base de données
 */
const todoList: TodoList = [
  {
    id: 1,
    title: 'Acheter du chocolat',
    done: false,
  },
]
```

### 2. Récupérer la liste des choses à faire

À l'aide de fastify ainsi que des types typescript créer la route suivante :

| Method | Resource | Description                                       |
| ------ | -------- | ------------------------------------------------- |
| `GET`  | `/todos` | Retourne l'intégralité de la constante `todoList` |

> Vous pouvez tester cette route avec le fichier `request.http`

### 3. Ajouter une chose à faire

À l'aide de fastify ainsi que des types typescript créer la route suivante :

| Method | Resource | Description                                                                                                                                                                                               |
| ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/todos` | à l'aide de la fonction `todoList.push`, ainsi que du body de la request faire en sorte d'ajouter un nouveau `TodoItem` dans la `TodoList`. Un fois l'élément rajouter retourne la liste de chose à faire |

### 4. Récupérer une seule chose à faire

À l'aide de fastify ainsi que des types typescript créer la route suivante :

| Method | Resource     | Description                                                              |
| ------ | ------------ | ------------------------------------------------------------------------ |
| `GET`  | `/todos/:id` | Retourne la chose à faire correspondant à l'identifiant envoyé en Params |

### 5. Supprimer une chose à faire

À l'aide de fastify ainsi que des types typescript créer la route suivante :

| Method   | Resource     | Description                                                                                        |
| -------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `DELETE` | `/todos/:id` | Supprimer du tableaux de liste de chose à faire l'élement correspondant à l'id spécifier en Params |
