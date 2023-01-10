import fastify from 'fastify'

// Création d'une application fastify
const app = fastify()

// Ajout d'une route pour dire bonjour :
app.get('/', () => {
  return 'Bonjour tout le monde !'
})

// Ajout d'une autre resource affichant salut
app.get<{ Params: { name: string } }>('/salut/:name', request => {
  const name = request.params.name

  return `Salut ${name}, comment allez-vous ?`
})

/**
 * Création d'un type pour ma route salutation
 */
type SalutationRoute = {
  Params: {
    name: string
  }
  Querystring: {
    upcase?: boolean
  }
}

/**
 * On déclare la route :
 */
app.get<SalutationRoute>('/salutation/:name', request => {
  // Nous utilisons la request pour récupérer le contenu du paramètre
  // « name » :
  const name = request.params.name

  // On récupére le filtre "upcase"
  const upcase = request.query.upcase

  return upcase ? `Bonjour ${name}`.toUpperCase() : `Bonjour ${name}`
})

// Démarage du serveur http
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  console.log("Le serveur http est prêt sur l'adresse : http://127.0.0.1:5353")
})
