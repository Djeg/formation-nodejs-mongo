import fastify from 'fastify'

// Création d'une application (notre serveur logique HTTP)
const app = fastify()

// Première route sur le resource principale
app.get('/', () => {
  return {
    message: 'Coucou',
  }
})

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

// On écoute une porte de notre ordinateur
app.listen({ port: process.env.PORT as any, host: process.env.HOST }, () => {
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log(
    `Mon serveur est prèt : http://${process.env.HOST}:${process.env.PORT}`,
  )
})
