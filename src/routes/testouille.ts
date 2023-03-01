import { FastifyInstance } from 'fastify'

/**
 * Plugin contenant des routes de test
 */
export default async function testouilleRoutes(app: FastifyInstance) {
  // Seconde route permettan de saluer
  app.get('/hello', (request, response) => {
    // On change le status de notre réponse
    response.code(404)
    /// On ajoute un en-tête http
    response.header('Coded-In', 'fastify')

    return 'Hello tout le monde !'
  })

  // Route retournant des éléves (exercice)
  app.get('/eleves', (request, response) => {
    response.header('Developed-With', 'Fastify')

    return [
      { id: 1, nom: 'John', prenom: 'john', age: 32 },
      { id: 2, nom: 'rose', prenom: 'john', age: 36 },
      { id: 3, nom: 'jane', prenom: 'john', age: 40 },
      { id: 4, nom: 'jean', prenom: 'john', age: 38 },
    ]
  })
}
