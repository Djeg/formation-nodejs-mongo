import { FastifyInstance } from 'fastify'
import {
  NewUserModel,
  NewUserSchema,
  UserCollectionModel,
  UserCollectionSchema,
  UserModel,
  UserSchema,
  UserSearchCriteriaModel,
  UserSearchCriteriaSchema,
} from '../models/users.model'

/**
 * @module users.route
 *
 * @description
 *  Contient la logique de toutes les routes concernant les utilisateurs
 */

/**
 * Plugin contenant toutes les routes concernant les utilisateurs
 */
export default async function users(app: FastifyInstance) {
  /**
   * Route permettant de créer un nouvel utilisateur sur l'application.
   */
  app.post(
    '/users',
    { schema: { body: NewUserSchema, response: { 201: UserSchema } } },
    async (request, reply) => {
      // Je valide la "body" de la requête en utilisant le
      // NewUserModel. Je m'assure ainsi que toutes les données
      // sont correct
      const newUser = NewUserModel.parse(request.body)

      // On enregistre le nouvel utilisateur dans la base de données
      const result = await app.mongo.db?.collection('users').insertOne({
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        password: newUser.password,
      })

      // On récupére l'utilisateur tout juste enregistré dans la base de données
      const user = await app.mongo.db?.collection('users').findOne({
        _id: result?.insertedId,
      })

      // On retourne le code 201
      reply.code(201)

      // On retourne l'utilisateur validé par un Model
      return UserModel.parse(user)
    },
  )

  /**
   * Route permettant de lister des utilisateurs de l'api
   */
  app.get(
    '/users',
    {
      schema: {
        querystring: UserSearchCriteriaSchema,
        response: { 200: UserCollectionSchema },
      },
    },
    async request => {
      // Récupération des critéres de recherches
      const criterias = UserSearchCriteriaModel.parse(request.query)

      // On lance la requête à la base de données permettant de récupérer
      // les utilisateurs correspondant aux critéres de recherche
      const data = await app.mongo.db
        ?.collection('users')
        .find(
          criterias.email
            ? {
                email: new RegExp(`${criterias.email}`),
              }
            : {},
        )
        .limit(criterias.limit)
        .skip((criterias.page - 1) * criterias.limit)
        .sort({ [criterias.orderBy]: criterias.direction })
        .toArray()

      // On retourne les résultat de la recherche
      return UserCollectionModel.parse(data)
    },
  )
}
