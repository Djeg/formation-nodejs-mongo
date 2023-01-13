import { FastifyInstance } from 'fastify'
import {
  NewPizzaModel,
  NewPizzaSchema,
  PizzaModel,
  PizzaSchema,
} from '../models/pizzas'

/**
 * @module routes.pizzas
 *
 * @description
 *  Contient toutes les routes concernant les pizzas
 */

/**
 * Plugin contenant toutes les routes des pizzas
 */
export default async function pizzas(app: FastifyInstance) {
  /**
   * Option de la route de création d'une nouvelle pizza
   */
  const newPizzaOptions = {
    schema: {
      body: NewPizzaSchema,
      response: {
        200: PizzaSchema,
      },
    },
  }

  /**
   * Route permettant de créer une nouvelle pizza
   */
  app.post('/pizzas', newPizzaOptions, async request => {
    // Je récupére la nouvelle pizza
    const newPizza = NewPizzaModel.parse(request.body)

    // On l'enregistre dans la base de donnée
    const result = await app.mongo.db?.collection('pizzas').insertOne(newPizza)

    // Je récupére la pizza depuis la base de donées
    return PizzaModel.parse(
      await app.mongo.db?.collection('pizzas').findOne({
        _id: result?.insertedId,
      }),
    )
  })
}
