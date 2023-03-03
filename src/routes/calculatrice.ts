import { FastifyInstance } from 'fastify'

/**
 * Plugin contenant toute les routes concernant la calculatrice
 */
export default async function calculatriceRoutes(app: FastifyInstance) {
  // Création d'une route permettant d'additionner 2 nombre
  app.get<CalcRoute>('/calc/add/:x/:y', async request => {
    // Récupérer les paramètres
    const x = parseFloat(request.params.x)
    const y = parseFloat(request.params.y)

    // Résulat de la calculatrice
    const result = {
      result: x + y,
      x: x,
      y: y,
      operation: 'add',
    }

    // Enreigistré ce « result » dans la collection `calulcalatrice` de
    // votre mongodb !
    await app.mongo.db?.collection('calculatrices').insertOne(result)

    // On retourne l'objet de résultat
    return result
  })

  // Création d'une route permettant de soustraire 2 nombres
  app.get<CalcRoute>('/calc/sub/:x/:y', async request => {
    // Récupérer les paramètres
    const x = parseFloat(request.params.x)
    const y = parseFloat(request.params.y)

    // On retourne l'objet de résultat
    const result = {
      result: x - y,
      x: x,
      y: y,
      operation: 'sub',
    }

    // On enregistre dans mongodb
    await app.mongo.db?.collection('calculatrices').insertOne(result)

    // On retourne le résultat
    return result
  })

  // Création d'une route permettant de soustraire 2 nombres
  app.get<CalcRoute>('/calc/mul/:x/:y', async request => {
    // Récupérer les paramètres
    const x = parseFloat(request.params.x)
    const y = parseFloat(request.params.y)

    // On retourne l'objet de résultat
    const result = {
      result: x * y,
      x: x,
      y: y,
      operation: 'mul',
    }

    // On enregistre dans mongodb
    await app.mongo.db?.collection('calculatrices').insertOne(result)

    // On retourne le résultat
    return result
  })

  // Création d'une route permettant de soustraire 2 nombres
  app.get<CalcRoute>('/calc/div/:x/:y', async (request, response) => {
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
    const result = {
      result: x / y,
      x: x,
      y: y,
      operation: 'div',
    }

    // On enregistre dans mongodb
    await app.mongo.db?.collection('calculatrices').insertOne(result)

    // On retourne le résultat
    return result
  })

  app.post<CalculateRoute>('/calculate', async (request, response) => {
    // Récupére l'opération
    const operation = request.headers.operation
    // ON récupére x et y
    const x = request.body.x
    const y = request.body.y
    let result: any = null

    if (operation === 'add') {
      result = {
        result: x + y,
        x: x,
        y: y,
        operation: operation,
      }
    }

    if (operation === 'sub') {
      result = {
        result: x - y,
        x: x,
        y: y,
        operation: operation,
      }
    }

    if (operation === 'mul') {
      result = {
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

      result = {
        result: x / y,
        x: x,
        y: y,
        operation: operation,
      }
    }

    if (!result) {
      response.code(400)

      return {
        error: 'invalide operation',
        message: `Je ne connais l'opération ${operation} :/`,
      }
    }

    await app.mongo.db?.collection('calculatrices').insertOne(result)

    return result
  })

  // Affiche tout les résultats enregistré dans la base de données
  app.get('/calculatrice/results', async () => {
    const collection = await app.mongo.db
      ?.collection('calculatrices')
      .find()
      .toArray()

    return collection
  })
}

export type CalcRoute = {
  Params: {
    x: string
    y: string
  }
}

export type CalculateRoute = {
  Headers: {
    operation: string
  }
  Body: {
    x: number
    y: number
  }
}
