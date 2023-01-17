import fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import users from './routes/users.route'
import fastifyJwt from '@fastify/jwt'

// Création d'une application fastify
const app = fastify({ logger: true })

// Je connécte une base de données
app.register(mongodb, {
  url: process.env.DATABASE_URL,
  database: 'pizzas',
})

// Je connécte le plugin permettant de générer des « jetons »
// de connection (jwt token)
app.register(fastifyJwt, {
  secret: process.env.API_KEY_SECRET || 'secret',
})

// On enregistre le plugin des utilisateurs
app.register(users)

// Démarage du serveur http
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  console.log("Le serveur http est prêt sur l'adresse : http://127.0.0.1:5353")
})
