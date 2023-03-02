import fastifyMongodb from '@fastify/mongodb'
import fastify from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import calculatriceRoutes from './routes/calculatrice'
import testouilleRoutes from './routes/testouille'

// Création d'une application (notre serveur logique HTTP)
const app = fastify({ logger: true })

// Première route sur le resource principale
app.get('/', () => {
  return {
    message: 'Coucou',
  }
})

// Route testant mongodb
app.get('/testmongo', async () => {
  await app.mongo.db?.collection('tests').insertOne({
    message: 'coucou les amis',
  })

  return 'Mongodb à un nouveau document !'
})

// enregistrement du plugin mongo db
app.register(fastifyMongodb, {
  // url de connexion à la base de données
  url: 'mongodb://root:root@localhost/?retryWrites=true&w=majority',
  // Nom lire représentant la base de données
  database: 'test',
})

// enregistremet de mon premier plugin
app.register(fastifyPlugin(testouilleRoutes))
// Enregistrement du plugin de calculatrice
app.register(fastifyPlugin(calculatriceRoutes))

// On écoute une porte de notre ordinateur
app.listen({ port: process.env.PORT as any, host: process.env.HOST }, error => {
  console.error(error)
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log(
    `Mon serveur est prèt : http://${process.env.HOST}:${process.env.PORT}`,
  )
})
