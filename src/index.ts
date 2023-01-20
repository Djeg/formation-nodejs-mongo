import fastify from 'fastify'
import mongodb from '@fastify/mongodb'
import users from './routes/users.route'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import shoes from './routes/shoes.route'

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
app.register(fastifyCors, {
  origin: true,
})

// On enregistre le plugin des utilisateurs
app.register(users)
app.register(shoes)

// Démarage du serveur http
app
  .listen({
    port: parseInt(process.env.PORT || '5353'),
    host: process.env.HOST,
  })
  .then(() => {
    console.log('server is running on ')
  })
  .catch(console.error)
