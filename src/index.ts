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

// Création d'un type pour notre route
export type CalcRoute = {
  Params: {
    x: string
    y: string
  }
}

// Création d'une route permettant d'additionner 2 nombre
app.get<CalcRoute>('/calc/add/:x/:y', request => {
  // Récupérer les paramètres
  const x = parseFloat(request.params.x)
  const y = parseFloat(request.params.y)

  // On retourne l'objet de résultat
  return {
    result: x + y,
    x: x,
    y: y,
    operation: 'add',
  }
})

// Création d'une route permettant de soustraire 2 nombres
app.get<CalcRoute>('/calc/sub/:x/:y', request => {
  // Récupérer les paramètres
  const x = parseFloat(request.params.x)
  const y = parseFloat(request.params.y)

  // On retourne l'objet de résultat
  return {
    result: x - y,
    x: x,
    y: y,
    operation: 'sub',
  }
})

// Création d'une route permettant de soustraire 2 nombres
app.get<CalcRoute>('/calc/mul/:x/:y', request => {
  // Récupérer les paramètres
  const x = parseFloat(request.params.x)
  const y = parseFloat(request.params.y)

  // On retourne l'objet de résultat
  return {
    result: x * y,
    x: x,
    y: y,
    operation: 'mul',
  }
})

// Création d'une route permettant de soustraire 2 nombres
app.get<CalcRoute>('/calc/div/:x/:y', (request, response) => {
  // Récupérer les paramètres
  const x = parseFloat(request.params.x)
  const y = parseFloat(request.params.y)

  if (y === 0) {
    response.code(400)

    return {
      error: 'division par 0',
      message: 'Il est impossible de diviser un nombre par 0',
    }
  }

  // On retourne l'objet de résultat
  return {
    result: x / y,
    x: x,
    y: y,
    operation: 'div',
  }
})

export type CalculateRoute = {
  Headers: {
    operation: string
  }
  Body: {
    x: number
    y: number
  }
}

app.post<CalculateRoute>('/calculate', (request, response) => {
  // Récupére l'opération
  const operation = request.headers.operation
  // ON récupére x et y
  const x = request.body.x
  const y = request.body.y

  if (operation === 'add') {
    return {
      result: x + y,
      x: x,
      y: y,
      operation: operation,
    }
  }

  if (operation === 'sub') {
    return {
      result: x - y,
      x: x,
      y: y,
      operation: operation,
    }
  }

  if (operation === 'mul') {
    return {
      result: x * y,
      x: x,
      y: y,
      operation: operation,
    }
  }

  if (operation === 'div') {
    if (y === 0) {
      response.code(400)

      return {
        error: 'division par 0',
        message: 'Il est impossible de diviser par 0',
      }
    }

    return {
      result: x / y,
      x: x,
      y: y,
      operation: operation,
    }
  }

  response.code(400)

  return {
    error: 'invalide operation',
    message: `Je ne connais l'opération ${operation} :/`,
  }
})

// On écoute une porte de notre ordinateur
app.listen({ port: process.env.PORT as any, host: process.env.HOST }, () => {
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log(
    `Mon serveur est prèt : http://${process.env.HOST}:${process.env.PORT}`,
  )
})
