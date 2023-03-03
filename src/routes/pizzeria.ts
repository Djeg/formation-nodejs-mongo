import { ObjectId } from '@fastify/mongodb'
import { FastifyInstance } from 'fastify'

/**
 * Plugin contenant toutes les routes de la pizzeria
 */
export default async function pizzeriaRoutes(app: FastifyInstance) {
  /**
   * Route permettant de créer une nouvelle pizza dans
   * notre base de données
   */
  app.post<PizzaCreateRoute>('/pizzas', async (request, response) => {
    // Création d'une nouvelle pizza
    const newPizza: any = { ...request.body }

    // Enregistrement dans la base
    await app.mongo.db?.collection('pizzas').insertOne(newPizza)

    // On retourne le code 201 Created
    response.code(201)

    // On retourne la nouvelle pizza
    return newPizza
  })

  /**
   * Route permettant de modifier une pizza
   */
  app.patch<PizzaUpdateRoute>('/pizzas/:id', async request => {
    // Création de la mise à jour de la pizza
    const updatedPizza = {
      ...request.body,
    }

    // On met à jour la pizza
    await app.mongo.db?.collection('pizzas').updateOne(
      {
        _id: new ObjectId(request.params.id),
      },
      {
        $set: updatedPizza,
      },
    )

    // On vas chercher la pizza modifié
    const pizza = await app.mongo.db?.collection('pizzas').findOne({
      _id: new ObjectId(request.params.id),
    })

    // On retourne la pizza modifié
    return pizza
  })

  /**
   * Route permettant de supprimer une pizza
   */
  app.delete<PizzaDeleteRoute>('/pizzas/:id', async request => {
    // Je récupére la pizza que je doit supprimer
    const pizza = await app.mongo.db?.collection('pizzas').findOne({
      _id: new ObjectId(request.params.id),
    })

    // On supprime la pizza de la base de données
    await app.mongo.db?.collection('pizzas').deleteOne({
      _id: new ObjectId(request.params.id),
    })

    // Je retourne la pizza supprimé
    return pizza
  })

  /**
   * Route permettant de filtrer les résultat
   */
  app.get<PizzaSearchRoute>('/pizzas', async request => {
    // Je récupére les filtres
    const filters = request.query

    // Je récupére la limite
    const limit = filters.limit ? parseFloat(filters.limit) : 15
    const offset = filters.page ? limit * (parseFloat(filters.page) - 1) : 0

    // Récupére toutes les pizzas correspondant aux filtres
    const pizzas = await app.mongo.db
      ?.collection('pizzas')
      .find(filters.name ? { name: new RegExp(filters.name, 'i') } : {})
      .limit(limit)
      .skip(offset)
      .toArray()

    // Je retourne mes pizzas
    return pizzas
  })
}

/**
 * Type de la route de création d'une pizza
 */
export type PizzaCreateRoute = {
  Body: {
    name: string
    price: number
    description?: string
  }
}

/**
 * Type permettant de supprimer une pizza
 */
export type PizzaDeleteRoute = {
  Params: {
    id: string
  }
}

/**
 * Type permettant de mettre à jour notre pizza
 */
export type PizzaUpdateRoute = PizzaCreateRoute & PizzaDeleteRoute

/**
 * Type de la route permettant de recherche des pizzas
 */
export type PizzaSearchRoute = {
  Querystring: {
    name?: string
    limit?: string
    page?: string
  }
}
