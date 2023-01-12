import { FastifyInstance } from 'fastify'
import {
  CalculModel,
  CalculSchema,
  ResultModel,
  ResultSchema,
} from '../models/calculatrix'

/**
 * @module routes.calculatrix
 *
 * @description
 *  Plugin fastify contenant la route pour le calculatrix
 */

/**
 * Plugin contenant la calculatrix
 */
export default async function (app: FastifyInstance) {
  /**
   * Options contenant les schémas fastify de la route
   * de calculatrix
   */
  const options = {
    schema: {
      body: CalculSchema,
      response: { 200: ResultSchema },
    },
  }

  /**
   * Route pour la calculatrix
   */
  app.post('/calculatrix', options, async request => {
    // Je vais devoir valider le body de la request et
    // récupérer un CalculType
    const calcul = CalculModel.parse(request.body)

    // On peut récupérer les données du calcul
    const { operation, x, y } = calcul

    // if (operation === 'addition') {
    //   return ResultModel.parse({ resultat: x + y })
    // }

    // if (operation === 'division') {
    //   return ResultModel.parse({ resultat: x / y })
    // }

    // if (operation === 'multiplication') {
    //   return ResultModel.parse({ resultat: x * y })
    // }

    // return ResultModel.parse({ resultat: x - y })

    return operation === 'addition'
      ? ResultModel.parse({ resultat: x + y })
      : operation === 'division'
      ? ResultModel.parse({ resultat: x / y })
      : operation === 'multiplication'
      ? ResultModel.parse({ resultat: x * y })
      : ResultModel.parse({ resultat: x - y })
  })
}
