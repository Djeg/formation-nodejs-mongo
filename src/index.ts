import fastify from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import calculatriceRoutes from './routes/calculatrice'
import testouilleRoutes from './routes/testouille'

// Création d'une application (notre serveur logique HTTP)
const app = fastify()

// Première route sur le resource principale
app.get('/', () => {
  return {
    message: 'Coucou',
  }
})

// enregistremet de mon premier plugin
app.register(fastifyPlugin(testouilleRoutes))
// Enregistrement du plugin de calculatrice
app.register(fastifyPlugin(calculatriceRoutes))

// On écoute une porte de notre ordinateur
app.listen({ port: process.env.PORT as any, host: process.env.HOST }, () => {
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log(
    `Mon serveur est prèt : http://${process.env.HOST}:${process.env.PORT}`,
  )
})
