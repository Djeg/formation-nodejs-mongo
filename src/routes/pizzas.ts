import { FastifyInstance } from 'fastify'
import { ObjectId } from 'mongodb'
import {
  NewPizzaModel,
  NewPizzaSchema,
  PizzaListModel,
  PizzaListSchema,
  PizzaModel,
  PizzaSchema,
  UpdatePizzaModel,
  UpdatePizzaSchema,
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

  /**
   * Route permettant de récupérer toutes les pizzas enregistré dans la
   * base de données
   */
  app.get(
    '/pizzas',
    { schema: { response: { 200: PizzaListSchema } } },
    async () => {
      return PizzaListModel.parse(
        await app.mongo.db?.collection('pizzas').find().toArray(),
      )
    },
  )

  /**
   * Route permettant de modifier une pizza
   */
  app.patch<{ Params: { id: string } }>(
    '/pizzas/:id',
    { schema: { body: UpdatePizzaSchema, response: { 200: PizzaSchema } } },
    async request => {
      // Je récupére la mise à jour voulue sur la pizza
      const updatePizza = UpdatePizzaModel.parse(request.body)

      // Je récupére l'identifiant de la pizza
      const id = request.params.id
      // Je met à jour la pizza dans la base de données
      await app.mongo.db?.collection('pizzas').updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updatePizza,
        },
      )

      // Je récupére la pizza qui vient être mise à jour !
      return PizzaModel.parse(
        await app.mongo.db
          ?.collection('pizzas')
          .findOne({ _id: new ObjectId(id) }),
      )
    },
  )

  /**
   * Supprime une pizza
   */
  app.delete<{ Params: { id: string } }>('/pizzas/:id', async request => {
    // On récupére la pizza
    const pizza = PizzaModel.parse(
      await app.mongo.db
        ?.collection('pizzas')
        .findOne({ _id: new ObjectId(request.params.id) }),
    )

    // On supprime la pizza
    await app.mongo.db?.collection('pizzas').deleteOne({
      _id: new ObjectId(request.params.id),
    })

    return pizza
  })
}
