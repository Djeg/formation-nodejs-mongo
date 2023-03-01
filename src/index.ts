import fastify from 'fastify'

// Création d'une application (notre serveur logique HTTP)
const app = fastify()

app.get('/', () => {
  console.log('Coucou !')

  return 'Coucou'
})

// On écoute une porte de notre ordinateur
app.listen({ port: 5353, host: '127.0.0.1' }, () => {
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log('Mon serveur est prèt : http://127.0.0.1:5353')
})
