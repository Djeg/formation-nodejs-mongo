import fastify from 'fastify'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

/**
 * @module todolist
 *
 * @description
 *  Petit api web permettant de gérer une liste de choses à faire
 */

const TodoItem = z.object({
  id: z.string().or(z.number()),
  title: z.string(),
  done: z.boolean(),
})

const TodoList = z.array(TodoItem)

type TodoItemType = z.infer<typeof TodoItem>
type TodoListType = z.infer<typeof TodoList>

const TodoItemSchema = zodToJsonSchema(TodoItem)
const TodoListSchema = zodToJsonSchema(TodoList)

/**
 * Contient la base de données
 */
let todoList: TodoListType = [
  {
    id: 1,
    title: 'Acheter du chocolat',
    done: false,
  },
]

/**
 * Création d'une application fastify permettant
 * de créer un serveur http
 */
const app = fastify()

/**
 * Route affichant l'intégralité de la liste de choses à faire
 */
app.get('/todos', () => todoList)

/**
 * Route ajoutant une nouvelle chose à faire dans la liste de chose
 * à faire
 */
app.post<{ Body: TodoItemType }>(
  '/todos',
  { schema: { body: TodoItemSchema } },
  request => {
    // Je récupére la chose à faire (TodoItem) depuis le body de la request
    const todo = TodoItem.parse(request.body)

    // On ajoute le todo (TodoItem) dans la liste de chose à faire (todoList)
    todoList.push(todo)

    // Retourne la liste de chose à faire
    return todoList
  },
)

/**
 * Route permettant de récupérer une seule chose à faire
 */
app.get<{ Params: { id: string } }>('/todos/:id', (request, reply) => {
  // Je doit récupérer l'identifiant contenue dans les Params de la request
  const id = request.params.id

  // Je dois récupérer le TodoItem contenu dans la todoList qui possède l'id
  const todo = todoList.find(t => t.id == id)

  // Si le todo n'existe pas
  if (!todo) {
    // Alors on retourne une erreur 404
    reply.code(404)

    return `Le todo avec l'id ${id} ne semble pas existé :-(`
  }

  // Je retourne le todo
  return todo
})

/**
 * Route permettant de supprimer un élément de mon tableaux de todo list
 */
app.delete<{ Params: { id: string } }>('/todos/:id', request => {
  // Je récupére l'identifiant de contenu dans les params
  const id = request.params.id

  // Je supprime l'élément du tableaux de todoList
  todoList = todoList.filter(t => t.id != id)

  // Je retourne la liste
  return todoList
})

/**
 * Démarre le server fastify sur un host et un port donnée
 */
app.listen(
  { host: process.env.HOST, port: parseInt(process.env.PORT || '53535') },
  () => {
    console.log(
      `Le server de todolist est prêt sur l'adresse http://localhost:5353`,
    )
  },
)
