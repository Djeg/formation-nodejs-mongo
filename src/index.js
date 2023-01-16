import fastify from 'fastify'
import mongodb from '@fastify/mongodb'

// Création d'une application fastify
const app = fastify({ logger: true })

// Je connécte une base de données
app.register(mongodb, {
  url: process.env.DATABASE_URL,
  database: 'pizzas',
})

// Démarage du serveur http
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  console.log("Le serveur http est prêt sur l'adresse : http://127.0.0.1:5353")
})
