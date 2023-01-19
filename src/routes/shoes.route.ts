import { FastifyInstance } from 'fastify'
import { ObjectId } from 'mongodb'
import {
  NewShoesModel,
  NewShoesSchema,
  ShoesModel,
  ShoesSchema,
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
}
