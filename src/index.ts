import fastify from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import calculatrix from './routes/calculatrix'
import mongodb from '@fastify/mongodb'

// Création d'une application fastify
const app = fastify({ logger: true })

console.warn(process.env.DATABASE_URL)

app.register(mongodb, {
  url: process.env.DATABASE_URL,
  database: 'pizzas',
})

app.register(fastifyPlugin(calculatrix))

// Démarage du serveur http
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  console.log("Le serveur http est prêt sur l'adresse : http://127.0.0.1:5353")
})
