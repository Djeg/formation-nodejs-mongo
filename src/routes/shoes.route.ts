import { FastifyInstance } from 'fastify'
import { ObjectId, SortDirection } from 'mongodb'
import {
  IdOwnerModel,
  IdOwnerSchema,
  NewShoesModel,
  NewShoesSchema,
  SearchShoesCriteriaModel,
  SearchShoesCriteriaSchema,
  ShoesCollectionModel,
  ShoesCollectionSchema,
  ShoesModel,
  ShoesSchema,
  UpdateShoesModel,
  UpdateShoesSchema,
} from '../models/shoes.model'
import { UserModel } from '../models/users.model'

/**
 * @module shoes.route
 *
 * @description
 *  Ce module contient le plugin fastify avec toutes les routes concernant
 *  les chaussures
 */

/**
 * Plugin fastify contenant toutes les routes de chaussures
 */
export default async function shoes(app: FastifyInstance) {
  /**
   * Route permettant de créer une nouvelle chaussure.
   *
   * Cette route accépte un NewShoesModel en body de la request et
   * retourne une réponse 201 Contenant un ShoesModel si tout ce passe
   * bien.
   */
  app.post(
    '/shoes',
    { schema: { body: NewShoesSchema, response: { 201: ShoesSchema } } },
    async (request, reply) => {
      // Je souhaiterais m'assurer d'avoir un jeton de connexion valide.
      // En effet, si je n'en posséde pas alors je ne suis pas connécté et
      // donc je ne peut pas créer de chaussure.
      await request.jwtVerify()

      // Je récupére et valide la nouvelle chaussure envoyé de la body
      // de la request
      const newShoes = NewShoesModel.parse(request.body)

      // Récupérer l'identifiant de l'utilisateur contenue dans le jeton
      // de connexion.
      const userId = (request.user as any)._id
      // Maintenant que je connais l'identifiant de l'utilisateur, j'utilise
      // mongodb pour aller chercher l'utilisateur en question
      const user = UserModel.parse(
        await app.mongo.db?.collection('users').findOne({
          _id: new ObjectId(userId),
        }),
      )

      // J'insére une chaussure dans la base de données
      const result = await app.mongo.db?.collection('shoes').insertOne({
        ...newShoes,
        user,
      })

      // Je retourne le code http 201 Created
      reply.code(201)

      // Je retourne l'utilisateur tout juste créé dans la base de données
      return ShoesModel.parse(
        await app.mongo.db?.collection('shoes').findOne({
          _id: result?.insertedId,
        }),
      )
    },
  )

  /**
   * Récupére la liste filtrer des annonces de chaussures
   */
  app.get(
    '/shoes',
    {
      schema: {
        querystring: SearchShoesCriteriaSchema,
        response: { 200: ShoesCollectionSchema },
      },
    },
    async (request, reply) => {
      // On s'assure d'avoir un jeton de connexion valide
      await request.jwtVerify()

      // On récupére les critères de recherche
      const criterias = SearchShoesCriteriaModel.parse(request.query)

      // Contient les filtres mongodb
      let filters: any = {}

      // Si nous avons un prix minimum
      if (criterias.minPrice) {
        filters = {
          ...filters,
          price: {
            ...(filters['price'] || {}),
            $gte: criterias.minPrice,
          },
        }
      }

      // Si nous avons un prix maximum
      if (criterias.maxPrice) {
        filters = {
          ...filters,
          price: {
            ...(filters['price'] || {}),
            $lte: criterias.maxPrice,
          },
        }
      }

      // Si nous avons un filtre sur la couleur
      if (criterias.color) {
        filters = {
          ...filters,
          color: {
            $regex: criterias.color,
          },
        }
      }

      // Si nous avons un filtre sur la condition
      if (criterias.condition) {
        filters = {
          ...filters,
          condition: {
            $regex: criterias.condition,
          },
        }
      }

      // Si nous avons un filtre sur la taille minimum
      if (criterias.minSize) {
        filters = {
          ...filters,
          size: {
            ...(filters.size || {}),
            $gte: criterias.minSize,
          },
        }
      }

      // Si nous avons un filtre sur la taille minimum
      if (criterias.maxSize) {
        filters = {
          ...filters,
          size: {
            ...(filters.size || {}),
            $lte: criterias.maxSize,
          },
        }
      }

      // Si nous avons un filtre sur le user
      if (criterias.user) {
        filters = {
          ...filters,
          'user.email': {
            $regex: criterias.user,
          },
        }
      }

      // Lancer la recherche
      const data = await app.mongo.db
        ?.collection('shoes')
        .find(filters)
        .limit(criterias.limit)
        .skip((criterias.page - 1) * criterias.limit)
        .sort({ [criterias.orderBy]: criterias.direction as SortDirection })
        .toArray()

      // Retourner la collection
      return ShoesCollectionModel.parse(data)
    },
  )

  /**
   * Route permettant de mettre à jour une chaussure
   */
  app.patch(
    '/shoes/:id',
    {
      schema: {
        params: IdOwnerSchema,
        body: UpdateShoesSchema,
        response: { 200: ShoesSchema },
      },
    },
    async (request, reply) => {
      // On s'assure du jeton de connexion
      await request.jwtVerify()

      // On récupére l'identifiant de la chaussure contenue
      // dans les params de la route
      const { id } = IdOwnerModel.parse(request.params)

      // On récupére la chaussure depuis la base de données
      const shoes = ShoesModel.parse(
        await app.mongo.db?.collection('shoes').findOne({
          _id: new ObjectId(id),
        }),
      )

      // Récupérer l'identifiant de l'utilisateur contenue dans le jeton
      // de connexion.
      const userId = (request.user as any)._id
      // Maintenant que je connais l'identifiant de l'utilisateur, j'utilise
      // mongodb pour aller chercher l'utilisateur en question
      const user = UserModel.parse(
        await app.mongo.db?.collection('users').findOne({
          _id: new ObjectId(userId),
        }),
      )

      // On s'assure que l'utilisateur connécté soit bien le revendeur de la chaussure
      if (shoes.user._id !== user._id) {
        reply.code(404)

        return { error: 'resource not found' }
      }

      // On met à jour la chaussure
      await app.mongo.db?.collection('shoes').updateOne(
        {
          _id: new ObjectId(shoes._id),
        },
        {
          $set: UpdateShoesModel.parse(request.body),
        },
      )

      // On retourne la chaussure mise à jour
      return ShoesModel.parse(
        await app.mongo.db?.collection('shoes').findOne({
          _id: new ObjectId(shoes._id),
        }),
      )
    },
  )
}
