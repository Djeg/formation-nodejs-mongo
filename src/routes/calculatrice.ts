import { FastifyInstance } from 'fastify'

/**
 * Plugin contenant toute les routes concernant la calculatrice
 */
export default async function calculatriceRoutes(app: FastifyInstance) {
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
